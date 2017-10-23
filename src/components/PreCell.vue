<template>
  <div class="preCell">
    <span class="title">{{title}}</span> :
    <span class="content">{{content}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  }
}
</script>

<style lang='less' scoped>
  .preCell{
    height: 0.62rem;
    line-height: 0.62rem;
    background-color: white;
    width: 100%;
    border-bottom: 1px solid #e2e2e2;
    color: #535353;
    font-size: 0.267rem;
    .title{
      text-align: justify;
      min-width: 1.29rem;
      display: inline-block;
      text-align-last: justify;
    }
    .content{

    }
  }
</style>
