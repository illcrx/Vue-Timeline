<template>
<!--  <div>-->
    <svg :viewBox="viewBox" class="inlineSVG">
      <g>
        <rect
          ref="popper"
          class="row:stage stageBar"
          :x="xOffset"
          :y="yOffset"
          :height="barHeight"
          :width="barWidth"
          :style="stageColor"

        />
        <rect
          class="row:event"
          v-for="(event, idx) in stage.events"
          v-bind="computeEventCoords(event, idx, stage.events.length)"
          :key="event.meta.eventId"
          @click="handleEventClick(event)"
        />
      </g>
    </svg>
<!--    <svg>-->
<!--      <g>-->
<!--        <text-->
<!--          v-for="(year, idx) in getDatelineYears"-->
<!--          :key="idx"-->
<!--          class="svgDatelineText"-->
<!--          v-bind="computeDatelineCoords(getDatelineYears.length)"-->
<!--        >-->
<!--          {{year}}-->
<!--        </text>-->

<!--      </g>-->

<!--    </svg>-->
<!--  </div>-->



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
      default: 3
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
    },
      // defaultEnd: {
      //   type: String,
      //   required: false
      // },
      colorOrder: {
        type: [Number,String],
          required: false
      },
      colorArray: {
        type: Array,
          required: false
      }
  },

  data() {
    return {};
  },

  mounted() {
    // let ref = this.$refs.popper;
    // let tooltip = new Tooltip(ref, {
    //   title: "",
    //   trigger: "mouseover"
    // });
    // this.$once("hook:beforeDestroy", () => {
    //   tooltip.destroy();
    // });
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
      return (this.heightPixels - this.barHeight) / 2;
    },
    barHeight() {
      return this.heightPixels * 0.75;
    },
    barWidth() {
      return this.stage.stageDelta / this.scale;
    },
    stageColor(){
      let stage = this.colorOrder - 1;
      let color = this.colorArray[stage];
      console.log(color);
      return {fill: color};

    }
  },

  methods: {
    convertRemToPixels(rem) {
      return (
        rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    },
    computeEventCoords(event, index, totalEvents) {
      let x = event.computeOffset(this.meta.start) / this.scale;
      let height = this.barHeight;
      let y = this.yOffset;
      let width = 2
      let padding = 4;

      height -= padding;
      y += padding / 2;

      return {
        x,
        y,
        width,
        height
      };
    },
      handleEventClick(event) {
      console.log(event);
      alert(`event: ${event.name}\n${event.description}`);
    },

  }
});
</script>

<style scoped>
  .inlineSVG {
    display: block;
  }
.row\:stage {
  /*fill: lightgrey;*/
}
.row\:event {
  /*fill: rgba(0, 0, 0, 0.3);*/
}
  .stageBar {
    min-height: 60px;
  }
</style>
