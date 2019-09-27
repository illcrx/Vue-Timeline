<template>
  <span
    class="eventLine"
    :title="eventInformation "
    @mouseover="createTitleInformation(event)"
  >|
  </span>
</template>

<script>
  export default {
    name: "eventLine",
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    data: () => {
      return {
        eventInformation: ""
      }
    },
    methods: {
      createTitleInformation(event){
        console.log(event.name);
        this.eventInformation = event.name;

      }
    },
    computed: {

    },
    watch: {},
    created() {
    }


  }
</script>

<style scoped>
.eventLine {
  font-size: 1.3em;
  margin:0;
  padding:0;
  line-height: unset;
}
</style>