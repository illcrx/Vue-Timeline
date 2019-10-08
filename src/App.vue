<template>
  <div id="app">
    <div v-if="loading">
      <h1>Loading yo shit.</h1>
    </div>
    <div v-else>
      <timeline
        :stages="stages"
        :projectStart="projectStart"
        :projectEnd="projectEnd"
      />
    </div>

<!--    <row-bar-->
<!--      class="test"-->
<!--      v-for="stage in stages"-->
<!--      :key="stage.stageKey"-->
<!--      :height="5"-->
<!--      :stage="stage"-->
<!--      :start="start"-->
<!--      :end="end"-->
<!--    />-->

  </div>
</template>

<script>
import Vue from "vue";
import Timeline from "./components/Timeline.vue";
import dateline from "./components/dateline";
import RowBar from "./components/RowBar.vue";
import { fetchAzBexByProjectId } from "./api";
import { Stage } from "./models/Stage";

export default {
  name: "app",
  components: {
    Timeline,
    dateline,
    RowBar
  },
  data: () => {
    return {
      stages: [],
      loading: false,
      error: null,
      projectId: null,
      projectStart: null,
      projectEnd: null
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
      projectId = "18";
    }
    console.log(typeof projectId, projectId);

    this.loading = true;
    try {
      let { stages, projectDates } = await fetchAzBexByProjectId({ projectId });
      this.stages = stages;
      this.projectEnd = projectDates.projectEnd;
      this.projectStart = projectDates.projectStart;
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
