<template>
  <div>
    <div class="nameContainer">
      <span class="timelineItemName">
        <span class="stageName">{{stage.name}}</span>
      </span>
    </div>

  </div>


</template>

<script>
import {Stage} from "../models/Stage";

export default {
  name: "timelineName",
  components: {
  },
  props: {
    stage: {
      type: Stage,
      required: true
    },
    projectStart: {
      type: Date,
      required: true
    }
  },
  data: () => {
    return {};
  },
  methods: {},
  computed: {
    /**
     * Calculates the timeline offset for this stage.
     * The timeline offset is the number of unix ms from
     * project start to the stage start.
     */
    stageOffset() {
      return this.stage.computeOffset(this.projectStart);
    }
  },
  watch: {},
  created() {}
};
</script>

<style scoped>
.nameContainer {
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

</style>
