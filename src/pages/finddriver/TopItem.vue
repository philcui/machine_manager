<template>
  <a class="topItem" :href="gethref()">
    <div class="line1">
      <!-- <img class="money" src="./img/money.png" alt=""> -->
      <span class="number">
        <span class="label">工资：</span>
        <span class="text">{{topObj.salary}}元/月</span> 
      </span>
      <tag v-for="(item, index) in getTags()" :key="index" :tagName='item'></tag>
    </div>
    <div class="line2">
      <span>
        <span class="label">地点：</span>
        <span class="text">{{topObj.address}}</span>
      </span>
    </div>
    <img class="jipin" src="./img/jipin.png" alt="">
  </a>
</template>

<script>
import Tag from '@/components/Tag.vue'
import car_type from "@/data/car_type.json"
import mode_type from "@/data/mode_type.json"
import location from "@/data/location.json"
import benefit from "@/data/benefit.json"
import getName from "@/utils/getName.js"
export default {
  props:{
    topObj: Object
  },
  components:{
    Tag
  },
  methods: {
    getTags(){
      let tags = []
      if(this.topObj.car_type_id){
        tags.push(getName(car_type[0], this.topObj.car_type_id))
      }
      // if(this.topObj.mode){
      //   tags.push(getName(mode_type[0], this.topObj.mode))
      // }
      // if(this.topObj.benefit){
      //   tags.push(getName(benefit[0], this.topObj.benefit))
      // }
      return tags
    },
    gethref(){
      return "../workdetail/index.html?id=" + this.topObj.id
    },
  },
}
</script>

<style lang='less' scoped>
  .topItem{
    display: block;
    background-color: #fffcf8;
    position: relative;
    padding-left: 0.24rem;
    font-size: 0.24rem;
    border-top: 1px solid #bfbfbf;
    img{
      vertical-align: middle;
    }
    .line1{
      height: 0.53rem;
      line-height: 0.53rem;
      border-bottom: 1px solid #e4e4e4;
      overflow: hidden;
      .money{
        width: 0.30rem;
        margin-right: 0.1rem;
      }
      .number{
        margin-right: 0.2rem;
        color: @theme-color;
        .text{
          font-weight: bold;
        }
      }
    }
    .line2{
      height: 0.62rem;
      line-height: 0.62rem;
      overflow: hidden;
      .text{
        color: @second-color;
      }
    }
    .jipin{
      position: absolute;
      display: block;
      right: 0.2rem;
      top: 0;
      width: 0.48rem;
    }
    .label{
      color: #a0a0a0;
    }
  }
</style>
