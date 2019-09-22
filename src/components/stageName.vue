<template>
  <div class="timelineItemContainer">
    <span class="timelineItem">
     <span class="stageName"
     >
       {{stage.Event_Name}}
     </span>
      <stageTimeline
      v-for="event in passEvents"
      :event="event"
      class="stageTimelineRange"
      >
      </stageTimeline>
    </span>
  </div>
</template>

<script>
  import stageTimeline from "./stageTimeline";
  export default {
    name: "timelineName",
    components: {
      stageTimeline
    },
    props: ['stage', 'passEvents'],
    data: () => {
      return {}
    },
    methods: {},
    computed: {},
    watch: {},
    created() {
    }


  }
</script>

<style scoped>
  .timelineItemContainer {
    height: 60px;
  }
  p {
    padding: 0;
    margin: 0;
  }
  .stageName {
    padding: 0 25px;
    min-width: 178px; ;
  }
  .stageTimelineRange {
    background-color: crimson;

  }

</style>