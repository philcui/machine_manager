<template>
  <div>
    <div class="filter">
      <div @click="changeShowAddress" class="filterItem address">
        {{addName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <x-address 
          style="display:none;" 
          title="title" v-model="addVal" 
          :list="addressData" placeholder="请选择地址" 
          :show.sync="showAddress">
        </x-address>
      </div>
      <div @click="changeShowMacType" class="filterItem machineType">
        {{macTypeName}}
        <img class="arrow" src="./img/arrowDown.png" alt="">
        <popup-picker 
          style="display:none;"
          title="title" 
          :data="macTypeData" 
          v-model="macTypeVal" 
          :columns="3" 
          :show.sync="showMacType">
        </popup-picker>
      </div>
      <div class="filterItem locate">
        <img src="./img/locate.png" alt="">
        {{locate}}
      </div>
    </div>
    <div class="infoContent">
      <div class="topList">
        <top-item v-for="(item, index) in topList" :key="index" :topObj='item'></top-item>
      </div>
      <div class="normalList">
        <normal-item v-for="(item, index) in normalList" :key="index" :normalObj="item"></normal-item>
      </div>  
    </div>
    <div class="hrbottom">
      <a href="../pubinfo/index.html" class="left button">发布机主招聘</a>
      <a href="../pubresume/index.html" class="button">发布机手求职</a>
    </div>
    <img src="./img/publish.png" class="publish"></div>
  </div>  
</template>

<script>
import {
  XAddress,
  ChinaAddressV4Data,
  Value2nameFilter as value2name
} from "vux";
import { PopupPicker } from "vux";
import macTypeData from "@/components/macType.js";
import TopItem from "./TopItem.vue";
import NormalItem from "./NormalItem.vue";
export default {
  data() {
    return {
      addVal: [],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      locate: "杭州",
      macTypeData: macTypeData,
      macTypeVal: [],
      showMacType: false,
      topList: [
        {
          salary: 7500,
          address: "湖北省武汉市",
          tagList: [{ name: "大挖" }, { name: "正手" }]
        },
        {
          salary: 7500,
          address: "湖南省临澧市",
          tagList: [{ name: "旋转挖" }, { name: "正手" }, { name: "包吃包住" }]
        }
      ],
      normalList: [
        {
          salary: 12000,
          address: "浙江省衢州市",
          tagName: "大挖",
          distance: 200,
          time: "2017-10-13 8:34"
        },
        {
          salary: 12000,
          address: "浙江省衢州市",
          tagName: "大挖",
          distance: 200,
          time: "2017-10-13 8:34"
        },
        {
          salary: 12000,
          address: "浙江省衢州市",
          tagName: "大挖",
          distance: 200,
          time: "2017-10-13 8:34"
        },
        {
          salary: 12000,
          address: "浙江省衢州市",
          tagName: "大挖",
          distance: 200,
          time: "2017-10-13 8:34"
        },
        {
          salary: 12000,
          address: "浙江省衢州市",
          tagName: "大挖",
          distance: 200,
          time: "2017-10-13 8:34"
        }
      ]
    };
  },
  methods: {
    changeShowAddress() {
      this.showAddress = !this.showAddress;
    },
    changeShowMacType() {
      this.showMacType = !this.showMacType;
    }
  },
  components: {
    XAddress,
    PopupPicker,
    TopItem,
    NormalItem
  },
  computed: {
    addName() {
      if (this.addVal && this.addVal.length > 0) {
        return value2name(this.addVal, this.addressData);
      } else {
        return "工作地点";
      }
    },
    macTypeName() {
      if (this.macTypeVal && this.macTypeVal.length > 0) {
        return value2name(this.macTypeVal, this.macTypeData);
      } else {
        return "设备种类";
      }
    }
  }
};
</script>

<style lang='less' scoped>
.filter {
  display: flex;
  width: 100%;
  height: 0.57rem;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 10;
  .filterItem {
    text-align: center;
    line-height: 0.57rem;
    height: 0.57rem;
    img{
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
    border-left: 1px solid #ccc;
  }
  .locate {
    width: 1.2rem;
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
}

.hrbottom {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
  .left{
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
.publish{
  display: block;
  position: fixed;
  right: -0.15rem;
  bottom: 1.12rem;
  height: 0.88rem;
  z-index: 10;
}
</style>
