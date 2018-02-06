<template>
  <a class="info" :href="gethref()">
    <div class="item salary">
      <!-- <img src="./img/money_strong.png" alt=""> -->
      <span class="moneyTitle">
        <span class="label">求购：</span>
        <span class="text">{{normalObj.name}}</span>
      </span>
    </div>
    <div class="item address">
      <!-- <img src="./img/car.png" alt=""> -->
      <span class="label">地点：</span>
      <tag :tagName='item' v-for="(item,index) in specialList" :key="index"></tag>
      <!-- <tag v-if="normalObj.car_type_alias" :tagName='normalObj.car_type_alias'></tag>
      <tag :tag-style="{'background': '#ca9d63', 'color': '#fff'}" v-for="(item, index) in specialList" :key="index" :tagName='item'></tag>  -->
    </div>
    <div class="item date">
      <!-- <img src="./img/time.png" alt=""> -->
      <span class="label">时间：</span>
      <span class="text">{{normalObj.utime}}</span>
    </div>
    <a class="offer">详情</a>
  </a>
</template>

<script>
import Tag from '@/components/Tag.vue'
import getName from "@/utils/getName.js"
import provinceData from "@/data/prov.json"

export default {
  data(){
    return {
      specialList : [],
    }
  },
  props:{
    normalObj: Object
  },
  components:{
    Tag
  },
  methods: {
    gethref(){
      return "../buydetail/index.html?id=" + this.normalObj.id
    },
    findName(val, mylist) {
      var name = '';
      mylist[0].forEach((item, index) => {
        if (val == item.value) {
          name = item.name
          return
        }
      });
      return name;
    },
    getSpecialTag(){
      let list = this.normalObj.addresses
      if(list == "" || list == null){
        this.specialList = []
      }else{
        var _list = list.split(" ")
        for(let i=0;i<_list.length;i++){
          this.specialList.push(this.findName(_list[i],provinceData))
        }
      }
    },
  },
  mounted(){
    this.getSpecialTag()
  }
}
</script>

<style lang='less' scoped>
  .info{
    display: block;
    padding: 0.12rem 0.24rem;
    background-color: white;
    margin-top: 0.08rem;
    font-size: 0.24rem;
    position: relative;
    .label{
      color: #a0a0a0;
    }
    .text{
      color: #656565;
    }
    img{
      width: 0.3rem;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    .item{
      line-height: 0.58rem;
    }
    .salary{
      border-bottom: 1px solid #e4e4e4;
      .moneyTitle{
        color: @theme-color;
        .text{
          font-weight: bold;
        }
      }
    }
    .address{
      padding-right: 1.08rem;
      overflow: hidden;
      height: 0.58rem;
    }
    .offer{
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      color: @theme-color;
      border-radius: 50%;
      position: absolute;
      bottom: 0.35rem;
      right: 0.44rem;
      text-align: center;
      line-height: 0.7rem;
      border: 1px solid @theme-color;
    }
  }
</style>
