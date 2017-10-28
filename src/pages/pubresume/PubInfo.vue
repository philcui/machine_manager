<template>
  <div class="pubInfo">
    <div class="hintHead">
      <div class="tipbox">
        <p>好的简历有助于好老板找到你 <span class="example" @click="showExample=true">效果展示</span></p>
      </div>
    </div>
    <group gutter='0'>
      <popup-picker 
        :title="redDot + '操作设备'" 
        :data="macTypeData" 
        v-model="macTypeVal" show-name 
        :columns="3" placeholder="请选择"> 
      </popup-picker>
      <x-address  
        :title="redDot + '期望地点'" v-model="addVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <popup-picker placeholder="请选择" show-name :title="redDot + '其它地区'" :data="anotherAddList" v-model="anotherAddVal"></popup-picker>
      <popup-picker placeholder="请选择" :title="redDot + '驾龄'" :data="driveAgeList" v-model="driveAge"></popup-picker>
    </group>
    <group gutter='0.2rem'>
      <cell title="照片" value-align='right'>
        <input type="file">
      </cell>
      <popup-picker placeholder="请选择" show-name :title="redDot + '操作方向'" :data="operateList" v-model="operate"></popup-picker>
      <popup-picker placeholder="请选择" :title="redDot + '期望薪资'" :data="salaryList" v-model="salary"></popup-picker>
      <x-input :title="redDot + '手机号码'" v-model="phone" text-align='right'></x-input>
      <div class="mycell">
        <p>自我介绍</p>
        <div class="summary">
          <textarea name="" id="" cols="30" rows="10"
          placeholder="可以介绍自己能干啥活，个人优势，工资待遇要求，有助于找到好工作（50字以内）"></textarea>
        </div>
      </div>
      <div class="mycell nextTip">
        <p>【以下部分为选填项】</p>
        <p class="smdesc">如果你能详细填写，好工作会优先找到你</p>
      </div>
    </group>
    <group gutter='0.2rem'>
      <div class="mycell skillcell">
        <p>工作技能</p>
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

    <x-dialog v-model="showExample" class="dialog-demo" :dialog-style="{'background-color': 'transparent', 'width': '87%', 'max-width': '100%'}">
      <div class="img-box">
        <img src="./img/example_resume.png" style="max-width:100%">
      </div>
      <div @click="showExample=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>
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
  CheckerItem,
  XDialog
} from "vux";
import macTypeData from "@/components/macType.js";
import skillList from "@/components/SkillList.js";
export default {
  data() {
    return {
      addressData: ChinaAddressV4Data,
      addVal: [],
      anotherAddVal: [],
      anotherAddList: [
        [
          { name: "只在本市干", value: "0" },
          { name: "本市和周边都可以去", value: "1" },
          { name: "外省也可以去", value: "2" }
        ]
      ],
      macTypeData: macTypeData,
      macTypeVal: [],
      operate: [],
      operateList: [
        [
          { name: "左右旋转(正手)", value: "0" },
          { name: "上下旋转(反手)", value: "1" },
          { name: "都会", value: "2" }
        ]
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
      driveAge: [],
      driveAgeList: [
        [
          "学徒",
          "1年",
          "2年",
          "3年",
          "4年",
          "5年",
          "6年",
          "7年",
          "8年",
          "9年",
          "10年",
          "11年",
          "12年",
          "13年",
          "14年",
          "15年",
          "16年",
          "17年",
          "18年",
          "19年",
          "20年",
          "20年以上"
        ]
      ],
      salaryList: [
        [
          "面议",
          "0-3000",
          "3000-4000",
          "4000-5000",
          "5000-6000",
          "6000-7000",
          "7000-8000",
          "8000-9000",
          "9000-10000",
          "10000-11000",
          "11000-12000",
          "12000以上"
        ]
      ],
      salary: [],
      phone: "",
      redDot: "<span style='color:red;'>*</span>",

      showExample: false
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
    CheckerItem,
    XDialog
  },
  methods: {}
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
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    .tipbox {
      width: 100%;
      border: 0.05rem solid @theme-color;
    }
    p {
      text-align: center;
      color: #eeeeee;
      font-size: 0.25rem;
      padding: 0.06rem;
      .example {
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
  .summary {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
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
    height: 0.9rem;
    line-height: 0.9rem;
    background-color: @theme-color;
    color: white;
    text-align: center;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }
}

.mycell {
  margin-left: 0.28rem;
  padding-right: 0.28rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  border-top: 0.5px solid @divid-color;
}
.nextTip {
  font-size: 0.24rem;
  text-align: center;
  .smdesc {
    font-size: 0.186rem;
    color: #434343;
  }
}
.skillcell {
  padding-right: 0 !important;
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
.img-box {
  height: 7.46rem;
  overflow: hidden;
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
</style>
