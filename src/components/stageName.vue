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
