<template>
  <div class="pubInfo">
    <div class="hintHead">
      <div class="tipbox">
        <p>工机管家平台有三万多名注册的驾驶员</p>
        <p>主动发布让驾驶员联系你</p>
      </div>
    </div>
    <group gutter='0'>
      <popup-picker 
        :title="redDot + '设备类型'" 
        :data="macTypeData" 
        v-model="macTypeVal"
        show-name 
        placeholder="请选择"> 
      </popup-picker>
      <!-- <popup-picker 
        :title="redDot + '工作地点'" 
        :data="addressData" 
        v-model="addVal" show-name
        placeholder="请选择"> 
      </popup-picker> -->
      <x-address  
        :title="redDot + '期望地点'" v-model="addVal" 
        :list="addressData" placeholder="请选择">
      </x-address>
      <!-- <div class="mycell addTip">
        提示：为了更好的服务大家，目前只开通11个省份的招聘服务，其他省份请
        <a href="">点此发布</a>
      </div> -->
      <popup-picker placeholder="请选择" show-name :title="redDot + '操作方向'" :data="operateList" v-model="operate"></popup-picker>
      <popup-picker placeholder="请选择" show-name :title="redDot + '吃住'" :data="eatList" v-model="eat"></popup-picker>
    </group>
    <group gutter='0.2rem'>
      <popup-picker placeholder="请选择" show-name :title="redDot + '月薪'" :data="salaryList" v-model="salary"></popup-picker>
      <x-input placeholder="请填写" :title="redDot + '联系电话'" v-model="phone" text-align='right'></x-input>
      <div class="mycell nextTip">【以下部分为选填项】</div>
    </group>
    <group gutter='0.2rem'>
      <div>
        <p class="checker_content">工作内容</p>
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
        <p class="checker_content">是否压工资</p>
        <checker class="checker" v-model="bondSalary" default-item-class="work-item" selected-item-class="work-item-selected">
          <checker-item 
            v-for="(item, index) in bondList" 
            :key="index" 
            :value='item.value'>
            {{item.key}}
          </checker-item>
        </checker>
      </div>
      <div class="mycell">
        <p>工作介绍</p>
        <div class="summary">
          <textarea name="" id="" cols="30" rows="10" v-model="description"
          placeholder="可以填写工作要求，福利待遇，工资结算，特殊要求等等，60字以内"></textarea>
        </div>
      </div>
      <selector title="是否愿意付费找驾驶员" direction='rtl' placeholder="请选择" v-model="isLikePay" :options="isLikePayList"></selector>
    </group>
    <a href="" @click.prevent="submitPubInfo" class="submit">提交</a>
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
//import macTypeData from "@/components/macType.js";
import macTypeData from "@/data/car_type.json";
import benefit from "@/data/benefit.json";
import skillList from "@/data/skills.json";
//import skillList from "@/components/SkillList.js";
import provinceData from "@/data/prov.json";
import salaryList from "@/data/salary.json";
export default {
  data() {
    return {
      addressData: ChinaAddressV4Data,
      addVal: [],
      macTypeData: macTypeData,
      macTypeVal: [],
      operate: [],
      operateList: [
        [{ name: "左右旋转(正手)", value: "1" }, { name: "上下旋转(反手)", value: "2" }]
      ],
      eat: [],
      eatList: benefit,
      isLikePay: "",
      isLikePayList: [{ key: true, value: "是" }, { key: false, value: "否" }],
      skillList: skillList,
      workContent: [],
      salaryList: salaryList,
      salary: [],
      phone: "",
      description: "",
      redDot: "<span style='color:red;'>*</span>",
      bondSalary: "",
      bondList: [
        {
          key: "不压",
          value: 1,
        },
        {
          key: "压半个月",
          value: 2,
        },
        {
          key: "压一个月",
          value: 3,
        },
        {
          key: "面议",
          value: 4,
        }
      ]
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
        "007": "请填写正确的电话格式"
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
    submitPubInfo() {
      if (this.validatePubInfo()) {
        //前端校验通过
        this.axios.post("/api/job/add", this.qs.stringify({
          car_type_id: this.macTypeVal[0],
          address_id: this.addVal[2],
          mode: this.operate[0],
          benefit_type: this.eat[0],
          base_salary: JSON.parse(this.salary[0])[0],
          max_salary: JSON.parse(this.salary[0])[1],
          mobile: this.phone,
          skill_list: this.skills_name,
          bond: this.bondSalary,
          description: this.description,
          will_pay: this.isLikePay,
        }))
        .then((res) => {
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
          content1: "发布招聘信息成功",
          content2: "我们会尽审核",
          button1: "发布成功",
          button2: "返回首页",
          url1: "../index.html",
          url2: "../index.html",
          title: "发布招聘信息成功"
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
      this.addVal = this.getAddList(data.address_id)
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
      this.realname = data.realname
      document.querySelector(".prev").src = data.image
    },
    getAddList(target){
      let res = []
      res.push(target.substring(0, 2) + "0000")
      res.push(target.substring(0, 4) + "00")
      res.push(target)
      return res
    }
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
  mounted(){
    //修改发布的招聘信息
    let type = ""
    if(type == 'change'){
      this.getHisInfo()
    }
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
    padding: 0.1rem 0.2rem;
    box-sizing: border-box;
    .tipbox {
      border: 0.05rem solid @theme-color;
    }
    p {
      text-align: center;
      color: #eeeeee;
      font-size: 0.25rem;
    }
  }
  .addTip {
    font-size: 0.2rem;
    color: #626262;
    a {
      color: @theme-color;
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
  }
  .checker {
    margin-left: 0.28rem;
  }
  .summary {
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    padding: 0.15rem;
    border: 1px solid @divid-color;
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
.checker_content {
  padding-left: 0.22rem;
  line-height: 0.7rem;
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
</style>
