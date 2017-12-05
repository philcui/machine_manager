<template>
  <div class="mask" v-show="show">
    <img class="guide_line" src="../assets/guide-img.png" alt="">
    <div class="tip">
      <div class="tipText">快点击右上角，分享给好友</div>
      <div @click="closeTip" class="close">我知道了</div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      
    };
  },
  methods: {
    closeTip(){
      this.$emit("closeGuide")
    }
  }
};
</script>

<style lang='less' scoped>
.mask {
  z-index: 999;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  .guide_line {
    width: 100%;
  }
  .tip {
    position: absolute;
    text-align: center;
    top: 3.3rem;
    left: 0;
    width: 100%;
    .tipText {
      font-size: 0.35rem;
      color: #e2b20b;
      font-weight: bold;
    }
    .close {
      text-align: center;
      font-size: 0.25rem;
      border: 1px solid #fff;
      border-radius: 0.1rem;
      width: 2rem;
      text-align: center;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #fff;
      margin: 0.5rem auto;
    }
  }
}
</style>
