<template>
  <div class="personInfo">
    <group gutter='0'>
      <cell title="头像">
        <div class="uploadWrap">
          <img src="../../assets/avatar.png" alt="" class="prev">
          <input name="image" type="file" @change="fileChange" accept="image/*" id="photo" class="upload">
        </div>
      </cell>
      <x-input text-align='right' title="名字" v-model="nickname"></x-input>
      <!--<x-input text-align='right' title="手机" v-model="phone"></x-input>-->
      <x-address title="地址" v-model="address" :list="addressData" ></x-address>
    </group>
    <group>
      <cell @click.native="gotoAuth" title="身份证认证">{{idcardPassed}}</cell>
      <cell title="自我介绍"></cell>
      <x-textarea placeholder="介绍自己的实力、信誉等等" v-model="introduce"></x-textarea>
    </group>
    <div class="save-content">
      <x-button @click.native="submitInfo" type="primary">保存</x-button>
    </div>
  </div>
</template>

<script>
import {
  Group,
  Cell,
  XInput,
  XAddress,
  ChinaAddressV4Data,
  XTextarea,
  XButton
} from "vux";
export default {
  data() {
    return {
      addressData: ChinaAddressV4Data,
      nickname: "",
      //phone: "",
      address: [],
      introduce: "",
      src: require("./img/tx.png"),
      idcardPassed: "未认证",
      info: {},
    };
  },
  methods: {
    getErrorInfo(key) {
      var infoMap = {
        "001": "请填写姓名"
      };
      return infoMap[key];
    },
    validateInfo() {
      // if (this.nickname == "") {
      //   this.$vux.toast.show({
      //     text: this.getErrorInfo("001"),
      //     type: "text"
      //   })
      //   return false
      // }
      return true;
    },
    submitInfo() {
      if (this.validateInfo()) {
        //前端校验通过
        let formdata = new FormData();
        formdata.append("nickname", this.nickname);
        //formdata.append("mobile", this.phone);
        formdata.append("address_id", this.address[2]);
        formdata.append("description", this.introduce);
        if(document.querySelector(".upload").value){
          formdata.append("avatar", document.querySelector(".upload").files[0])
        }
        this.axios.post("/api/user/update-profile", formdata).then(res => {
          console.log(res);
          this.$vux.toast.show({
            type: "success",
            text: res.data.msg
          })
        });
      } else {
      }
    },
    fileChange(e) {
      let file = document.querySelector(".upload").files[0];
      let reader = new FileReader();
      reader.onload = function(e) {
        document.querySelector(".prev").src = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    getAddList(target) {
      let res = [];
      res.push(target.substring(0, 2) + "0000");
      res.push(target.substring(0, 4) + "00");
      res.push(target);
      return res;
    },
    gotoAuth(){
      window.location.href = "../idcardauth/index.html"
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton
  },
  mounted() {
    this.axios.post("/api/user/profile").then(res => {
      console.log(res);
      this.info = res.data.data;
      document.querySelector(".prev").src = this.info.avatar;
      this.nickname = this.info.nickname;
      //this.phone = this.info.mobile;
      this.introduce = this.info.description;
      this.address = this.getAddList(this.info.address_id.toString())
      this.idcardPassed = this.info.status & 4 ? "已认证" : "未认证"
    });
  }
};
</script>

<style lang="less" scoped>
.personInfo {
  .uploadWrap {
    position: relative;
    width: 1.13rem;
    height: 1.13rem;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    .prev {
      max-width: 100%;
      height: 100%;
    }
    .upload {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
  .save-content {
    padding: 10px 15px;
  }
}
</style>
