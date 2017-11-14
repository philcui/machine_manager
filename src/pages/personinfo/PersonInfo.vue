<template>
  <div class="personInfo">
    <group gutter='0'>
      <cell title="头像">
        <img class="tx" src="./img/tx.png">
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
      <x-button type="primary">保存</x-button>
    </div>
  </div>  
</template>

<script>
import {Group, Cell, XInput, XAddress, ChinaAddressV4Data, XTextarea, XButton} from "vux"
export default {
  data(){
    return {
      addressData: ChinaAddressV4Data,
      name: '',
      phone: '',
      address: [],
      introduce: '',
    }
  },
  methods: {

  },
  components:{
    Group,
    Cell,
    XInput,
    XAddress,
    XTextarea,
    XButton,
  }
}
</script>

<style lang="less" scoped>
  .personInfo{
    .tx{
      width: 1.13rem;
      height: 1.13rem;
    }
    .save-content{
      padding: 10px 15px;
    }
  }
</style>
