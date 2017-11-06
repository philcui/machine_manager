<template>
  <div class="percent">
    <div class="inner" :style="innerStyle"></div>
  </div>  
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: this.percent
    };
  },
  computed:{
    innerStyle(){
      return {
        width: this.percent.toString() + '%'
      }
    }
  },
  methods: {},
  mounted() {
    
  }
};
</script>

<style lang='less' scoped>
.percent {
  height: 0.1rem;
  width: 100%;
  border-radius: 0.04rem;
  background-color: #cfb999;
  border: 1px solid @divid-color;
  .inner {
    height: 100%;
    background-color: white;
    transition: width 2s;
    border-radius: 0.04rem;
  }
}
</style>
