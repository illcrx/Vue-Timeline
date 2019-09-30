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
      console.log("this.stage.startDate.getTime = ", this.stage.startDate.getTime());
      console.log("this.projectStart.getTime = ", this.projectStart.getTime());
      console.log("StageStartTime =  ", this.stage.startDate.getTime() - this.projectStart.getTime());
      return this.stage.startDate.getTime() - this.projectStart.getTime();
    },
    stageStopTime() {

      console.log("this.stage.endDate.getTime = ", this.stage.endDate.getTime());
      console.log("this.projectStart.getTime = ", this.projectStart.getTime());
      console.log("StageStopTime = ", this.stage.endDate.getTime() - this.projectStart.getTime());
      return this.stage.endDate.getTime() - this.projectStart.getTime();
    },
    projectTime() {
      console.log("this.projectEnd.getTime = ", this.projectEnd.getTime());
      console.log("this.projectStart.getTime = ", this.projectStart.getTime());
      console.log("ProjectTime = ", this.projectEnd.getTime() - this.projectStart.getTime());
      return this.projectEnd.getTime() - this.projectStart.getTime();
    },
    /**
     * Calculates the timeline offset for this stage.
     * The timeline offset is the number of unix ms from
     * project start to the stage start.
     */
    stageOffsetStartTime() {

      console.log("StageOffsetStartTime = ", this.stage.computeOffsetStartTime(this.projectStart));
      return this.stage.computeOffsetStartTime(this.projectStart);
    },
    startOffsetPercentage() {
      console.log("StartOffsetPercentage = ", (this.projectTime / this.stageStartTime));
      console.log("this.projectTime = ", this.projectTime );
      console.log("this.stageStartTime = ", this.stageStartTime);

      let percent =  Math.round(this.projectTime / this.stageStartTime);
      return percent + '%';
    },
    stageWidthPercentage() {
      console.log("this.projectStart = ", this.projectStart.getTime());
      console.log("this.stageStopTime = ", this.stageStopTime);
      console.log("StageWidthPercentage = ", this. projectStart.getTime() / this.stageStopTime);
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
