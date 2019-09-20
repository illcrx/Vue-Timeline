<template>
  <div id="timelineWrapper">
    <timeline-item></timeline-item>
  </div>
</template>

<script>
  import timelineItem from "./timelineItem";

  export default {
    name: "timelineWrapper",
    components: {
      timelineItem
    },
    data: () => {
      return {
        timeline: []
      }
    },
    methods: {},
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
      this.timeline = [

      ]
    }


  }
</script>

<style scoped>
  #timelineWrapper {
    height: 225px;
    background-color: cornflowerblue;

  }
</style>