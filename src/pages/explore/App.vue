<template>
  <div id="app">
    <div class="group service">
      <div class="group-title">精选服务</div>
      <div class="menu-cell-wrap">
        <menu-cell class="menu-cell" @on-cellclick="cellClick(item)" v-for="(item, index) in cellList1" :key="index" :menuCell='item'></menu-cell>
      </div>
    </div>

    <div class="group find">
      <div class="group-title">发现</div>
      <div class="menu-cell-wrap">
        <menu-cell class="menu-cell" @on-cellclick="cellClick(item)" v-for="(item, index) in cellList2" :key="index" :menuCell='item'></menu-cell>
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
        { imgSrc: require("./img/guzhang.png"), title: "故障代码", url: "https://mp.weixin.qq.com/s/Msz5qTU8Q29HPCf1-bqaFA" },
        { imgSrc: require("./img/fuli.png"), title: "免费福利", url: "https://v.pengxun.cn/t/d-25502421?pageIndex=1" },
        { imgSrc: require("./img/zizhu.png"), title: "自助商城", url: "https://weidian.com/?userid=1154610337&wfr=c&ifr=itemdetail" },
        { imgSrc: require("./img/mingpian.png"), title: "免费名片", url: "http://tool.gongji58.com/tool" } ,
        { imgSrc: require("./img/jieqian.png"), title: "我要借钱" }
      ],
      cellList2: [
        { imgSrc: require("./img/baisi.png"), title: "百思不得姐", url: "http://www.budejie.com/" },
        { imgSrc: require("./img/neihan.png"), title: "内涵视频", url: "http://neihanshequ.com/video/" },
        { imgSrc: require("./img/huoshan.png"), title: "精彩视频", url: "https://v.pengxun.cn/f/s-826187?typeId=449253&h=0" },
        { imgSrc: require("./img/meinv.png"), title: "美女直播", url: "http://www.huajiao.com/mobile/index" }
      ]
    };
  },
  methods: {
    cellClick(item) {
      if (!item.url) {
        this.$vux.toast.show({
          text: "敬请期待",
          type: "text"
        });
      } else {
        window.location.href = item.url;
      }
    },
  },
  components: {
    TabBottom,
    MenuCell
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app{
  padding-bottom: 0.9rem;
}
.menu-cell-wrap {
  overflow: hidden;
  .menu-cell {
    width: 25%;
  }
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
    a {
      color: #8e8e8e;
      float: right;
    }
  }
  .news-item {
    height: 1.32rem;
    display: flex;
    img {
      width: 1.37rem;
      height: 1.37rem;
      margin-right: 0.14rem;
    }
    .news-content {
      font-size: 0.22rem;
      flex: 1;
      .text {
        margin-top: 0.25rem;
        color: #898989;
        font-size: 0.21rem;
        line-height: 0.23rem;
      }
    }
  }
}
</style>
