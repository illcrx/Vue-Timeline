<template>
  <div id="app">
    <div v-if="loading">
      <h1>Loading yo shit.</h1>
    </div>
    <div v-else>
      <timeline :stages="stages" />
    </div>

    <row-bar
      class="test"
      v-for="stage in stages"
      :key="stage.stageKey"
      :height="6"
      :stage="stage"
      :start="start"
      :end="end"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Timeline from "./components/Timeline.vue";
import RowBar from "./components/RowBar.vue";
import { fetchAzBexByProjectId } from "./api";
import { Stage } from "./models/Stage";

export default {
  name: "app",
  components: {
    Timeline,
    RowBar
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
  computed: {
    dateRange() {
      return Stage.computeProjectRange(this.stages);
    },
    start() {
      return this.dateRange.start;
    },
    end() {
      return this.dateRange.end;
    }
  },
  async mounted() {
    let projectId = await this.getProjectId;
    if (typeof projectId != "number" || "string") {
      projectId = "15";
    }
    console.log(typeof projectId, projectId);

    this.loading = true;
    try {
      this.stages = await fetchAzBexByProjectId({ projectId });
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

.test {
  margin-top: 4rem;
  background-color: hsl(208, 68%, 83%);
}
</style>
