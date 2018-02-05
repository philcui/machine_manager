<template>
  <div class="oneKeyShare" :style="pStyle">
    <p class="tip">分享到朋友圈，赚积分，可以让更多业务找到你</p>
    <a @click="shareTip" class="shareButton">一键分享</a>
    <share-guide @closeGuide="closeGuide" :show="showTip"></share-guide>
  </div>  
</template>

<script>
import ShareGuide from "@/components/ShareGuide.vue"
export default {
  data(){
    return {
      showTip: false
    }
  },
  props: {
    pStyle: Object
  },
  methods:{
    shareTip(){
      this.showTip = true
    },
    closeGuide(){
      this.showTip = false;
    }
  },
  components: {
    ShareGuide,
  }
}
</script>

<style lang='less' scoped>
.oneKeyShare{
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0.8rem;
  .tip{
    color: #626262;
    font-size: 0.216rem;
    margin-bottom: 0.2rem;
  }
  .shareButton{
    display: inline-block;
    height: 0.84rem;
    width: 4.66rem;
    text-align: center;
    line-height: 0.84rem;
    color: white;
    font-size: 0.32rem;
    border-radius: 0.05rem;
    background-color: @theme-color;
  }
}
</style>
