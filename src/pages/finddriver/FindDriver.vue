<template>
  <div class="findDriver">
    <div class="filter">
      <!-- <div @click="changeShowAddress" class="filterItem address">
        {{addName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <x-address
          style="display:none;"
          title="title" v-model="addVal"
          :list="addressData" placeholder="请选择地址"
          :show.sync="showAddress">
        </x-address>
      </div> -->
       <div @click="changeShowAddress" class="filterItem address">
        <img class="icon_add" src="./img/location.png" alt="">
        {{addName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <popup-picker
          style="display:none;"
          title="title"
          :data="addressData"
          v-model="addVal"
          :show.sync="showAddress" @on-change="filterChange">
        </popup-picker>
      </div>
      <div @click="changeShowMacType" class="filterItem machineType">
        {{macTypeName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <popup-picker
          style="display:none;"
          title="title"
          :data="macTypeData"
          v-model="macTypeVal"
          :show.sync="showMacType" @on-change="filterChange">
        </popup-picker>
      </div>
      <div @click="changeShowSal" class="filterItem sal">
        {{salName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <popup-picker
          style="display:none;"
          title="title"
          :data="salData"
          v-model="salVal"
          :show.sync="showSal" @on-change="filterChange">
        </popup-picker>
      </div>
      <!-- <div class="filterItem locate">
        <img src="./img/locate.png" alt="">
        {{locate.name}}
      </div> -->
    </div>
    <div class="infoContent">
      <div class="topList">
        <top-item v-for="(item, index) in topList" :key="index" :topObj='item'></top-item>
      </div>
      <div class="normalList">
        <normal-item v-for="(item, index) in normalList" :key="index" :normalObj="item"></normal-item>
      </div>
      <div v-if="normalList.length > 0" @click="loadData" class="loadMore">点击查看更多</div>
      <!-- <div class="noresult" v-show="topList.length == 0 && normalList.length == 0">
        <div>
          <img src="./img/noresult.png" alt="">
          <p>没搜到，换个条件试试？</p>
        </div>
      </div> -->
      <load-more v-show="isLoading" tip="努力加载中"></load-more>
    </div>
    <div class="hrbottom">
      <div class="btnpu left" v-show="showBtn.showLeft">
        <img src="./img/icon_owner.png" alt="">
        <a @click="pubInfo" class="button">我是机主：发布招聘</a>
      </div>
      <div class="btnpu" v-show="showBtn.showRight">
        <img src="./img/icon_driver.png" alt="">
        <a @click="pubResume" class="button">我是机手：发布求职</a>
      </div>
    </div>
    <!-- <img src="./img/publish.png" class="publish" @click="showDialog=true"> -->

    <x-dialog v-model="showDialog" class="dialog-trans" :dialog-style="{'background-color': 'transparent', 'max-width': '100%'}">
      <div class="dia-content">
        <div class="dia_content_line" style="border-bottom: 1px solid #707070;">
          <img src="./img/icon_find.png" alt="">
          <a @click="pubInfo" class="dia-button">我是机主：发布招聘</a>
        </div>
        <div class="dia_content_line">
          <img src="./img/icon_admin.png" alt="">
          <a @click="pubResume" class="dia-button">我是机手：发布求职</a>
        </div>
      </div>
      <div @click="showDialog=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>
  </div>
</template>

<script>
import {
  XAddress,
  XDialog,
  //ChinaAddressV4Data,
  Value2nameFilter as value2name,
  LoadMore
} from "vux";
import { PopupPicker } from "vux";
//import macTypeData from "@/components/macType.js";
import macTypeData from "@/data/car_type.json";
import TopItem from "./TopItem.vue";
import NormalItem from "./NormalItem.vue";
import provinceData from "@/data/prov.json";
//import {jobList, adsList} from "@/mock/index.js";
import { throttle } from 'vux'
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data() {
    return {
      isTouch: false,
      isReg: true,
      addVal: [],
      salVal: [],
      addressData: provinceData,
      showAddress: false,
      showSal: false,
      locate: { name: "定位中", id: "" },
      macTypeData: macTypeData,
      macTypeVal: [],
      showMacType: false,
      topList: [],
      normalList: [],
      showDialog: false,
      isLoading: false,
      nowPage: 0,
      salData: [
        [
          {
            value: "0,0",
            name: "不限"
          },
          {
            value: "0,6000",
            name: "6000以下"
          },
          {
            value: "6000,8000",
            name: "6000-8000"
          },
          {
            value: "8000,9000",
            name: "8000-9000"
          },
          {
            value: "9000,12000",
            name: "9000-12000"
          },
          {
            value: "12000,0",
            name: "12000以上"
          }
        ]
      ],
      showBtn: {
        showLeft: true,
        showRight: false,
      }
    };
  },
  methods: {
    changeShowAddress() {
      this.showAddress = !this.showAddress;
    },
    changeShowMacType() {
      this.showMacType = !this.showMacType;
    },
    changeShowSal() {
      this.showSal = !this.showSal;
    },
    scrollList1(e){
      if (this.isTouch && this.isBottom(e.target)) {
        this.loadData();
      }
    },
    scrollList2: throttle(function(e){
      if (this.isTouch && this.isBottom(document.querySelector(".infoContent"))) {
        this.loadData();
      }
    }, 250),
    isBottom(target) {
      let tmp = target.scrollHeight - (target.scrollTop + target.clientHeight) 
      return tmp < 10;
    },
    loadData() {
      // 加载，加载更多
      this.isLoading = true;
      this.axios.post("/api/job/list", this.getFilter()).then(res => {
        this.isLoading = false;
        this.nowPage++;
        this.normalList = this.normalList.concat(res.data.data);
        console.log(res);
        if(res.data.data.length == 0){
          this.$vux.toast.show({
            type: 'text',
            text: '没有了'
          })
        }
      });
    },
    getFilter(opt) {
      // 动态条件生成
      let filter = Object.assign(
        {
          page: this.nowPage,
          address_id: this.addVal[0], //|| this.locate.id,
          car_type_id: this.macTypeVal[0],
          base_salary:
            this.salVal.length && parseInt(this.salVal[0].split(",")[0]),
          max_salary:
            this.salVal.length && parseInt(this.salVal[0].split(",")[1])
        },
        opt
      );
      if(this.addVal[0] === "0"){
        delete filter.address_id
      }
      if(this.macTypeVal[0] === "0"){
        delete filter.car_type_id
      }
      return this.qs.stringify(filter);
    },
    reloadData() {
      // 条件变化，发生重新加载，重置当前数据及页码
      this.normalList = [];
      this.nowPage = 0;
      //this.loadData();
      this.isLoading = true;
      this.axios.post("/api/job/list", this.getFilter()).then(res => {
        this.isLoading = false;
        this.nowPage++;
        this.normalList = res.data.data
        console.log(res);
      });
    },
    findName(val, mylist) {
      var name = "";
      mylist[0].forEach((item, index) => {
        if (val == item.value) {
          name = item.name;
          return;
        }
      });
      return name;
    },
    guessAddress() {
      // 获取用户地址
      return this.axios.post("/api/default/guess-address").then(res => {
        this.locate = res.data.data;
        console.log(res);
      });
    },
    loadAds() {
      this.axios
        .post("/api/job/ads-list", this.getFilter({ limit: 5 }))
        .then(res => {
          this.topList = res.data.data;
        });
    },
    getRegInfo(){
      this.axios.get("/api/user/my")
      .then((res) => {
        if(res.data.data.status & 2){
          //已注册
          this.isReg = true
        }else{
          //未注册
          this.isReg = false
        }
      })
    },
    pubInfo(){
      if(this.isReg){
        window.location.href = "../pubinfo/index.html"
      }else{
        this.$vux.toast.show({
          type: 'text',
          text: '注册用户可发布，请注册'
        })
      }
    },
    pubResume(){
      if(this.isReg){
        window.location.href = "../pubresume/index.html"
      }else{
        this.$vux.toast.show({
          type: 'text',
          text: '注册用户可发布，请注册'
        })
      }
    },
    setFilterFromCache(){
      let addVal = sessionStorage.getItem("addVal")
      if(addVal){
        this.addVal = [addVal]
      }
      // let macTypeVal = sessionStorage.getItem("macTypeVal")
      // if(macTypeVal){
      //   this.macTypeVal = [macTypeVal]
      // }
      // let salVal = sessionStorage.getItem("salVal")
      // if(salVal){
      //   this.salVal = [salVal]
      // }
    },
    filterChange(){
      this.reloadData()
      this.loadAds()
      sessionStorage.setItem("addVal", this.addVal)
    },
    setBtn(){
      let flag = getUrlKey("indent")
      if(flag == 1){
        this.showBtn = {
          showLeft: true,
          showRight: false
        }
      }else{
        this.showBtn = {
          showLeft: false,
          showRight: true
        }
      }
    },
  },
  components: {
    XAddress,
    PopupPicker,
    TopItem,
    NormalItem,
    XDialog,
    LoadMore
  },
  computed: {
    // addName() {
    //   if (this.addVal && this.addVal.length > 0) {
    //     return value2name(this.addVal, this.addressData);
    //   } else {
    //     return "工作地点";
    //   }
    // },
    addName() {
      if (this.addVal && this.addVal.length > 0 && this.addVal[0]) {
        return this.findName(this.addVal[0], provinceData);
      } else {
        return "工作地点";
      }
    },
    macTypeName() {
      if (this.macTypeVal && this.macTypeVal.length > 0 && this.macTypeVal[0]) {
        //return value2name(this.macTypeVal, this.macTypeData);
        return this.findName(this.macTypeVal[0], macTypeData);
      } else {
        return "设备";
      }
    },
    salName() {
      if (this.salVal && this.salVal.length > 0 && this.salVal[0]) {
        return this.findName(this.salVal[0], this.salData);
      } else {
        return "工资";
      }
    },
  },
  mounted() {
    //this.getRegInfo()
    // this.guessAddress().then(
    //   val => {
    //     this.loadData();
    //     this.loadAds();
    //   },
    //   err => {
    //     this.loadData();
    //     this.loadAds();
    //   }
    // );
    this.setFilterFromCache()
    this.reloadData()
    this.loadAds()
    this.setBtn()
  },
  watch: {
    // addVal() {
    //   this.reloadData();
    //   this.loadAds();
    //   sessionStorage.setItem("addVal", this.addVal)
    // },
    // macTypeVal() {
    //   this.reloadData();
    //   this.loadAds();
    // },
    // salVal() {
    //   this.reloadData();
    //   this.loadAds();
    // }
  }
};
</script>

<style lang='less' scoped>
.findDriver {
  height: 100%;
}
.filter {
  display: flex;
  width: 100%;
  height: 0.57rem;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #c9c9c9;
  .filterItem {
    text-align: center;
    line-height: 0.57rem;
    height: 0.57rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    .icon_add{
      height: 0.32rem;
      margin-right: 0.12rem;
    }
    img {
      vertical-align: middle;
    }
    .arrow {
      margin-left: 0.12rem;
      width: 0.14rem;
    }
  }
  .address {
    flex: 2;
    letter-spacing: 0.1rem;
  }
  .machineType {
    flex: 1;
    border-left: 1px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
  }
  .sal{
    flex: 1;
  }
  .locate {
    width: 1.5rem;
    color: #7d7d7d;
    font-size: 0.21rem;
    img {
      width: 0.2rem;
      margin-right: 10px;
    }
  }
}

.infoContent {
  height: 100%;
  overflow: auto;
  padding-top: 0.57rem;
  padding-bottom: 1rem;
  background-color: #eeeeee;
  z-index: 2;
  box-sizing: border-box;
  .topList {
    border: 0.04rem solid @theme-color;
    margin-top: 0.08rem;
  }
  .normalList {
  }
  .noresult{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
  }
  .loadMore{
    text-align: center;
    height: 0.9rem;
    line-height: 0.9rem;
    color: @theme-color;
  }
}

.hrbottom {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  .btnpu {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    background-color: @theme-color;
    img {
      height: 0.34rem;
      padding-right: 0.14rem;
    }
  }
  .left {
    border-right: 1px solid white;
  }
  .button {
    display: block;
    text-align: center;
    color: white;
  }
}
.publish {
  display: block;
  position: fixed;
  right: -0.15rem;
  bottom: 1.12rem;
  height: 0.88rem;
  z-index: 10;
}
.dialog-trans {
  .dia-content {
    background-color: white;
    padding: 0.2rem;
    box-sizing: border-box;
    .dia_content_line {
      padding-top: 0.28rem;
      padding-bottom: 0.28rem;
      .dia-button {
        background-color: @theme-color;
        border-radius: 0.05rem;
        width: 3.4rem;
        text-align: center;
        display: inline-block;
        height: 0.78rem;
        line-height: 0.78rem;
        color: white;
        font-size: 0.32rem;
      }
      img {
        vertical-align: middle;
        margin-right: 0.2rem;
        width: 0.57rem;
      }
    }
  }
  .close {
    margin-top: 0.88rem;
    width: 0.6rem;
  }
}
</style>
