<template>
  <svg :viewBox="viewBox">
    <rect :x="xOffset" :y="yOffset" :height="barHeight" :width="barWidth" />
  </svg>
</template>

<script lang="ts">
import Vue from "vue";
import { Stage } from "../models/Stage";
import { getTimeSpan, time } from "../models/timescale";

export default Vue.extend({
  name: "RowBar",

  components: {},

  props: {
    height: {
      type: Number,
      default: 4
    },
    stage: {
      type: Stage,
      required: true
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },

  data() {
    return {};
  },

  computed: {
    meta() {
      return getTimeSpan({
        start: this.start,
        end: this.end
      });
    },
    heightPixels() {
      return this.convertRemToPixels(this.height);
    },
    scale() {
      return time.day;
    },
    viewBox() {
      let w = this.meta.timespan / this.scale;
      let h = this.heightPixels;
      return `0 0 ${w} ${h}`;
    },
    xOffset() {
      let offset = this.stage.computeOffsetStartTime(this.meta.start);
      return offset / this.scale;
    },
    yOffset() {
      return this.heightPixels * 0.1;
    },
    barHeight() {
      return this.heightPixels * 0.8;
    },
    barWidth() {
      return this.stage.stageDelta / this.scale;
    }
  },

  methods: {
    convertRemToPixels(rem) {
      return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    }
  }
});
</script>

<style scoped></style>
