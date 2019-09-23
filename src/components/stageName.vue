<template>
  <div class="timelineItemContainer">
    <span class="timelineItem">
      <span class="stageName">{{stage.name}}</span>
      <stageTimeline v-for="event in stage.events" :event="event" class="stageTimelineRange"></stageTimeline>
    </span>
  </div>
</template>

<script>
import stageTimeline from "./stageTimeline";
import { Stage } from "../models/Stage";

export default {
  name: "timelineName",
  components: {
    stageTimeline
  },
  props: {
    stage: {
      type: Stage,
      required: true
    }
  },
  data: () => {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  created() {}
};
</script>

<style scoped>
.timelineItemContainer {
  height: 60px;
}
p {
  padding: 0;
  margin: 0;
}
.stageName {
  padding: 0 25px;
  min-width: 178px;
}
.stageTimelineRange {
  background-color: crimson;
}
</style>
