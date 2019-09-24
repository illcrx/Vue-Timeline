<template>
  <div id="dateLine">
    <div id="yearArea">
      <ul>
        <li v-for="year in years">
          <span class="yearSpan">
            <year-icon class="yearIcon" />
            <span class="yearText">{{year}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import yearIcon from "../assets/Group2.svg";

export default {
  name: "dateline.vue",
  components: {
    yearIcon
  },

  props: {
    stages: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    yearRange() {
      let future = new Date();
      future.setFullYear(future.getFullYear() + 100);
      // Set a start time in the future so that any project will update it.
      let start = future.getTime();
      // Set an end time in the past so that any project will update it.
      let end = new Date("1900-01-01T00:00:00").getTime();

      for (let stage of this.stages) {
        start = Math.min(start, stage.startDate.getTime());
        end = Math.max(end, stage.endDate.getTime());
      }

      return {
        startYear: new Date(start).getFullYear(),
        endYear: new Date(end).getFullYear()
      };
    },

    startYear() {
      return this.yearRange.startYear;
    },

    endYear() {
      return this.yearRange.endYear;
    },

    years() {
      let years = [];

      if (Number.isNaN(this.startYear) || Number.isNaN(this.endYear)) {
        console.error("Start and/or end years are NaN", {
          startYear: this.startYear,
          endYear: this.endYear
        });
        return years;
      }

      for (let y = this.startYear; y <= this.endYear; y++) {
        years.push(y);
      }

      return years;
    }
  }
};
</script>

<style scoped>
ul {
  margin: 0;
}
li {
  text-decoration: none;
  list-style-type: none;
}
#dateLine {
  height: 45px;
  background: rgba(214, 214, 214, 0.87);
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.1);
}
#yearArea {
  margin-left: 65px;

  /*display: inline-grid;*/
}
.yearSpan {
  margin-left: 30px;
  /*place-self: center;*/
}
li {
  float: left;
  margin-top: 3px;
}
.yearIcon {
  float: left;
  clear: left;
}
.yearText {
  float: left;
  clear: left;
  margin-top: -10px;
}
</style>
