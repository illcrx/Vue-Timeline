<template>
  <div id="timelineWrapper" class="timelineWrapperStyles">
    <div id="stage-name-wrapper">
      <stage-name
        v-for="( stage, index ) in stages"
        :key="stage.stageKey"
        :stage="stage"
        :project-start="projectStart"
        class="timelineStriping verticalAlignItems"
      />
      <hr id="el_13" />
      <hr id="lowerHr" />
    </div>
    <div id="stage-timeline-wrapper">
<!--      <stage-timeline-->
<!--              v-for="( stage, index ) in stages"-->
<!--              :key="stage.stageKey"-->
<!--              :stage="stage"-->
<!--              :project-start="projectStart"-->
<!--              :project-end="projectEnd"-->
<!--              class="timelineStriping"-->
<!--      ></stage-timeline>-->
      <row-bar
        class="test timelineStriping"
        v-for="stage in stages"
        :key="stage.stageKey"
        :height="6.5"
        :stage="stage"
        :start="start"
        :end="end"
        :defaultEnd="eventEnd"
        :colorOrder="stage.stageKey"
        :colorArray="['8d8d8d', '0F4A59', '560E3D']"
      />
    </div>
    <div id="dummy-wrapper">
      <div class="dateLineDummy">

      </div>
    </div>
    <div id="dateline-wrapper">
      <dateline
        :stages="stages"
        :projectStart="projectStart"
        :projectEnd="projectEnd"
      ></dateline>
    </div>


  </div>
</template>

<script>
import stageName from "./stageName";
import stageTimeline from "./stageTimeline";
import dateline from "./dateline";
import rowBar from "./RowBar";
import { computeDateRange } from "../models/Stage";
import { Stage } from "../models/Stage"

export default {
  name: "timelineWrapper",
  props: {
    stages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    stageName,
    // stageTimeline,
    dateline,
    rowBar
  },
  data: () => {
    return {};
  },
  methods: {},
  computed: {
    projectStart() {
      let { start } = computeDateRange(this.stages.map(s => s.startDate));
      return start;
    },
    projectEnd() {
      let { end } = computeDateRange(this.stages.map(s => s.endDate));
      return end;
    },
    dateRange() {
      return Stage.computeProjectRange(this.stages);
    },
    start() {
      return this.dateRange.start;
    },
    end() {
      return this.dateRange.end;
    }


  },
  watch: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
#timelineWrapper {
  display: grid;
  grid-template-columns: [nameColumn]154px [timelineColumn]auto;
  grid-template-rows: [datelineDummyRow]auto [datelineRow]45px;
  grid-template-areas: "name timeline"
  " dummy dateline";
  min-width: 820px;
}
#stage-name-wrapper {
grid-column: 1/2;
  grid-row: 1/2;
}
#stage-timeline-wrapper {
grid-column: 2/3;
  grid-row: 2/3;
  min-width: 0;
  min-height: 0;
}
#stage-timeline-wrapper{
  grid-area: name;
}
#stage-timeline-wrapper {
  grid-area: timeline;
}
#dummy-wrapper {
  grid-area: dummy;
}
#dateline-wrapper {
  grid-area: dateline;
}
#lowerHr {
  position: absolute;
  width: 100%;
  max-width: 1221px;
  height: 0px;
  left: 9px;
  top: 179.52px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.timelineWrapperStyles {
  height: 180px;
  background-color: rgba(246, 243, 245, 0.54);
  text-align: left;
  margin: auto;
}

#el_13 {
  position: absolute;
  width: 178px;
  height: 0px;
  top: 0px;
  margin-top: 97px;
  margin-left: 65px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  transform: rotate(90deg);
}
.dateLineDummy {
  height: 45px;
  background: rgba(214, 214, 214, 0.87);
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.timelineStriping:nth-of-type(odd) {
  background: rgba(214, 214, 214, 0.87);
}
.verticalAlignItems {
  align-self: center;
}

</style>
