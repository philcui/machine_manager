<template>
  <div class="jiyouItem">
    <div class="leftContent">
      <img :src="itemData.imgSrc" alt="" class="leftImg">
    </div>
    <div class="rightContent">
      <div class="tag">{{itemData.tag}}</div>
      <div class="title">{{itemData.title}}</div>
      <div class="text">{{itemData.text}}</div>
    </div>
  </div>
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
  .leftContent {
    width: 1.66rem;
    .leftImg {
      width: 1.38rem;
      height: 1.38rem;
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
