<template>
  <div class="pubInfo">
    <div class="hintHead">
      <p>好的简历有助于好老板找到你 <span class="example">效果展示</span></p>
    </div>
    <group gutter='0' title="必填项">
      <popup-picker 
        title="操作设备" 
        :data="macTypeData" 
        v-model="macTypeVal" 
        :columns="3" placeholder="请选择"> 
      </popup-picker>
      <x-address  
        title="期望地点" v-model="addVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <x-address  
        title="其它地区" v-model="anotherAddVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <x-input title="驾龄" v-model="driveAge" text-align='right'></x-input>
    </group>
    <group>
      <selector title="操作方向" direction='rtl' placeholder="请选择" v-model="operate" :options="operateList"></selector>
      <x-input title="期望薪资" v-model="salary" text-align='right'></x-input>
      <x-input title="手机号码" v-model="phone" text-align='right'></x-input>
      <div>
        <cell title="自我介绍"></cell>
        <div class="summary">
          <textarea name="" id="" cols="30" rows="10"
          placeholder="可以介绍自己能干啥活，个人优势，工资待遇要求，有助于找到好工作（50字以内）"></textarea>
        </div>
      </div>
    </group>
    <group title="选填项">
      <div>
        <cell title='工作技能'></cell>
        <checker class="checker" type='checkbox' v-model="workContent" default-item-class="work-item" selected-item-class="work-item-selected">
          <checker-item 
            v-for="(item, index) in skillList" 
            :key="index" 
            :value='item.value'>
            {{item.key}}
          </checker-item>
        </checker>
      </div>
      <selector title="操作证" direction='rtl' placeholder="请选择" v-model="zhengshu" :options="zhengshuList"></selector>
      <selector title="是否愿意付费找工作" direction='rtl' placeholder="请选择" v-model="isLikePay" :options="isLikePayList"></selector>
    </group>
    <a class="submit" href="../result/index.html?restype=pubresume">提交</a>
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
      anotherAddVal: [],
      macTypeData: macTypeData,
      macTypeVal: [],
      operate: "",
      operateList: [
        { key: "0", value: "正手" },
        { key: "1", value: "反手" },
        { key: "2", value: "其它" }
      ],
      isLikePay: "",
      isLikePayList: [{ key: true, value: "是" }, { key: false, value: "否" }],
      skillList: skillList,
      workContent: [],
      zhengshu: "",
      zhengshuList: [
        { key: true, value: "有" },
        { key: true, value: "无" },
        { key: true, value: "想办证" }
      ],
      driveAge: "",
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
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      color: #eeeeee;
      font-size: 0.25rem;
      padding-top: 0.06rem;
      .example{
        display: inline-block;
        text-align: center;
        width: 1.19rem;
        background-color: @second-color;
        color: white;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.225rem;
        border-radius: 0.05rem;
      }
    }
  }
  .checker {
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
