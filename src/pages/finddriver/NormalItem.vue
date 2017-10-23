<template>
  <a class="info" href="../workdetail/index.html">
    <div class="item salary">
      <img src="./img/money_strong.png" alt="">
      <span class="moneyTitle">预计收入：{{normalObj.salary}}元/月</span>
      <tag :tagName='normalObj.tagName'></tag>
    </div>
    <div class="item address">
      <img src="./img/car.png" alt="">
      <span class="label">地点：</span>
      <span class="text">{{normalObj.address}}</span>
    </div>
    <div class="item distance">
      <img src="./img/address.png" alt="">
      <span class="label">距离：</span>
      <span class="text">距离你{{normalObj.distance}}公里</span>
    </div>
    <div class="item date">
      <img src="./img/time.png" alt="">
      <span class="label">时间：</span>
      <span class="text">{{normalObj.time}}</span>
    </div>
    <a class="offer">应聘</a>
  </a>  
</template>

<script>
import Tag from '@/components/Tag.vue'
export default {
  props:{
    normalObj: Object
  },
  components:{
    Tag
  }
}
</script>

<style lang='less' scoped>
  .info{
    display: block;
    padding: 0.12rem 0.2rem;
    background-color: white;
    margin-top: 0.08rem;
    font-size: 0.24rem;
    position: relative;
    .label{
      color: #000000;
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
      padding-top: 0.05rem;
      padding-bottom: 0.05rem;
    }
    .salary{
      border-bottom: 1px solid #e4e4e4;
      .moneyTitle{
        color: #ff0000;
      }
    }
    .offer{
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      background-color: @theme-color;
      color: white;
      border-radius: 50%;
      position: absolute;
      top: 0.94rem;
      right: 0.44rem;
      text-align: center;
      line-height: 0.7rem;
    }
  }
</style>
