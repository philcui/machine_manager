<template>
  <div class="pubInfo">
    <div class="hintHead">
      <p>工机管家平台有三万多名注册的驾驶员</p>
      <p>主动发布让驾驶员联系你</p>
    </div>
    <group gutter='0' title="必填项">
      <popup-picker 
        title="设备类型" 
        :data="macTypeData" 
        v-model="macTypeVal" 
        :columns="3" placeholder="请选择"> 
      </popup-picker>
      <x-address  
        title="工作地点" v-model="addVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <selector title="操作方向" direction='rtl' placeholder="请选择" v-model="operate" :options="operateList"></selector>
    </group>
    <group>
      <x-input title="月薪" v-model="salary" text-align='right'></x-input>
      <x-input title="联系电话" v-model="phone" text-align='right'></x-input>
    </group>
    <group title="选填项">
      <div>
        <cell title='工作内容'></cell>
        <checker class="checker" type='checkbox' v-model="workContent" default-item-class="work-item" selected-item-class="work-item-selected">
          <checker-item 
            v-for="(item, index) in skillList" 
            :key="index" 
            :value='item.value'>
            {{item.key}}
          </checker-item>
        </checker>
      </div>
      <div>
        <cell title="工作介绍"></cell>
        <div class="summary">
          <textarea name="" id="" cols="30" rows="10"
          placeholder="可以填写工作要求，福利待遇，工资结算，特殊要求等等，60字以内"></textarea>
        </div>
      </div>
      <selector title="是否愿意付费找驾驶员" direction='rtl' placeholder="请选择" v-model="isLikePay" :options="isLikePayList"></selector>
    </group>
    <a href="../result/index.html?restype=pubinfo" class="submit">提交</a>
  </div>
</template>

<script>
import {
  XAddress,
  ChinaAddressV4Data,
  PopupPicker,
  Selector,
  Group,
  XInput,
  Cell,
  Checker,
  CheckerItem
} from "vux";
import macTypeData from "@/components/macType.js";
import skillList from "@/components/SkillList.js";
export default {
  data() {
    return {
      addressData: ChinaAddressV4Data,
      addVal: [],
      macTypeData: macTypeData,
      macTypeVal: [],
      operate: "",
      operateList: [
        { key: "0", value: "正手" },
        { key: "1", value: "反手" },
        { key: "2", value: "其它" }
      ],
      eatList: [
        { key: "0", value: "包吃包住" },
        { key: "1", value: "包吃" },
        { key: "2", value: "包住" },
        { key: "2", value: "都不包" }
      ],
      isLikePay: "",
      isLikePayList: [{ key: true, value: "是" }, { key: false, value: "否" }],
      skillList: skillList,
      workContent: [],
      salary: "",
      phone: ""
    };
  },
  components: {
    XAddress,
    PopupPicker,
    Selector,
    Group,
    XInput,
    Checker,
    Cell,
    CheckerItem
  }
};
</script>

<style lang='less' scoped>
.pubInfo {
  height: 100%;
  background-color: #eeeeee;
  .hintHead {
    background: url(./img/hr_bg.jpg) no-repeat center center;
    background-size: cover;
    height: 1.05rem;
    p {
      text-align: center;
      color: #eeeeee;
      font-size: 0.25rem;
      padding-top: 0.06rem;
    }
  }
  .checker{
    padding-left: 0.28rem;
  }
  .summary {
    margin: 0.15rem 0.26rem;
    padding: 0.15rem;
    border: 1px solid #e2e2e2;
    textarea {
      width: 100%;
      height: 1.21rem;
      resize: none;
      padding: 0;
      margin: 0;
      border: none;
    }
  }
  .submit {
    display: block;
    height: 0.62rem;
    line-height: 0.62rem;
    background-color: @theme-color;
    color: white;
    text-align: center;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }
}
.work-item {
  border: 1px solid #d1d5d0;
  min-width: 0.82rem;
  margin-right: 0.36rem;
  margin-bottom: 0.1rem;
  font-size: 0.21rem;
  text-align: center;
  height: 0.35rem;
  line-height: 0.35rem;
}
.work-item-selected {
  background-color: @theme-color;
  color: white;
}
</style>
