<template>
  <div class="personalCenter">
    <tab-bottom :selectedItem='3'></tab-bottom>
  </div>  
</template>

<script>
import TabBottom from "@/components/TabBottom.vue" 
export default {
  data(){
    return {

    }
  },
  components: {
    TabBottom
  }
}
</script>

<style lang="less" scoped>
  .personalCenter{
    height: 100%;
  }
</style>
