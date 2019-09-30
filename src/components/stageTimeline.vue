<template>
<!--  <span :title="stage.description">a</span>-->
  <div class="timelineItemContainer">
      <div class="timelineItem" :style="styleObject">
        <event-line
          v-for="event in stage.events"
          :event="event"
        ></event-line>
      </div>
  </div>
</template>


<script>
import { Stage } from "../models/Stage";
import EventLine from "./eventLine";

export default {
  name: "stageTimeline",
  components: {EventLine},
  props: {
    stage: {
      type: Stage,
      required: true
    },
    projectStart: {
      type: Date,
      required: true
    },
    projectEnd: {
      type: Date,
      required: true
    },
  },
  data() {
    return {
    }
  },
  methods: {},
  computed: {
    /**
     *
     * project timeline 0-7000
     *  stage start 1000
     *    1000/7000 = .1428 <-- that is the offset width percent
     *  stage end 2300
     *    2300/7000 = .3285 <-- that is the end of the stage
     *    .3285 - .1428 = .1857 <-- that is the width of the stage
     *
     */
    stageStartTime(){
      return this.stage.startDate.getTime() - this.projectStart.getTime();
    },
    stageStopTime() {
      return this.stage.endDate.getTime() - this.projectStart.getTime();
    },
    projectTotalTime() {
      return this.projectEnd.getTime() - this.projectStart.getTime();
    },
    /**
     * Calculates the timeline offset for this stage.
     * The timeline offset is the number of unix ms from
     * project start to the stage start.
     */
    stageOffsetStartTime() {

      return this.stage.computeOffsetStartTime(this.projectStart);
    },
    startOffsetPercentage() {
      let stageStart = this.stage.startDate.getTime();
      let projectStart = this.projectStart.getTime();
      let projectTotal = this.projectTotalTime;
      let offset = (stageStart - projectStart) / projectTotal;
      console.log(offset.toFixed(2) * 100);
      return offset.toFixed(2) * 100 + '%';
    },
    stageWidthPercentage() {
      let percent = Math.round(this.projectStart.getTime() / this.stageStopTime);
      return percent + '%';
    },
    quarterly() {

    },
    styleObject() {
      return {
        marginLeft: this.startOffsetPercentage,
        width: this.stageWidthPercentage
      }
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>
  .timelineItemContainer {
    height: 60px;
    padding-left: 40px;
  }
  .timelineItem{
    margin-left:4%;
    background-color: darkcyan;
  }
  p {
    padding: 0;
    margin: 0;
  }
  span {
    padding: 0;
    margin: 0;
  }
  .timelineRow {
    padding: 0 25px;
    min-width: 178px;
  }

</style>
