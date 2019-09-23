import Timeline from "./components/Timeline.vue";

export default {
  install(Vue, options = {}) {
    Vue.component("x-timeline", Timeline);
  },
  name: "VueTimeline",
  version: process.env.VUE_APP_VUE_TIMELINE_VERSION,
};
