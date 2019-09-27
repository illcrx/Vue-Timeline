<template>
  <div id="app">
    <div v-if="loading">
      <h1>Loading yo shit.</h1>
    </div>
    <div v-else>
      <timeline :stages="stages" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Timeline from "./components/Timeline.vue";
import { fetchAzBexByProjectId } from "./api";

export default {
  name: "app",
  components: {
    Timeline
  },
  data: () => {
    return {
      stages: [],
      loading: false,
      error: null,
      projectId: null
    };
  },
  methods: {
    parseQuery() {
      let search = window.location.search;
      return new URLSearchParams(search);
    },
    getProjectId() {
      return this.parseQuery().get("project_id");
    }
  },
  computed: {},
  async mounted() {
    let projectId = await this.getProjectId;
    if (typeof projectId != "number" || "string"  ) {
      projectId = '15';
    }
    console.log(typeof projectId, projectId);

    this.loading = true;
    try {
      this.stages = await fetchAzBexByProjectId( { projectId } );
    } catch (error) {
      this.error = error;
      console.error(error);
    }
    this.loading = false;
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
