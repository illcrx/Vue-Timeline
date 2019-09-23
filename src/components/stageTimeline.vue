<template>
  <span :title="event.description">a</span>
</template>

<script>
import { XEvent } from "../models/Event";

export default {
  name: "stageTimeline",
  props: {
    event: {
      type: XEvent,
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
</style>
