<template>
  <div class="findDriver">
    <div class="filter">
      <div @click="changeShowBrandType" class="filterItem brandType">
        {{brandName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <div v-transfer-dom>
          <popup v-model="showBrandType" position="right" width="70%">
            <div class="filter-wrap">
              <!-- <h2><img src="../../assets/back-icon.png" />品 牌</h2> -->
              <p>挖机</p>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedWajiIndex==i }" v-for="(item, i) in wajiData" :key="i" @click="selectBrandType(item,'挖机',i)">{{item}}</div>
                </div>
              </div>
              <p>铲车</p>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedChancheIndex==j }" v-for="(item, j) in chancheData" :key="j" @click="selectBrandType(item,'铲车',j)">{{item}}</div>
                </div>
              </div>
              <div class="btns">
                <div class="btn-reset" @click="resetBrandTypeFilter">重 置</div>
                <!-- <div class="btn-commit" @click="commitBrandTypeFilter">提 交</div> -->
              </div>
            </div>
          </popup>
        </div>
      </div>
      <div @click="changeShowPrice" class="filterItem price">
        {{priceName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <div v-transfer-dom>
          <popup v-model="showPrice" position="right" width="70%">
            <div class="filter-wrap">
              <h2><img src="../../assets/back-icon.png" />价 格</h2>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedPriceIndex==index }" v-for="(item, index) in priceData[0]" :key="index" @click="selectPrice(item,index)">{{item.name}}</div>
                </div>
              </div>
              <div class="btns">
                <div class="btn-reset" @click="resetPriceFilter">重 置</div>
                <!-- <div class="btn-commit" @click="commitPriceFilter">提 交</div> -->
              </div>
            </div>
          </popup>
        </div>
      </div>
      <div @click="changeShowAddress" class="filterItem address">
        {{addName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <div v-transfer-dom>
          <popup v-model="showAddress" position="right" width="70%">
            <div class="filter-wrap">
              <h2><img src="../../assets/back-icon.png" />地 点</h2>
              <div class="options">
                <div class="list">
                  <div class="item" :class="{ 'selected': selectedAddressIndex==index }" v-for="(item, index) in addressData[0]" :key="index" @click="selectAddress(item,index)">{{item.name}}</div>
                </div>
              </div>
              <div class="btns">
                <div class="btn-reset" @click="resetAddressFilter">重 置</div>
                <!-- <div class="btn-commit" @click="commitAddressFilter">提 交</div> -->
              </div>
            </div>
          </popup>
        </div>
      </div>
    </div>
    <div class="infoContent">
      <!-- <div class="topList">
        <top-item v-for="(item, index) in topList" :key="index" :topObj='item'></top-item>
      </div> -->
      <div class="normalList">
        <normal-item v-for="(item, index) in normalList" :key="index" :normalObj="item"></normal-item>
      </div>
      <div v-if="normalList.length > 0" @click="loadData" class="loadMore">点击查看更多</div>
      <div style="text-align:center;" v-else>
        暂时没有记录
      </div>
      <load-more v-show="isLoading" tip="努力加载中"></load-more>
    </div>
    <!-- <div class="hrbottom">
      <div @click="pubSale" class="btnpu">
        <div class="line_btn">
          <img src="./img/icon_pub.png" alt="">
          <a class="button">发布销售二手机</a>
        </div>
      </div>
    </div> -->
    <bottom-btns @on-pubclick="pubBuy" :uid="uId"></bottom-btns>
  </div>
</template>

<script>
import {
  TransferDom,
  Popup,
  XAddress,
  XDialog,
  //ChinaAddressV4Data,
  Value2nameFilter as value2name,
  LoadMore
} from "vux";
import BottomBtns from "../../components/BottomBtns.vue";
//import FilterItem from "../../components/FilterItem.vue";
import { PopupPicker } from "vux";
import brandTypeData from "@/data/brand.json";
import priceData from "@/data/price.json";
import TopItem from "./TopItem.vue";
import NormalItem from "./NormalItem.vue";
import provinceData from "@/data/prov_min.json";
//import {jobList, adsList} from "@/mock/index.js";
import { throttle } from 'vux'
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data() {
    return {
      isTouch: false,
      isReg: false,
      addVal: [],
      priceVal: [],
      selectedWajiIndex: -1,
      selectedChancheIndex: -1,
      selectedPriceIndex: -1,
      selectedAddressIndex: -1,
      addressData: provinceData,
      showAddress: false,
      showPrice: false,
      locate: { name: "定位中", id: "" },
      priceData: priceData,
      wajiData: ['小松','日立','斗山','卡特','神钢','三一','现代','沃尔沃','佳友','柳工','玉柴','雷沃','久保田','龙工','加藤','临工','其他'],
      chancheData: ['临工','龙工','柳工','山工','徐工','厦工','福田','成工','斗山','现代','沃得','晋工','山推','宇通','其他'],
      //brandTypeData: brandTypeData,
      brandType: '',
      brandName: '设备',
      showBrandType: false,
      topList: [],
      normalList: [],
      isLoading: false,
      nowPage: 0,
      uId: null
    };
  },
  methods: {
    changeShowAddress() {
      this.showAddress = !this.showAddress;
    },
    changeShowBrandType() {
      this.showBrandType = !this.showBrandType;
    },
    changeShowPrice() {
      this.showPrice = !this.showPrice;
    },
    selectBrandType(item,type,index) {
      console.log(index)
      if(type=='chanche'){
        this.selectedChancheIndex = index
      }else if(type=='waji'){
        this.selectedWajiIndex = index
      }
      this.brandType = type
      this.brandName = item
      this.commitBrandTypeFilter()
    },
    selectPrice(item,index) {
      this.selectedPriceIndex = index
      this.commitPriceFilter()
    },
    selectAddress(item,index) {
      this.selectedAddressIndex = index
      this.commitAddressFilter()
    },
    commitBrandTypeFilter(){
      this.changeShowBrandType()
      this.filterChange()
    },
    commitPriceFilter(){
      this.priceVal = this.selectedPriceIndex==-1?0:[this.priceData[0][this.selectedPriceIndex]['value']]
      this.changeShowPrice()
      this.filterChange()
    },
    commitAddressFilter(){
      this.addVal = this.selectedAddressIndex==-1?0:[this.addressData[0][this.selectedAddressIndex]['value']]
      this.changeShowAddress()
      this.filterChange()
    },
    resetBrandTypeFilter(){
      this.selectedChancheIndex = -1
      this.selectedWajiIndex = -1
      this.brandName = '设备'
      this.commitBrandTypeFilter()
    },
    resetPriceFilter(){
      this.selectedPriceIndex = -1
      this.commitPriceFilter()
    },
    resetAddressFilter(){
      this.selectedAddressIndex = -1
      this.commitAddressFilter()
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
      this.axios.post("/api/used-m/sell-list", this.getFilter()).then(res => {
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
          brand: this.brandName,
          type: this.brandType,
          //mid: 
          min_price:
            this.priceVal.length && parseInt(this.priceVal[0].split(",")[0]),
          max_price:
            this.priceVal.length && parseInt(this.priceVal[0].split(",")[1])
        },
        opt
      );
      if(this.addVal[0] === "0"){
        delete filter.address_id
      }
      if(this.brandName === "设备"){
        delete filter.brand
      }
      return this.qs.stringify(filter);
    },
    reloadData() {
      // 条件变化，发生重新加载，重置当前数据及页码
      this.normalList = [];
      this.nowPage = 0;
      //this.loadData();
      this.isLoading = true;
      this.axios.post("/api/used-m/sell-list", this.getFilter()).then(res => {
        this.isLoading = false;
        this.nowPage++;
        this.normalList = res.data.data
        console.log(res);
      });
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
          console.log(res);
        });
    },
    getRegInfo(){
      this.axios.get("/api/user/my")
      .then((res) => {
        if(res.data.data.status & 2){
          //已注册
          this.isReg = true
          this.uId = res.data.data.id
        }else{
          //未注册
          this.isReg = false
        }
      })
    },
    pubBuy(){
      if(this.isReg){
        window.location.href = "../pubbuy/index.html"
      }else{
        // this.$vux.toast.show({
        //   type: 'text',
        //   text: '注册用户可发布，请注册'
        // })
        window.location.href = '/'
      }
    },
    // setFilterFromCache(){
    //   let addVal = sessionStorage.getItem("addVal")
    //   if(addVal){
    //     this.addVal = [addVal]
    //   }
    // },
    filterChange(){
      this.reloadData()
      //this.loadAds()
      //sessionStorage.setItem("addVal", this.addVal)
    },
  },
  directives: {
    TransferDom
  },
  components: {
    Popup,
    BottomBtns,
    XAddress,
    PopupPicker,
    TopItem,
    NormalItem,
    XDialog,
    LoadMore
  },
  computed: {
    priceName() {
      if (this.priceVal && this.priceVal.length > 0 && this.priceVal[0]) {
        return this.findName(this.priceVal[0], priceData);
      } else {
        return "价格";
      }
    },
    addName() {
      if (this.addVal && this.addVal.length > 0 && this.addVal[0]) {
        return this.findName(this.addVal[0], provinceData);
      } else {
        return "地区";
      }
    },
  },
  mounted() {
    //this.setFilterFromCache()
    this.getRegInfo()
    this.reloadData()
    //this.loadAds()
  },
};
</script>

<style lang='less' scoped>
.findDriver {
  height: 100%;
}
.filter {
  display: flex;
  width: 100%;
  height: 0.75rem;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #c9c9c9;
  .filterItem {
    text-align: center;
    line-height: 0.75rem;
    height: 0.75rem;
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
    flex: 1;
    letter-spacing: 0.06rem;
  }
  .price {
    flex: 1;
    border-left: 1px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
  }
  .brandType {
    flex: 1;
    letter-spacing: 0.06rem;
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
  padding-top: 0.75rem;
  padding-bottom: 1rem;
  background-color: #eeeeee;
  z-index: 2;
  box-sizing: border-box;
  .topList {
    border: 0.04rem solid @theme-color;
    margin-top: 0.08rem;
  }
  .normalList {
    padding: 0.1rem;
    overflow: hidden;
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
    padding: 0.15rem;
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
.line_btn{
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    border-radius: 0.05rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.filter-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  padding-top: 0.1rem;
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
  >p {
    width: 92%;
    line-height: 0.54rem;
    border-radius: 4px;
    border: 0.5px solid @theme-color;
    color: @theme-color;
    text-align: center;
    letter-spacing: 0.1rem;
    margin: 0.1rem auto;
    overflow: hidden;
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
    bottom: 0.2rem;
    left: 0;
    font-size: 0;
    >div {
      display: block;
      width: 80%;
      line-height: 0.76rem;
      text-align: center;
      font-size: 0.32rem;
      font-weight: 300;
      color: #fff;
      margin: 0 auto;
      border-radius: 0.2rem;
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
