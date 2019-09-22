<template>
  <div id="app">
    <div v-if="stages">
      <timeline-wrapper :passStages="stages" :passEvents="events"></timeline-wrapper>
      <dateline :stages="stages"></dateline>
    </div>
    <div v-else>
      <h1>Loading yo shit.</h1>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import timelineWrapper from "./components/timelineWrapper";
import dateline from "./components/dateline";
import axios from "axios";

export default {
  name: 'app',
  data: () => {
    return {
      stages: undefined,
      events: {},
    }
  },
  components: {
    timelineWrapper,
    dateline,
  }, methods: {
    getProjectId() {
      function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
        });
        return vars;
        }
    },
    getEventParents(event) {
      let keys = Object.keys(event.Project_Events_Schedule_Stage_of_Project);
      return keys;
    },
    transformEventData(data) {
      let stage = [];
      //secondary array for the items that are not Events for soring in second for loop.
      let prePhase = [];
      //an object where the keys are the events.
      let phase =  {
        design: [],
        planning: [],
        construction: []
      } ;
      // deals with data and ensures we get the design,planning and construction out of the dataset so we have parent elemnts.
      // the many if statements are to ensure that we have thing sin order, design, planning and construction.
      for(let e of data) {
        if (e.Event_Name.toLowerCase() === "design"){
          Vue.set(stage, stage.length, e);
        } else if(e.Event_Name.toLowerCase() === "planning") {
          Vue.set(stage, stage.length, e);
        } else if(e.Event_Name.toLowerCase() === "construction") {
          Vue.set(stage, stage.length, e);
        } else {
          // puts all other items into prePhase array
          Vue.set(prePhase, prePhase.length, e);
        }
      }
      for(let event of prePhase) {
        //this will return an array with with either 1,2,3 or multiples.
        // 1: construction, 2: design, 3: planning
        for (let key of this.getEventParents(event)) {
          if (Number(key) === 1) {
            Vue.set(phase.construction, phase.construction.length, event);
          }
          if (Number(key) === 2) {
            Vue.set(phase.design, phase.design.length, event);
          }
          if (Number(key) === 3) {
            Vue.set(phase.planning, phase.planning.length, event);
          }
        }
        //array
        this.stages = stage;
        //object
        this.events = phase;
      }
    }
  },
  computed: {
  },
  mounted() {
    // this.getProjectId()["project_id"];
    axios.post('https://hook.integromat.com/tl6w7i72tkgxf1t2gsvy2md96wucrtol?project_id=15')
      .then((data) => {
        this.transformEventData(data.data);
      }).catch(err => {
        console.error(err);
    })
  }
}
</script>

<style>
#app {
  font-family: Quicksand, 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1224px;
  width: 100%;
}

</style>
