<template>
  <div id="app">
    <div class="top">
      <div class="uploader">
        <input type="file" class="upload">
      </div>
    </div>
    <div class="bottom">
      <x-button type="primary">提交认证</x-button>
      <div class="tip">
        <img src="./img/icon_op.png" alt="">
        <div class="tipText">如果你没有操作证，想找一家可靠的公司正规办理操作证，请<a href="">点此办理</a></div>
      </div>  
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    XButton
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app {
  .top {
    background-color: @second-color;
    height: 4.12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .uploader {
      height: 3.18rem;
      width: 5.48rem;
      border: 1px solid white;
      background: url("./img/bg_upload.png") center center no-repeat;
      background-size: 85%;
      background-color: @theme-color;
      .upload{
        opacity: 0;
        height: 100%;
        width: 100%;
      }
    }
  }
  .bottom {
    padding: 0.26rem 0.48rem;
    .tip {
      display: flex;
      align-items: center;
      font-size: 0.253rem;
      margin-top: 0.7rem;
      .tipText {
        word-break: break-all;
        word-wrap: break-word;
        a {
          color: @theme-color;
        }
      }
      img {
        height: 0.52rem;
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
