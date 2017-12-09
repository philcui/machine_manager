<template>
  <div id="app">
    <div class="top">
      <div class="uploader">
        <img src="./img/bg_upload.png" alt="" class="prev">
        <input type="file" class="upload" @change="fileChange" accept="image/*" name="">
      </div>
    </div>
    <div class="bottom">
      <x-button @click.native="submitInfo" type="primary">提交认证</x-button>
      <div class="tip">
        <img src="./img/icon_op.png" alt="">
        <div class="tipText">如果你没有操作证，想找一家可靠的公司正规办理操作证，请<a @click="contact">点此办理</a></div>
      </div>
    </div>
    <alert v-model="show" title="办理操作证">
      <p>请电话联系:<a href="tel:15715718487">15715718487</a>(微信同号)</p>
      <p>我们的专业工作人员会跟你详细沟通</p>
    </alert>
  </div>
</template>

<script>
import { XButton, Alert } from "vux";
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    fileChange(e) {
      let file = document.querySelector(".upload").files[0];
      let reader = new FileReader();
      reader.onload = function(e) {
        document.querySelector(".prev").src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitInfo() {
      if (document.querySelector(".upload").value == "") {
        this.$vux.toast.show({
          text: "请上传操作证照片",
          type: "text"
        });
        return false;
      }
      let formdata = new FormData();
      formdata.append("image", document.querySelector(".upload").files[0]);
      this.axios.post("/api/check/add-cert", formdata).then(res => {
        console.log(res);
        this.$vux.toast.show({
          type: "success",
          text: "提交成功，请耐心等待审核"
        });
        setTimeout(() => {
          history.back()
        }, 1000)
      });
    },
    contact(){
      this.show = true
    },
  },
  components: {
    XButton,
    Alert,
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
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 85%;
        max-width: 100%;
      }
      .upload {
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
