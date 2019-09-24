<template>
  <div id="timelineWrapper">
    <stage-name
      v-for="( stage, index ) in stages"
      :key="stage.stageKey"
      :stage="stage"
      :project-start="projectStart"
      class="timelineNameRow"
    />

    <hr id="el_13" />
    <hr id="lowerHr" />
  </div>
</template>

<script>
import stageName from "./stageName";
import stageTimeline from "./stageTimeline";
import { computeDateRange } from "../models/Stage";

export default {
  name: "timelineWrapper",
  props: {
    stages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    stageName
  },
  data: () => {
    return {};
  },
  methods: {},
  computed: {
    projectStart() {
      let { start } = computeDateRange(this.stages.map(s => s.startDate));
      return start;
    }
  },
  watch: {},
  created() {},
  mounted() {}
};
</script>

<style scoped>
#timelineWrapper {
  height: 180px;
  background-color: rgba(246, 243, 245, 0.54);
  text-align: left;
  margin: auto;
}
#lowerHr {
  position: absolute;
  width: 1221px;
  height: 0px;
  left: 9px;
  top: 179.52px;

  border: 1px solid rgba(0, 0, 0, 0.1);
}
.timelineNameRow:nth-of-type(odd) {
  background: rgba(214, 214, 214, 0.87);
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
</style>
