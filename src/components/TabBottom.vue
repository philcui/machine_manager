<template>
  <div class="tabBar">
    <div v-for="(item, index) in tabBarList" :key="index" class="tabItem">
      <img :src="item.imgSrc" class="icon">
      <span class="title">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabBarList: Array
  }
}
</script>

<style lang='less' scoped>
  .tabBar{
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 0.9rem;
    background-color: #f7f6f6;
    box-sizing: border-box;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    .tabItem{
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon{
        height: 0.3rem;
        display: block;
        margin-bottom: 0.1rem;
      }
      .title{
        font-size: 0.18rem;
      }
    }
  }
</style>
