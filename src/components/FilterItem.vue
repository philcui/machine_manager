<template>
  <div v-transfer-dom>
    <popup v-model="show" position="right" width="66.66%">
      <div class="wrap">
        <h2>{{title}}</h2>
        <div class="options">
          <div class="list">
            <div class="item" v-for="(item, index) in dataList" :key="index">{{item.name}}</div>
          </div>
        </div>
        <div class="btns">
          <div class="btn-reset">重 置</div>
          <div class="btn-commit">提 交</div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import {
  TransferDom,Popup
} from "vux";
import brandTypeData from "@/data/brand.json";
import addressData from "@/data/prov.json";
import priceData from "@/data/salary.json";

export default {
  props: ['show','title','type'],
  data(){
    return {
      dataList: []
    }
  },
  methods:{
    
  },
  directives: {
    TransferDom
  },
  components:{
    Popup,
  },
  mounted(){
    switch(this.type){
      case 'price':
        this.dataList = priceData
        break;
      case 'address':
        this.dataList = addressData
        break;
      case 'brandType':
        this.dataList = brandTypeData
        break;
    }
  }
};
</script>

<style lang='less' scoped>
	.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    >h2 {
      width: 100%;
      line-height: 0.9rem;
      border-bottom: 1px solid @divid-color;
      font-size: 1em;
      font-weight: 300;
      letter-spacing: 0.8em;
      vertical-align: middle;
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
