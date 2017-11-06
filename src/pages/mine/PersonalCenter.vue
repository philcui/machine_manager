<template>
  <div class="personalCenter">
    <div class="head">
      <div class="avatar">
        <img src="" alt="">
      </div>
      <div class="info">
        <div class="left-info">
          <div class="info-line1">
            <div class="name">陈一宇</div>
            <div class="score">积分：3000</div>
          </div>
          <percent :percent="percent"></percent>
          <div>完善认证，让更多的机会找上你</div>
        </div>
        <div class="right-arrow">
          <img src="" alt="">
        </div>  
      </div>
    </div>
    <div class="renzheng">

    </div>
    <div class="menu">
      <menu-cell v-for="(item, index) in cellList" :key="index" :cellStyle='cellStyle' :menuCell='item'></menu-cell>
    </div>
    <tab-bottom :selectedItem='3'></tab-bottom>
  </div>  
</template>

<script>
import TabBottom from "@/components/TabBottom.vue";
import Percent from "@/components/Percent.vue";
import MenuCell from "@/components/MenuCell.vue";
export default {
  data() {
    return {
      percent: 0,
      cellStyle: {
        width: "33.33%"
      },
      cellList: [
        { imgSrc: require("./img/resume.png"), title: "机手简历", url: "../driverresume/index.html" },
        { imgSrc: require("./img/history.png"), title: "历史发布", url: "../historypub/index.html" },
        { imgSrc: require("./img/collection.png"), title: "我的收藏", url: "../mycollection/index.html" },
        { imgSrc: require("./img/friends.png"), title: "邀请好友", url: "../invitefriends/index.html" },
        { imgSrc: require("./img/get_points.png"), title: "赚取积分", url: "../getpoints/index.html" },
        { imgSrc: require("./img/exchange_points.png"), title: "积分换购", url: "../pointstore/index.html" }
      ]
    };
  },
  components: {
    TabBottom,
    Percent,
    MenuCell
  },
  mounted() {
    this.percent = 90;
  }
};
</script>

<style lang="less" scoped>
.personalCenter {
  height: 100%;
  background-color: white;
  .head {
    height: 2.16rem;
    background-color: @theme-color;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
