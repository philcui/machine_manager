<template>
  <div class="personInfo">
    <group gutter='0'>
      <cell title="头像">
        <img class="tx" :src="src">
      </cell>
      <x-input text-align='right' title="名字" v-model="name"></x-input>
      <x-input text-align='right' title="手机" v-model="phone"></x-input>
      <x-address title="地址" v-model="address" :list="addressData" ></x-address>
    </group>
    <group>
      <cell title="身份证认证"></cell>
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
      name: "",
      phone: "",
      address: [],
      introduce: "",
      src: require("./img/tx.png"),
      info: {}
    };
  },
  methods: {
    getErrorInfo(key) {
      var infoMap = {
        "001": "请填写姓名",
      };
      return infoMap[key];
    },
    validateInfo(){
      // if (this.realname == "") {
      //   this.$vux.toast.show({
      //     text: this.getErrorInfo("001"),
      //     type: "text"
      //   })
      //   return false
      // }
      return true
    },
    submitInfo() {
      if (this.validateInfo()) {
        //前端校验通过
        let formdata = new FormData()
        formdata.append("realname", this.realname)
        formdata.append("mobile", this.phone)
        formdata.append("address_id", this.address[0])
        formdata.append("description", this.introduce)
        this.axios.post("api/user/update-profile", formdata)
        .then((res) => {
          console.log(res)
        })
      } else {
      }
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
      this.src = this.info.avatar;
      this.name = this.info.realname;
      this.phone = this.info.mobile;
      this.introduce = this.info.description;
    });
  }
};
</script>

<style lang="less" scoped>
.personInfo {
  .tx {
    width: 1.13rem;
    height: 1.13rem;
  }
  .save-content {
    padding: 10px 15px;
  }
}
</style>
