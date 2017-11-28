<template>
  <div class="pubInfo">
    <div class="hintHead">
      <div class="tipbox">
        <p>好的简历有助于好老板找到你 <span class="example" @click="showExample=true">效果展示</span></p>
      </div>
    </div>

    <form ref="formInfo" action="/api/resume/add" method="post">
    <group gutter='0'>
      <x-input :title="redDot + '姓名'" v-model="realname" text-align='right'></x-input>
      <popup-picker 
        :title="redDot + '操作设备'" 
        :data="macTypeData" 
        v-model="macTypeVal" show-name 
        placeholder="请选择"> 
      </popup-picker>
      <!-- <popup-picker 
        :title="redDot + '期望地点'" 
        :data="addressData" 
        v-model="addVal" show-name
        placeholder="请选择"> 
      </popup-picker> -->
      <x-address  
        :title="redDot + '期望地点'" v-model="addVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <popup-picker placeholder="请选择" show-name :title="redDot + '其它地区'" :data="anotherAddList" v-model="anotherAddVal"></popup-picker>
      <popup-picker placeholder="请选择" show-name :title="redDot + '驾龄'" :data="driveAgeList" v-model="driveAge"></popup-picker>
    </group>
    <group gutter='0.2rem'>
      <cell title="照片" value-align='right'>
        <div class="uploadWrap">
          <img src="../../assets/avatar.png" alt="" class="prev">
          <input name="image" type="file" @change="fileChange" accept="image/*" id="photo" class="upload">
        </div>
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
      <div class="mycell skillcell">
        <p>是否接受压工资</p>
        <checker class="checker" v-model="bondSalary" default-item-class="work-item" selected-item-class="work-item-selected">
          <checker-item 
            v-for="(item, index) in bondList" 
            :key="index" 
            :value='item.value'>
            {{item.key}}
          </checker-item>
        </checker>
      </div>
      <selector title="操作证" direction='rtl' placeholder="请选择" v-model="zhengshu" :options="zhengshuList"></selector>
      <selector title="是否愿意付费找工作" direction='rtl' placeholder="请选择" v-model="isLikePay" :options="isLikePayList"></selector>
    </group>
      <!-- 姓名 -->
      <input type="hidden" name="realname" v-model="realname">
      <!-- 设备类型 -->
      <input type="hidden" name="car_type_id" v-model="macTypeVal">
      <!-- 工作地点 -->
      <input type="hidden" name="address_id" v-model="addVal[2]">
      <!-- 可接受的工作范围 -->
      <input type="hidden" name="location" v-model="anotherAddVal">
      <!-- 驾龄 -->
      <input type="hidden" name="working_age" v-model="driveAge">
      <!-- 操作方向 -->
      <input type="hidden" name="mode" v-model="operate">
      <!-- 联系电话 -->
      <input type="hidden" name="mobile" v-model="phone">
      <!-- 工作技能 -->
      <input type="hidden" name="skill_list[]" v-for="(item, index) in skills_name" :key="index" :value="item">
      <!-- 压工资 -->
      <input type="hidden" name="bond" v-model="bondSalary">
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
//import macTypeData from "@/components/macType.js";
import macTypeData from "@/data/car_type.json";
//import skillList from "@/components/SkillList.js";
import provinceData from "@/data/prov.json"
import modes from "@/data/mode_type.json"
import skillList from "@/data/skills.json"
import workingAge from "@/data/working_age.json"
import salaryList from "@/data/salary.json"
import location from "@/data/location.json"
import bond from "@/data/bond.json"
export default {
  data() {
    return {
      addressData: ChinaAddressV4Data,
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
      realname: "",
      redDot: "<span style='color:red;'>*</span>",

      showExample: false,
      editType: "/api/resume/add",
      bondSalary: "",
      bondList: bond,
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
        names.push(this.skillList.find((it) => {return it.value == item}).key);
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
        "008": "请选择驾龄",
        "009": "请填写姓名"
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
      if (this.realname == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("009"),
          type: "text"
        });
        return false;
      }
      return true;
    },
    submitResume() {
      if (this.validatePubInfo()) {
        //前端校验通过
        let formInfo = new FormData(this.$refs.formInfo)
        formInfo.append("base_salary", JSON.parse(this.salary[0])[0])
        formInfo.append("max_salary", JSON.parse(this.salary[0])[1])
        if(!document.querySelector(".upload").value){
          formInfo.delete('image')
        }
        this.axios.post(this.editType, formInfo).then((res) => {
          //todo 后端返回错误需处理
          console.log(res)
          this.$vux.toast.show({
            type: "success",
            text: "提交成功"
          })
          setTimeout(() => {
            window.location.href = "../resumepreview/index.html?id=" + res.data.data.id
          }, 1000)
          //window.location.href = "../result/index.html?restype=" + JSON.stringify(this.getResInfo(res))
        });
      } else {
        //前端校验不通过
      }
    },
    getResInfo(res){
      return {
          content1: "简历提交成功",
          content2: "请选择",
          button1: "点击查看我的简历",
          button2: "返回首页",
          url1: "../resumepreview/index.html?id=" + res.data.data.id,
          url2: "../index.html",
          title: "简历提交成功"
      }
    },
    getHisInfo(){
      this.axios.post("/api/resume/detail")
      .then((res) => {
        console.log(res)
        if(res.data.data.car_type_id){
          this.editType = "/api/resume/update"
          this.setHisInfo(res.data.data)
        }
      })
    },
    getSkillValue(keys, list){
      if(keys == ""){
        return ""
      }
      keys = keys.split(' ')
      return keys.map((x, index) => {
        return list.find((item, index) => {
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
      this.addVal = this.getAddList(data.address_id)
      this.anotherAddVal = [data.location]
      this.driveAge = [data.working_age]
      this.operate = [data.mode]
      //todo 薪资form初始无值时有报错 这里的接口定义与前端不吻合导致
      this.salary = [JSON.stringify([parseInt(data.base_salary), parseInt(data.max_salary)])]
      this.phone = data.mobile
      this.description = data.description
      //todo 这里的接口返回的是数值不是id导致前端双层遍历查找
      this.workContent = this.getSkillValue(data.skills, this.skillList)
      this.bondSalary = data.bond
      this.zhengshu = data.certified
      this.isLikePay = data.will_pay
      this.realname = data.realname
      document.querySelector(".prev").src = data.image
    },
    fileChange(e){
      let file = document.querySelector(".upload").files[0]
      let reader = new FileReader()
      reader.onload = function(e){
        document.querySelector(".prev").src = e.target.result
      }
      reader.readAsDataURL(file)
    },
    getAddList(target){
      let res = []
      res.push(target.substring(0, 2) + "0000")
      res.push(target.substring(0, 4) + "00")
      res.push(target)
      return res
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
.img-box {
  height: 7.46rem;
  overflow: hidden;
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
.uploadWrap{
  position: relative;
  width: 4rem;
  height: 1rem;
  .prev{
    height: 100%;
  }
  .upload{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
  }
}
</style>
