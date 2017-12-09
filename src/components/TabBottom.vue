<template>
  <div class="tabBar">
    <a :href="item.url" v-for="(item, index) in tabBarList" :key="index" class="tabItem">
      <img :src="selectedItem==index?item.activeImg:item.img" class="icon">
      <span class="title" :class="{activeTitle:index == selectedItem}">{{item.title}}</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabBarList: [
        {
          img: require("../assets/zhuye.png"),
          activeImg: require("../assets/zhuye_active.png"),
          title: "主页",
          url: "/index.html"
        },
        {
          img: require("../assets/faxian.png"),
          activeImg: require("../assets/faxian_active.png"),
          title: "发现",
          url: "/explore/index.html"
        },
        {
          img: require("../assets/friends.png"),
          activeImg: require("../assets/friends_active.png"),
          title: "机友圈",
          url : "https://v.pengxun.cn/f/s-826187"
        },
        {
          img: require("../assets/wode.png"),
          activeImg: require("../assets/wode_active.png"),
          title: "我的",
          url: "/mine/index.html"
        }
      ]
    };
  },
  props: {
    selectedItem: Number
  }
};
</script>

<style lang='less' scoped>
.tabBar {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 0.9rem;
  background-color: #f7f6f6;
  box-sizing: border-box;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  .tabItem {
    display: block;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #535353;
    .icon {
      height: 0.3rem;
      display: block;
      margin-bottom: 0.1rem;
    }
    .title {
      font-size: 0.18rem;
    }
    .activeTitle {
      color: @theme-color;
    }
  }
}
</style>
