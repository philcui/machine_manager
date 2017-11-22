<template>
  <div id="app">
    <div class="top">
      <div class="uploader">
        <img src="./img/bg_upload.png" alt="" class="prev">
        <input type="file" class="upload" @change="fileChange" name="">
      </div>
    </div>
    <div class="bottom">
      <x-button @click.native="submitInfo" type="primary">提交认证</x-button>
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
  methods: {
    fileChange(e){
      let file = document.querySelector(".upload").files[0]
      let reader = new FileReader()
      reader.onload = function(e){
        document.querySelector(".prev").src = e.target.result
      }
      reader.readAsDataURL(file)
    },
    submitInfo(){
      if (document.querySelector(".upload").value == "") {
        this.$vux.toast.show({
          text: "请上传操作证照片",
          type: "text"
        })
        return false
      }
      let formdata = new FormData()
      formdata.append("image", document.querySelector(".upload").files[0])
      this.axios.post("/api/check/cert-id", formdata)
      .then((res) => {
        console.log(res)
      })
    },
  },
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
      background-color: @theme-color;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 85%;
      }
      .upload{
        position: absolute;
        top: 0;
        left: 0;
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
