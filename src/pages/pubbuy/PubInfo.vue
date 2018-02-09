<template>
  <div class="pubInfo">
    <group gutter='0'>
      <x-input :title="redDot + '设备类型'" v-model="macTypeVal" text-align='right' placeholder="请输入，例如小松pc200"></x-input>  
      <div style="border-top: 1px solid #e2e2e2;">
        <x-input :title="redDot + '需求地点'" disabled v-model="addName" text-align='right'></x-input>
        <div v-transfer-dom>
          <popup v-model="showAddress" position="right" width="70%">
            <div class="filter-wrap">
              <h2><img src="../../assets/back-icon.png" />地 点</h2>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedList.indexOf(index)>-1 }" v-for="(item, index) in addressData[0]" :key="index" @click="selectAddress(item,index)">{{item.name}}</div>
                </div>
              </div>
              <div class="btns">
                <div class="btn-reset" @click="selectedList=[]">重 置</div>
                <div class="btn-commit" @click="commitAddressFilter">提 交</div>
              </div>
            </div>
          </popup>
        </div>
      </div>
      <div @click="changeShowAddress" class="fake"></div>
    </group>
    <group gutter='0.2rem'>    
      <x-input :title="redDot + '联系电话'" v-model="phone" text-align='right'></x-input>  
      <div class="mycell">
        <p>详细介绍</p>
        <div class="summary">
          <textarea id="" cols="30" rows="10" v-model="description"
          placeholder="请再次描述你对设备的具体需求，如具体机型、预算、使用小时数、年限、设备来源等（100字以内）"></textarea>
        </div>
      </div>
    </group>
    <div class="submit" @click="submitResume">提交</div>
  </div>
</template>

<script>
import {
  TransferDom,
  Popup,
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
import provinceData from "@/data/prov_min.json"
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data() {
    return {
      selectedAddressIndex: -1,
      addressData: provinceData,
      selectedList: [],
      addVal: [],
      showAddress: false,
      macTypeVal: '',
      phone: "",
      description: "",
      redDot: "<span style='color:red;'>*</span>",
      editType: "/api/resume/add",
    };
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
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
    addName() {
      if (this.addVal && this.addVal.length > 0 && this.addVal[0]) {
        let result = ''
        for(let i=0;i<this.addVal.length;i++){
          result+=this.findName(this.addVal[i], provinceData)+' '
        }
        return result
      } else {
        return "";
      }
    },
  },
  methods: {
    info(){
      alert('')
    },
    findName(val, mylist) {
      console.log(val,mylist)
      var name = "";
      mylist[0].forEach((item, index) => {
        if (val == item.value) {
          name = item.name;
          return;
        }
      });
      return name;
    },
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
        "009": "请填写姓名",
        "010": "请填写详情",
      };
      return infoMap[key];
    },
    changeShowAddress() {
      this.showAddress = !this.showAddress;
    },
    selectAddress(item,index) {
      let _index = this.selectedList.indexOf(index)
      if(_index>-1){
        this.selectedList.splice(_index,1)
      }else{
        this.selectedList.push(index)
      }
    },
    commitAddressFilter(){
      this.addVal=[]
      for(let i=0;i<this.selectedList.length;i++){
        this.addVal.push(this.addressData[0][this.selectedList[i]]['value'])
      }
      this.changeShowAddress()
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
      if (this.description == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("010"),
          type: "text"
        });
        return false;
      }
      return true;
    },
    getFormInfo(){
      return this.qs.stringify({
        name: this.macTypeVal,
        address_list: this.addVal,
        mobile: this.phone,
        description: this.description,
      })
    },
    submitResume() {
      if (this.validatePubInfo()) {
        //前端校验通过
        this.axios.post('/api/used-m/add-want', this.getFormInfo()).then((res) => {
          //todo 后端返回错误需处理
          console.log(res)
          this.$vux.toast.show({
            type: "success",
            text: "提交成功"
          })
          setTimeout(() => {
            window.location.href = "../buydetail/index.html?id=" + res.data.data.id
          }, 1000)
        });
      } else {
        console.log('校验没通过')
        //前端校验不通过
      }
    },
    getHisInfo(){
      this.axios.post("/api/resume/my-detail")
      .then((res) => {
        console.log(res)
        if(res.data.data.car_type_id){
          this.editType = "/api/resume/update"
          this.setHisInfo(res.data.data)
        }
      })
    },
    getItemValue(keys, list){
      if(!keys){
        return []
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
      //todo 薪资form初始无值时有报错 这里的接口定义与前端不吻合导致
      this.phone = data.mobile
      this.description = data.description
      //todo 这里的接口返回的是数值不是id导致前端双层遍历查找
      //todo 这里如果key与value相同，会简化许多
      if(data.image){
        document.querySelector(".prev").src = data.image
      }
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
    //this.getHisInfo()
    if(getUrlKey("id") > 0){
      //编辑已发布的信息
      this.getHisInfo();
    }else{
      this.axios.get("/api/user/my")
      .then((res) => {
        //这里存在大量赋值操作，后续可以和后台数据字段做整理
        console.log(res.data.data)
        let data  = res.data.data
        this.phone = data.mobile
      })
    }
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
        //display: inline-block;
        // text-align: center;
        // width: 1.19rem;
        // background-color: @second-color;
        // color: white;
        // height: 0.6rem;
        // line-height: 0.6rem;
        // font-size: 0.225rem;
        // border-radius: 0.05rem;
        //background: url('./img/btn_bg.png') no-repeat center center;
        //background-size: cover;
        //width: 1.31rem;
        height: 0.45rem;
        vertical-align: middle;
        margin-left: 0.3rem;
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
      height: 1.6rem;
      resize: none;
      padding: 0;
      margin: 0;
      border: none;
      font-size: 0.32rem;
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
  .fake {
    width: 100%;
    height: 0.92rem;
    position: absolute;
    left: 0;
    top: 0.92rem;
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
.label{
  margin-bottom: 0.1rem;
}
.filter-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  >h2 {
    >img {
      width: 0.3rem;
      margin-right: 0.1rem;
    }
    display: flex;
    align-items: center;
    padding: 0.2rem;
    width: 100%;
    line-height: 0.9rem;
    border-bottom: 1px solid @divid-color;
    font-size: 1em;
    font-weight: 300;
    letter-spacing: 0.8em;
    vertical-align: middle;
  }
  .options {
    .list {
      font-size: 0;
      overflow: scroll;
      padding: 0.1rem;
      .item {
        display: inline-block;
        width: 1.3rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: #eee;
        font-size: 0.2rem;
        margin: 0.06rem;
        border-radius: 4px;
      }
      .selected {
        background-color: @second-color;
        color: #fff;
      }
    }
  }
  .btns {
    width: 100%;
    height: 0.76rem;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 0;
    >div {
      display: inline-block;
      width: 50%;
      line-height: 0.76rem;
      text-align: center;
      font-size: 0.32rem;
      font-weight: 300;
      color: #fff;
      // margin: 0 auto;
      // border-radius: 0.2rem;
    }
    .btn-reset {
      background-color: @theme-color;
    }
    .btn-commit {
      background-color: @second-color;
    }
  }
}
</style>
