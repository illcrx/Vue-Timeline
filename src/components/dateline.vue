<template>
  <div id="dateLine">
    <div id="yearArea">
      <ul class="dateList">
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
import {  getTimeSpan } from "../models/timescale"
import yearIcon from "../assets/Group2.svg";
import { Stage } from "../models/Stage";
import { XEvent } from "../models/Event";

export default {
  name: "dateline.vue",
  components: {
    yearIcon
  },

  props: {
    stages: {
      type: Array,
      default: () => []
    },
    projectStart: {
      type: Date,
      required: true
    },
    projectEnd: {
      type: Date,
      required: false
    }
  },

  computed: {
    yearRange() {
      if(projectEnd){
        let { start, end } = Stage.computeProjectRange(this.stages);
        console.log("ProjectEnd" + projectEnd);
        return {
          startYear: start.getFullYear(),
          endYear: end.getFullYear()
        };
      }

      let{ start, end } = XEvent.computeProjectRange(this.stages);

      if(end) {
        console.log("end" + end);
        return {
          startYear: start.getFullYear(),
          endYear: end.getFullYear()
        };
      }
      console.log("endYear" + start.getFullYear() +1);

      return {
        startYear: start.getFullYear(),
        endYear: start.getFullYear() + 1
      }







    },

    startYear() {
      return this.yearRange.startYear;
    },

    endYear() {
      return this.yearRange.endYear;
    },
    years(){
      let time = getTimeSpan({
        start: this.projectStart,
        end: this.projectEnd
      });
        return time.years;
    }
    // years() {
    //   let years = [];
    //
    //   if (Number.isNaN(this.startYear) || Number.isNaN(this.endYear)) {
    //     console.error("Start and/or end years are NaN", {
    //       startYear: this.startYear,
    //       endYear: this.endYear
    //     });
    //     return years;
    //   }
    //
    //   for (let y = this.startYear; y <= this.endYear; y++) {
    //     years.push(y);
    //   }
    //
    //   return years;
    // }
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

}
.yearSpan {
  margin-left: 30px;

}
.dateList {
  padding-top: 3px;
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
ul {
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 0;
}
li {
  flex: 0 1 auto; /* Default */
  list-style-type: none;
  margin: 0 0 0 10px;
}
</style>
