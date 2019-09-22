<template>
  <div id="dateLine">
    <div id="yearArea">
      <ul>
        <li v-for="year in yearRange">
           <span  class="yearSpan">
             <year-icon class="yearIcon"/>
             <span class="yearText">{{year}}</span>
           </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import yearIcon from '../assets/Group2.svg'

  export default {
    name: "dateline.vue",
    components: {
      yearIcon
    },
    props: ['stages'],
    data: () => {
      return {
        startYear: "",
        endYear: "",
        yearRange: undefined,
      }
    },
    methods: {
      getDateEnglish: function (d) {
        let date = new Date(d);
        this.date = date.toDateString();
      },
      getDateRange: function () {
        let start = [];
        let stop = [];
        for(let item of this.stages){
          let startDate = new Date(item.Start_Date);
          let stopDate = new Date(item.Stop_Date);
          Vue.set(start, start.length, startDate);
          Vue.set(stop, stop.length, stopDate)
        }
        //order lists by oldest to newest.
        let startSorted = start.sort( (a,b) => {
            if (a > b) {
              return 1
            }
            if (b > a) {
              return -1
            }
            return 0;
          });
        // sorts
        let stopSorted = stop.sort( (a,b) =>{
          if(a > b) {return - 1}
          if(b > a) {return 1}
          return 0;
        });
        //select the oldest in start
        let projectStart = startSorted[0];
        //select the newest in stop.
        let projectEnd = stopSorted[0];
        //get the days difference between those 2.
        this.startYear = projectStart.getFullYear();
        this.endYear = projectEnd.getFullYear()
      },
      getAllYears() {
        let years = [this.startYear, this.endYear];
        let index = 0;
        for (let i = this.startYear+1; i <= this.endYear; i++ ) {
          //increase year  and index
          index +=1;
          years[index] = i;
        }
        this.yearRange = years;
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.getDateRange();
      this.getAllYears();
    }


  }
</script>

<style scoped>
  ul {
    margin: 0;
  }
  li {
    text-decoration: none;
    list-style-type: none  ;
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