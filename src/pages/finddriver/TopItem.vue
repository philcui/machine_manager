<template>
  <div class="topItem">
    <div class="line1">
      <img class="up" src="./img/up.png" alt="">
      <img class="money" src="./img/money.png" alt="">
      <span class="number">月薪：{{topObj.salary}}元/月</span>
      <tag v-for="(item, index) in topObj.tagList" :key="index" :tagName='item.name'></tag>
    </div>
    <div class="line2">
      <img class="address" src="./img/car_top.png" alt="">
      <span>地点：{{topObj.address}}</span>
    </div>
    <img class="jipin" src="./img/jipin.png" alt="">
  </div>  
</template>

<script>
import Tag from '@/components/Tag.vue'
export default {
  props:{
    topObj: Object
  },
  components:{
    Tag
  }
}
</script>

<style lang='less' scoped>
  .topItem{
    margin-top: 0.08rem;
    background-color: white;
    position: relative;
    padding-left: 0.33rem;
    font-size: 0.24rem;
    img{
      vertical-align: middle;
    }
    .line1{
      height: 0.53rem;
      line-height: 0.53rem;
      border-bottom: 1px solid #e4e4e4;
      .up{
        width: 0.33rem;
        margin-left: -0.14rem;
      }
      .money{
        width: 0.30rem;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
      }
      .number{
        margin-right: 0.2rem;
      }
    }
    .line2{
      height: 0.62rem;
      line-height: 0.62rem;
      .address{
        width: 0.30rem;
        margin-right: 0.18rem;
      }
    }
    .jipin{
      position: absolute;
      display: block;
      right: 0.2rem;
      top: 0;
      width: 0.48rem;
    } 
  }
</style>
