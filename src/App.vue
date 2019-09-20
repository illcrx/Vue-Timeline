<template>
  <div id="app">
    <timeline-wrapper/>
    <dateline/>

  </div>
</template>

<script>

import timelineWrapper from "./components/timelineWrapper";
import dateline from "./components/dateline";
import axios from "axios";

export default {
  name: 'app',
  components: {
    timelineWrapper,
    dateline,
  }, methods: {
    getProjectId () => {

}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1224px;
  width: 100%;
}

</style>
