<template>
  <div id="app">
    <div class="head">
      <p>实名认证通过后，你的账号会有实名认证标签,</p>
      <p>提升你的信誉值，让更多商业机会找到你</p> 
    </div>
    <group gutter="0">
      <x-input title="姓名" placeholder="请输入" v-model="realname"></x-input>
      <x-input title="身份证号" placeholder="请输入" v-model="idcardnum"></x-input>
    </group>
    <div class="uploader">
      <div class="upwrap">
        <img src="./img/bg_upload.png" alt="" class="prev">
        <input type="file" class="upload" @change="fileChange" name="">
      </div>
      <p>点击上传本人身份证照片</p>
    </div>
    <div class="example">参考示例</div>
    <div class="demo">
      <img src="./img/demo_idcard.png" alt="">
      <div class="zhuyi">身份证上的所有信息清晰可见，必须能看清证件号。手持证件人的五官清晰可见，照片内容真实有效，不得做任何修改。 </div>
    </div>
    <x-button @click.native="submitInfo" type="primary">提交认证</x-button>
    <div class="xieyi">
      <input type="checkbox" checked readonly>
      <label for="">同意工机管家<a href="">《实名认证协议》</a></label>
    </div>
  </div>
</template>

<script>
import {Group, XInput, XButton} from "vux"
export default {
  data(){
    return {
      realname: '',
      idcardnum: '',
    }
  },
  methods:{
    fileChange(e){
      let file = document.querySelector(".upload").files[0]
      let reader = new FileReader()
      reader.onload = function(e){
        document.querySelector(".prev").src = e.target.result
      }
      reader.readAsDataURL(file)
    },
    validateInfo(){
      if (this.realname == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("001"),
          type: "text"
        })
        return false
      }
      if (this.idcardnum == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("002"),
          type: "text"
        })
        return false
      }
      if (document.querySelector(".upload").value == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("003"),
          type: "text"
        })
        return false
      }
      return true
    },
    getErrorInfo(key) {
      var infoMap = {
        "001": "请填写姓名",
        "002": "请填写身份证号",
        "003": "请上传身份证照片",
      };
      return infoMap[key];
    },
    submitInfo(){
      if(this.validateInfo()){
        //前端校验通过
        var formdata = new FormData()
        formdata.append("realname", this.realname)
        formdata.append("number", this.idcardnum)
        formdata.append("image", document.querySelector(".upload").files[0])
        this.axios.post("/api/check/add-id", formdata)
        .then((res) => {
          console.log(res)
        })
      }else{

      }
    }
  },
  components:{
    Group,
    XInput,
    XButton,
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

#app{
  background-color: white;
  .head{
    background-color: @theme-color;
    height: 1.1rem;
    text-align: center;
    font-size: 0.24rem;
    color: white;
    word-break: break-all;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .uploader{
    height: 2.9rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upwrap{
      width: 3.44rem;
      height: 1.94rem;
      position: relative;
      img{
        width: 100%;
      }
      .upload{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        top: 0;
        left: 0;
      }
    }
  }
  .example{
    background-color: #f8f8f8;
    font-size: 0.2667rem;
    padding-left: 15px;
    height: 0.54rem;
    line-height: 0.54rem;
    border-bottom: 1px solid @divid-color;
  }
  .demo{
    text-align: center;
    font-size: 0.186rem;
    color: #434343;
    img{
      width: 2.72rem;
      height: 1.9rem; 
      margin-top: 0.26rem;
    }
    .zhuyi{
      padding: 0.16rem 0.54rem;
    }
  }
  .xieyi{
    text-align: center;
    font-size: 0.186rem;
    color: #434343;
    margin-top: 0.16rem;
    input{
      vertical-align: middle;
    }
    a{
      color: @theme-color;
    }
  }
}
</style>
