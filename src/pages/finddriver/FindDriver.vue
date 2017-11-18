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
        {{addName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <popup-picker 
          style="display:none;"
          title="title" 
          :data="addressData" 
          v-model="addVal" 
          :show.sync="showAddress">
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
          :show.sync="showMacType">
        </popup-picker>
      </div>
      <div class="filterItem locate">
        <img src="./img/locate.png" alt="">
        {{locate.name}}
      </div>
    </div>
    <div class="infoContent" @scroll="scrollList">
      <div class="topList">
        <top-item v-for="(item, index) in topList" :key="index" :topObj='item'></top-item>
      </div>
      <div class="normalList">
        <normal-item v-for="(item, index) in normalList" :key="index" :normalObj="item"></normal-item>
      </div>
      <load-more v-show="isLoading" tip="努力加载中"></load-more>
    </div>
    <div class="hrbottom">
      <a href="../pubinfo/index.html" class="left button">发布机主招聘</a>
      <a href="../pubresume/index.html" class="button">发布机手求职</a>
    </div>
    <img src="./img/publish.png" class="publish" @click="showDialog=true">
    
    <x-dialog v-model="showDialog" class="dialog-trans" :dialog-style="{'background-color': 'transparent'}">
      <div class="dia-content">
        <div class="dia_content_line" style="border-bottom: 1px solid #707070;">
          <img src="./img/icon_find.png" alt="">
          <a href="../pubinfo/index.html" class="dia-button">我是机主：发布招聘</a>
        </div>
        <div class="dia_content_line">
          <img src="./img/icon_admin.png" alt="">
          <a href="../pubresume/index.html" class="dia-button">我是机手：发布求职</a>
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
export default {
  data() {
    return {
      addVal: [],
      addressData: provinceData,
      showAddress: false,
      locate: { name: "定位中", id: "" },
      macTypeData: macTypeData,
      macTypeVal: [],
      showMacType: false,
      topList: [],
      normalList: [],
      showDialog: false,
      isLoading: false,
      nowPage: 0
    };
  },
  methods: {
    changeShowAddress() {
      this.showAddress = !this.showAddress;
    },
    changeShowMacType() {
      this.showMacType = !this.showMacType;
    },
    scrollList(e) {
      if (this.isBottom(e.target)) {
        this.loadData();
      }
    },
    isBottom(target) {
      return target.scrollHeight === target.scrollTop + target.clientHeight;
    },
    loadData() {
      // 加载，加载更多
      this.isLoading = true;
      this.axios.post("/api/job/list", this.getFilter()).then(res => {
        this.isLoading = false;
        this.nowPage++;
        this.normalList = this.normalList.concat(res.data.data);
        console.log(res);
      });
    },
    getFilter(opt) {
      // 动态条件生成
      return this.qs.stringify(
        Object.assign(
          {
            page: this.nowPage,
            address_id: this.addVal[0] || this.locate.id,
            car_type_id: this.macTypeVal[0]
          },
          opt
        )
      );
    },
    reloadData() {
      // 条件变化，发生重新加载，重置当前数据及页码
      this.normalList = [];
      this.nowPage = 0;
      this.loadData();
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
        .post("/api/job/list", this.getFilter({ limit: 2 }))
        .then(res => {
          this.topList = res.data.data;
        });
    }
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
      if (this.addVal && this.addVal.length > 0) {
        return this.findName(this.addVal[0], provinceData);
      } else {
        return "工作地点";
      }
    },
    macTypeName() {
      if (this.macTypeVal && this.macTypeVal.length > 0) {
        //return value2name(this.macTypeVal, this.macTypeData);
        return this.findName(this.macTypeVal[0], macTypeData);
      } else {
        return "设备种类";
      }
    }
  },
  mounted() {
    this.guessAddress().then(
      val => {
        this.loadData();
        this.loadAds();
      },
      err => {
        this.loadData();
        this.loadAds();
      }
    );
  },
  watch: {
    addVal() {
      this.reloadData();
      this.loadAds();
    },
    macTypeVal() {
      this.reloadData();
      this.loadAds();
    }
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
  }
  .machineType {
    flex: 1;
    border-left: 1px solid #c9c9c9;
  }
  .locate {
    width: 1.5rem;
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
  padding-bottom: 0.78rem;
  background-color: #eeeeee;
  z-index: 2;
  box-sizing: border-box;
  .topList {
    border: 0.04rem solid @theme-color;
    margin-top: 0.08rem;
  }
  .normalList {
  }
}

.hrbottom {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  .left {
    border-right: 1px solid white;
  }
  .button {
    display: block;
    height: 0.78rem;
    line-height: 0.78rem;
    flex: 1;
    background-color: @theme-color;
    color: white;
    text-align: center;
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
