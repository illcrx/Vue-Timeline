import {computeDateRange} from "./Stage";

export class XEvent {
  meta = {};

  name = "";
  stages = [];
  startDate = new Date(0);
  endDate = new Date(0);
  url = "";
  description = "";

  isPartOfStage(stage) {
    return this.stages.includes(stage);
  }

  /**
   * @param {Date} startDate
   */
  computeOffset(startDate) {
    return this.startDate.getTime() - startDate.getTime();
  }

  /**
   * @param {Date} endDateFallback
   */
  computeDelta(endDateFallback) {
    return (
      (this.endDate || endDateFallback).getTime() - this.startDate.getTime()
    );
  }

  getTimespanWithMinimum(minimum) {
    if (this.endDate == null) {
      return minimum;
    }

    return Math.max(minimum, this.endDate.getTime() - this.startDate.getTime());
  }

  /**
   *
   * @param stage is the entire project
   * @returns {{start: *, end: *}}
   */
  computeProjectRange(stages) {
    let endRange = [];
    let startRange = [];
    for(let stage in stages){
      // Compute the earliest START date.
       startRange.push(computeDateRange(stage.events.map(s => s.startDate)));
      // Compute the latest END date.
       endRange.push(computeDateRange(stage.events.map(s => s.endDate)));
    }

    let start = computeDateRange(startRange);
    if(endRange.length > 0){
      let end = computeDateRange(endRange);
    } else {
      let end = null;
    }

    return {
      start,
      end,
    };
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
function convertAzBexToEvent(azbexEvent) {
  let event = new XEvent();

  //   event.url;
  event.description = azbexEvent.Event_Name;
  if (azbexEvent.Stop_Date == null) {
    event.endDate = null;
  } else {
    event.endDate = new Date(azbexEvent.Stop_Date);
  }
  event.name = azbexEvent.Event_Name;
  event.stages = Object.keys(
    azbexEvent.Project_Events_Schedule_Stage_of_Project
  );
  event.startDate = new Date(azbexEvent.Start_Date);
  event.meta = {
    eventId: azbexEvent.Event_ID,
    projectId: azbexEvent.Project_Rel_ID,
    isQuarterly: azbexEvent.Project_Events_Schedule_Quarterly_Event,
    shouldDisplay: azbexEvent.Project_Events_Schedule_Display_in_Timeline,
    createdDate: new Date(azbexEvent.Created_on),
  };

  return event;
}



export const adapters = {
  azbex: convertAzBexToEvent,
};
