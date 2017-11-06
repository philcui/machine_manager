<template>
  <div class="personalCenter">
    <percent :percent="percent"></percent>
    <tab-bottom :selectedItem='3'></tab-bottom>
  </div>  
</template>

<script>
import TabBottom from "@/components/TabBottom.vue" 
import Percent from "@/components/Percent.vue"
export default {
  data(){
    return {
      percent: 0
    }
  },
  components: {
    TabBottom,
    Percent
  },
  mounted(){
    this.percent = 90
  }
}
</script>

<style lang="less" scoped>
  .personalCenter{
    height: 100%;
  }
</style>
