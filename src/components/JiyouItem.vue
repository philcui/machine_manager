<template>
  <a :href="itemData.url" class="jiyouItem">
    <div class="leftContent">
      <img :src="itemData.image" alt="" class="leftImg">
    </div>
    <div class="rightContent">
      <div class="tag tun-muti">{{itemData.tag}}</div>
      <div class="title tun-muti">{{itemData.title}}</div>
      <div class="text tun-muti">{{itemData.content}}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    itemData: Object
  }
}
</script>

<style lang='less' scoped>
.jiyouItem {
  display: flex;
  box-sizing: border-box;
  height: 2.18rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #949494;
  color: #141414;
  .leftContent {
    width: 1.66rem;
    text-align: center;
    .leftImg {
      width: 1.38rem;
      height: 1.38rem;
      border-radius: 0.15rem;
    }
  }
  .rightContent {
    flex: 1;
    text-align: left;
    .tag {
      display: inline-block;
      width: 1.07rem;
      font-size: 0.21rem;
      text-align: center;
      border: 1px solid #0068b7;
      border-radius: 12px;
      color: #0068b7;
      height: 0.3rem;
      line-height: 0.3rem;
    }
    .title {
      font-size: 0.23rem;
    }
    .text {
      font-size: 0.21rem;
      color: #898989;
    }
  }
}
</style>
