<template>
  <div class="pubInfo">
    <div class="hintHead">
      <div class="tipbox">
        <p>好的简历有助于好老板找到你 <span class="example" @click="showExample=true">效果展示</span></p>
      </div>
    </div>

    <form ref="formInfo" action="/api/resume/add" method="post">
    <group gutter='0'>
      <popup-picker 
        :title="redDot + '操作设备'" 
        :data="macTypeData" 
        v-model="macTypeVal" show-name 
        placeholder="请选择"> 
      </popup-picker>
      <popup-picker 
        :title="redDot + '期望地点'" 
        :data="addressData" 
        v-model="addVal" show-name
        placeholder="请选择"> 
      </popup-picker>
      <popup-picker placeholder="请选择" show-name :title="redDot + '其它地区'" :data="anotherAddList" v-model="anotherAddVal"></popup-picker>
      <popup-picker placeholder="请选择" show-name :title="redDot + '驾龄'" :data="driveAgeList" v-model="driveAge"></popup-picker>
    </group>
    <group gutter='0.2rem'>
      <cell title="照片" value-align='right'>
        <input name="image" type="file" accept="image/*" id="photo">
      </cell>
      <popup-picker placeholder="请选择" show-name :title="redDot + '操作方向'" :data="operateList" v-model="operate"></popup-picker>
      <popup-picker placeholder="请选择" show-name :title="redDot + '期望薪资'" :data="salaryList" v-model="salary"></popup-picker>
      <x-input :title="redDot + '手机号码'" v-model="phone" text-align='right'></x-input>
      <div class="mycell">
        <p>自我介绍</p>
        <div class="summary">
          <textarea id="" cols="30" rows="10" v-model="description"
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

      <!-- 设备类型 -->
      <input type="hidden" name="car_type_id" v-model="macTypeVal">
      <!-- 工作地点 -->
      <input type="hidden" name="address_id" v-model="addVal">
      <!-- 可接受的工作范围 -->
      <input type="hidden" name="location" v-model="anotherAddVal">
      <!-- 驾龄 -->
      <input type="hidden" name="working_age" v-model="driveAge">
      <!-- 操作方向 -->
      <input type="hidden" name="mode" v-model="operate">
      <!-- 月薪 -->
      <input type="hidden" name="base_salary" :value="JSON.parse(this.salary[0])[0]">
      <input type="hidden" name="max_salary" :value="JSON.parse(this.salary[0])[1]">
      <!-- 联系电话 -->
      <input type="hidden" name="mobile" v-model="phone">
      <!-- 工作技能 -->
      <input type="hidden" name="skill_list[]" v-for="(item, index) in skills_name" :key="index" :value="item">
      <!-- 工作介绍 -->
      <input type="hidden" name="description" v-model="description">
      <!-- 操作证 -->
      <input type="hidden" name="certified" v-model="zhengshu">
      <!-- 是否愿意付费 -->
      <input type="hidden" name="will_pay" v-model="isLikePay">
      <a class="submit" @click.prevent="submitResume" href="../result/index.html?restype=pubresume">提交</a>
    </form>

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
  PopupPicker,
  Selector,
  Group,
  XInput,
  Cell,
  Checker,
  CheckerItem,
  XDialog
} from "vux";
//import macTypeData from "@/components/macType.js";
import macTypeData from "@/data/car_type.json";
//import skillList from "@/components/SkillList.js";
import provinceData from "@/data/prov.json"
import modes from "@/data/mode_type.json"
import skillList from "@/data/skills.json"
import workingAge from "@/data/working_age.json"
import salaryList from "@/data/salary.json"
import location from "@/data/location.json"
export default {
  data() {
    return {
      addressData: provinceData,
      addVal: [],
      anotherAddVal: [],
      anotherAddList: location,
      macTypeData: macTypeData,
      macTypeVal: [],
      operate: [],
      operateList: modes,
      isLikePay: "",
      isLikePayList: [{ key: 1, value: "是" }, { key: 2, value: "否" }],
      skillList: skillList,
      workContent: [],
      zhengshu: "",
      zhengshuList: [
        { key: 1, value: "有" },
        { key: 2, value: "无" },
        { key: 3, value: "想办证" }
      ],
      driveAge: [],
      driveAgeList: workingAge,
      salaryList: salaryList,
      salary: [],
      phone: "",
      description: "",
      redDot: "<span style='color:red;'>*</span>",

      showExample: false,
      editType: "/api/resume/add",
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
  computed: {
    skills_name() {
      let names = [];
      this.workContent.forEach((item, index, arr) => {
        names.push(this.skillList[index].key);
      });
      return names;
    },
  },
  methods: {
    getErrorInfo(key) {
      var infoMap = {
        "001": "请选择设备类型",
        "002": "请选择工作地点",
        "003": "请选择操作方向",
        "004": "请选择吃住方式",
        "005": "请选择月薪",
        "006": "请填写联系电话",
        "007": "请填写正确的电话格式",
        "008": "请选择驾龄"
      };
      return infoMap[key];
    },
    validatePubInfo() {
      if (this.macTypeVal == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("001"),
          type: "text"
        });
        return false;
      }
      if (this.addVal == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("002"),
          type: "text"
        });
        return false;
      }
      if (this.driveAge == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("008"),
          type: "text"
        });
        return false;
      }
      if (this.operate == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("003"),
          type: "text"
        });
        return false;
      }
      if (this.eat == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("004"),
          type: "text"
        });
        return false;
      }
      if (this.salary == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("005"),
          type: "text"
        });
        return false;
      }
      if (this.phone == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("006"),
          type: "text"
        });
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.$vux.toast.show({
          text: this.getErrorInfo("007"),
          type: "text"
        });
        return false;
      }
      return true;
    },
    submitResume() {
      if (this.validatePubInfo()) {
        //前端校验通过
        this.axios.post(this.editType, new FormData(this.$refs.formInfo)).then((res) => {
          //todo 后端返回错误需处理
          console.log(res)
          window.location.href = "../result/index.html?restype=" + JSON.stringify(this.getResInfo(res))
        });
      } else {
        //前端校验不通过
      }
    },
    getResInfo(res){
      return {
          content1: "简历提交成功",
          content2: "正在跳转至我的简历",
          button1: "点击返回应聘界面",
          button2: "点击查看我的简历",
          url1: "../index.html",
          url2: "../resumepreview/index.html",
          title: "简历提交成功"
      }
    },
    getHisInfo(){
      this.axios.post("/api/resume/detail")
      .then((res) => {
        if(res.data.data.car_type_id){
          this.editType = "/api/resume/update"
          this.setHisInfo(res.data.data)
        }
      })
    },
    getSkillValue(keys){
      keys = keys.split(' ')
      return keys.map((x, index) => {
        return this.skillList.find((item, index) => {
          return item.key == x
        }).value
      })
    },
    setHisInfo(data){
      Object.keys(data).forEach((item, index) => {
        if(data[item]){
          data[item] = data[item].toString()
        }
      })
      this.macTypeVal = [data.car_type_id]
      this.addVal = [data.address_id]
      this.anotherAddVal = [data.location]
      this.driveAge = [data.working_age]
      this.operate = [data.mode]
      //todo 薪资form初始无值时有报错 这里的接口定义与前端不吻合导致
      this.salary = [JSON.stringify([parseInt(data.base_salary), parseInt(data.max_salary)])]
      this.phone = data.mobile
      this.description = data.description
      //todo 这里的接口返回的是数值不是id导致前端双层遍历查找
      this.workContent = this.getSkillValue(data.skills)
      this.zhengshu = data.certified
      this.isLikePay = data.will_pay
    }
  },
  mounted(){
    this.getHisInfo()
  },
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
