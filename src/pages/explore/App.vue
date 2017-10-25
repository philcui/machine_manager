<template>
  <div id="app">
    <div class="group service">
      <div class="group-title">精选服务</div>
      <div>
        <div class="row">
          <menu-cell @on-cellclick="cellClick(item)" v-for="(item, index) in cellList1" :key="index" :menuCell='item'></menu-cell>
        </div>
        <div class="row">
          <menu-cell @on-cellclick="cellClick(item)" v-for="(item, index) in cellList2" :key="index" :menuCell='item'></menu-cell>
        </div>
      </div>
    </div>

    <div class="group find">
      <div class="group-title">发现</div>
      <div>
        <div class="row">
          <menu-cell @on-cellclick="cellClick(item)" v-for="(item, index) in cellList3" :key="index" :menuCell='item'></menu-cell>
        </div>
      </div>
    </div>

    <div class="group news">
      <div class="news-title">
        <span>行业新闻</span>
        <a href="">更多 ></a>
      </div>
      <div class="news-item">
        <img src="./img/news_demo.png" alt="">
        <div class="news-content">
          <p class="summ">一带一路——中国工程机械的新舞台</p>
          <p class="text">“一带一路”是跨跃区域大、持续时间长的经 济文化战略决策，中国工程机械只要抓住这个</p>
        </div>
      </div>
    </div>
    <TabBottom :selectedItem='1'></TabBottom>
  </div>
</template>

<script>
//底部tab
import TabBottom from "@/components/TabBottom.vue";
import MenuCell from "@/components/MenuCell.vue";
export default {
  data() {
    return {
      cellList1: [
        { imgSrc: require("./img/guzhang.png"), title: "故障代码" },
        { imgSrc: require("./img/fuli.png"), title: "免费福利" },
        { imgSrc: require("./img/zizhu.png"), title: "自助商城" },
        { imgSrc: require("./img/mingpian.png"), title: "免费名片" }
      ],
      cellList2: [
        { imgSrc: require("./img/jieqian.png"), title: "我要借钱" },
        { imgSrc: "", title: "" },
        { imgSrc: "", title: "" },
        { imgSrc: "", title: "" }
      ],
      cellList3: [
        { imgSrc: require("./img/baisi.png"), title: "百思不得姐" },
        { imgSrc: require("./img/neihan.png"), title: "内涵视频" },
        { imgSrc: require("./img/huoshan.png"), title: "火山视频" },
        { imgSrc: require("./img/meinv.png"), title: "美女直播" }
      ]
    };
  },
  methods: {},
  components: {
    TabBottom,
    MenuCell
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
.row {
  display: flex;
}
.group {
  padding: 0.26rem 0.46rem;
  background-color: white;
  margin-bottom: 0.1rem;
  .group-title {
    border-left: 0.08rem solid @second-color;
    padding-left: 0.15rem;
    font-size: 0.293rem;
  }
  .news-title {
    color: @theme-color;
    overflow: hidden;
    font-size: 0.27rem;
    margin-bottom: 0.43rem;
    a{
      color: #8e8e8e;
      float: right;
    }
  }
  .news-item{
    height: 1.32rem;
    display: flex;
    img{
      width: 1.37rem;
      height: 1.37rem;
      margin-right: 0.14rem;
    }
    .news-content{
      font-size: 0.22rem;
      flex: 1;
      .text{
        margin-top: 0.25rem;
        color: #898989;
        font-size: 0.21rem;
        line-height: 0.23rem;
      }
    }
  }
}
</style>
