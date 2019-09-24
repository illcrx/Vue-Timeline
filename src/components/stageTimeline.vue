<template>
<!--  <span :title="stage.description">a</span>-->
  <div class="timelineItemContainer">
      <span class="timelineItem">
        <span class="timelineRow">{{stage.name}}</span>
      </span>
  </div>
</template>


<script>
import { Stage } from "../models/Stage";

export default {
  name: "stageTimeline",
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
  .timelineRow {
    padding: 0 25px;
    min-width: 178px;
  }
</style>
