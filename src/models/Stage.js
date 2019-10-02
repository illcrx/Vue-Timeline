import { adapters as eventAdapters } from "./Event";

export class Stage {
  meta = {};
  name = "";
  stageKey = "";
  startDate = new Date(0);
  endDate = new Date(0);
  url = "";
  description = "";
  /**
   * XEvent children.
   */
  events = [];
  /**
   * @param {Date} startDate
   */
  computeOffsetStartTime(startDate) {
    return this.startDate.getTime() - startDate.getTime();
  }

  get stageDelta() {
    return this.endDate.getTime() - this.startDate.getTime();
  }

  matchEvent(xEvent) {
    return xEvent.isPartOfStage(this.stageKey);
  }

  addEvent(xEvent) {
    this.events.push(xEvent);
  }

  /**
   * @param {(child_a, child_b) => number} comparatorFunc
   */
  sortEvents(comparatorFunc = Stage.defaultEventComparator) {
    this.events.sort(comparatorFunc);
  }

  static defaultEventComparator(eventA, eventB) {
    return eventA.startDate.getTime() - eventB.startDate.getTime();
  }

  /**
   * @param {Stage[]} stages
   */
  static computeProjectRange(stages) {
    // Compute the earliest START date.
    let { start } = computeDateRange(stages.map(s => s.startDate));
    // Compute the latest END date.
    let { end } = computeDateRange(stages.map(s => s.endDate));

    return {
      start,
      end,
    };
  }

  /**
   * @param {Stage[]} stages
   */
  static computeProjectDelta(stages) {
    let { end, start } = Stage.computeProjectRange(stages);

    return end.getTime() - start.getTime();
  }
}

/**
 * Takes an AZ BEX event object as it is from the API.
 *
 * Example input:
 * ```json
 * {
 *  "Event_ID": 12,
 *  "Project_Rel_ID": 15,
 *  "Event_Name": "DP Selection",
 *  "Start_Date": "2017-10-10T00:00:00",
 *  "Stop_Date": null,
 *  "Created_on": "2019-09-16T11:05:28",
 *  "Project_Events_Schedule_Event_Rel_ID": 11,
 *  "Project_Events_Schedule_Stop_Date_for_JSON": "\"stop\": null",
 *  "Project_Events_Schedule_Display_in_Timeline": false,
 *  "Project_Events_Schedule_Quarterly_Event": false,
 *  "Project_Events_Schedule_Created_by": "Rachel Pratt (rpratt@azbex.com)",
 *  "Project_Events_Schedule_Stage_of_Project": { "3": "Planning" },
 *  "Schedule_Events_List_Event_ID": 11
 * }
 * ```
 */
function convertAzBexToStage(azbexEvent) {
  let stage = new Stage();

  //   event.url;
  stage.description = azbexEvent.Event_Name;
  stage.endDate = new Date(azbexEvent.Stop_Date);
  stage.name = azbexEvent.Event_Name;
  stage.stageKey = Object.keys(
    azbexEvent.Project_Events_Schedule_Stage_of_Project
  )[0];
  stage.startDate = new Date(azbexEvent.Start_Date);
  stage.meta = {
    eventId: azbexEvent.Event_ID,
    projectId: azbexEvent.Project_Rel_ID,
    isQuarterly: azbexEvent.Project_Events_Schedule_Quarterly_Event,
    shouldDisplay: azbexEvent.Project_Events_Schedule_Display_in_Timeline,
    createdDate: new Date(azbexEvent.Created_on),
  };

  return stage;
}

export const adapters = {
  azbex: convertAzBexToStage,
};

export const sequencer = {
  azbex(eventList) {
    //Events may not have parent Events present, this will add the parent events if they are not present.
    let sanitizedList = this.azbexStageSanitize(eventList);
    let stages = [];
    let events = [];

    // Transform
    // -------------------------------------------------------------------------

    // All objects are events,
    // but some are the parent event that represents the Stage.
    // Run through the data and only pick up these parent events
    // to be converted into Stage objects.
    for (let event of sanitizedList) {
      switch (event.Event_Name.toLowerCase()) {
        default:
          events.push(eventAdapters.azbex(event));
          break;

        case "design":
        case "planning":
        case "construction":
          stages.push(adapters.azbex(event));
          break;
      }
    }

    // Relational
    // -------------------------------------------------------------------------

    // Loop through each XEvent object, which can belong to multiple stages.
    for (let ev of events) {
      for (let s of stages) {
        // Ask each stage if this event belongs with it.
        if (s.matchEvent(ev)) {
          s.addEvent(ev);
        }
      }
    }

    // Sorting
    // -------------------------------------------------------------------------

    // Use the stage key to implement the proper ordering of stages.
    stages.sort((a, b) => {
      let aKey = Number(a.stageKey);
      let bKey = Number(b.stageKey);
      return bKey - aKey;
    });

    for (let s of stages) {
      s.sortEvents();
    }

    return stages;
  },
  azbexStageSanitize(eventList) {
    let newList = [];
    let hasDesign = false;
    let hasPlanning = false;
    let hasConstruction = false;

    //Checks if there is a Stage event, if not create it.
    console.log(eventList);
    for (let ev of eventList) {
      if (ev.Event_Name.toLowerCase() === "design") {
        hasDesign = true;
      }
      if (ev.Event_Name.toLowerCase() === "planning") {
        hasPlanning = true;
      }
      if (ev.Event_Name.toLowerCase() === "construction") {
        hasConstruction = true;
      }
      newList.push(ev);
    }

    if (hasDesign === false) {
      newList.push({
        Event_Name: "Design",
        Project_Events_Schedule_Stage_of_Project: {
          2: "Design",
        },
      });
    }
    if (hasConstruction === false) {
      newList.push({
        Event_Name: "Construction",
        Project_Events_Schedule_Stage_of_Project: {
          1: "Construction",
        },
      });
    }
    if (hasPlanning === false) {
      newList.push({
        Event_Name: "Planning",
        Project_Events_Schedule_Stage_of_Project: {
          3: "Planning",
        },
      });
    }
    //return original list including Parent Stages if they do not exist.
    console.log(newList);
    return newList;
  },
};

/**
 * @param {Date[]} dates
 */
export function computeDateRange(dates) {
  let future = new Date();
  future.setFullYear(future.getFullYear() + 100);
  // Set a start time in the future so that any project will update it.
  let start = future.getTime();
  // Set an end time in the past so that any project will update it.
  let end = new Date("1900-01-01T00:00:00").getTime();

  for (let d of dates) {
    let t = d.getTime();
    start = Math.min(start, t);
    end = Math.max(end, t);
  }

  return {
    start: new Date(start),
    end: new Date(end),
  };
}
