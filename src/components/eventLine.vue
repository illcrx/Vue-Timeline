<template>
  <span
    class="eventLine"
    :title="tooltipInformation"
    @mouseover="createTitleInformation(event)"
  >|
    <a href="#" :title="toolTipInformation" class="tooltip"></a>
  </span>
</template>

<script>
  import { Stage } from "../models/Stage";
  export default {
    name: "eventLine",
    props: {
      event: {
        type: Object,
        required: true
      },
      stage: {
        type: Object,
        required: true
      },
      projectStart: {
        type: Date,
        required: true
      },
      projectEnd: {
        type: Date,
        required: true
      }
    },
    data: () => {
      return {
        toolTipInformation:{

        }
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
  .tooltip {
    display: inline;
    position: relative;
  }
.tooltip:hover:after{
  background: #333;
  background: rgba(0,0,0,.8);
  border-radius: 5px;
  bottom: 26px;
  color: #fff;
  content: attr(title);
  left: 20%;
  padding: 5px 15px;
  position: absolute;
  z-index: 98;
  width: 220px;
}
.tooltip:hover:before{
  border: solid;
  border-color: #333 transparent;
  border-width: 6px 6px 0 6px;
  bottom: 20px;
  content: "";
  left: 50%;
  position: absolute;
  z-index: 99;
}
</style>