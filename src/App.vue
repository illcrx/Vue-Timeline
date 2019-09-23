<template>
  <div id="app">
    <div v-if="stages">
      <timeline :stages="stages" />
    </div>
    <div v-else>
      <h1>Loading yo shit.</h1>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Timeline from "./components/Timeline.vue";
import { fetchAzBexByProjectId } from "./api";

export default {
  name: "app",
  data: () => {
    return {
      stages: []
    };
  },
  components: {
    Timeline
  },
  methods: {
    getProjectId() {
      function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(
          /[?&]+([^=&]+)=([^&]*)/gi,
          function(m, key, value) {
            vars[key] = value;
          }
        );
        return vars;
      }
    }
  },
  computed: {},
  async mounted() {
    // this.getProjectId()["project_id"];
    this.stages = await fetchAzBexByProjectId({ projectId: 15 });
  }
};
</script>

<style>
#app {
  font-family: Quicksand, "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1224px;
  width: 100%;
}
</style>
