<template>
  <component :is="tag">
    <timeline-wrapper :stages="stages" />
    <dateline :stages="stages" />
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import TimelineWrapper from "./timelineWrapper.vue";
import Dateline from "./dateline.vue";

export default Vue.extend({
  name: "Timeline",

  components: {
    TimelineWrapper,
    Dateline
  },

  props: {
    tag: {
      type: String,
      default: "div",
      required: false
    },
    stages: {
      type: Array,
      required: true
    }
  }
});
</script>
