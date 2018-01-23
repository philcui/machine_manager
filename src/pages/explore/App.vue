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
        <!-- <a href="">更多 ></a> -->
      </div>
      <a href="https://www.vzan.cc/t/d-26994412">
        <div class="news-item">
          <img src="./img/news_demo.png" alt="">
          <div class="news-content">
            <p class="summ">邀请挖友分享6000亿盛宴</p>
            <p class="text">免费抢iphone—X，挖机模型，挖机冲锋衣，更有机会成为合伙代理人</p>
          </div>
        </div>
      </a>
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
        { imgSrc: require("./img/mingpian.png"), title: "免费名片", url: "http://tool.gongji58.com/tool" } ,
        { imgSrc: require("./img/fuli.png"), title: "免费福利", url: "https://v.pengxun.cn/t/d-25502421?pageIndex=1" },
        { imgSrc: require("./img/zizhu.png"), title: "精选配件", url: "https://weidian.com/?userid=1154610337&wfr=c&ifr=itemdetail" },
        { imgSrc: require("./img/guzhang.png"), title: "故障代码", url: "https://mp.weixin.qq.com/s/Msz5qTU8Q29HPCf1-bqaFA" },

        { imgSrc: require("./img/resume.png"), title: "机手简历", url: "http://m.gongji58.com/finddriver/index.html" },
        { imgSrc: require("./img/opcard.png"), title: "操作证", url: "http://mp.weixin.qq.com/s/5FZmLqff3JNvf3O-c9S_hw" },
        { imgSrc: require("./img/waji.png"), title: "挖机模型", url: "https://weidian.com/item_classes.html?userid=1154610337&c=107726851&ifr=itemclasses&src=itemclasses_107726851&wfr=wx&from=groupmessage&isappinstalled=0" },
      ],
      cellList2: [
        { imgSrc: require("./img/gaoxiaoduanzi.png"), title: "搞笑视频", url: "http://neihanshequ.com/video/" },
        { imgSrc: require("./img/meinvshipin.png"), title: "美女直播", url: "http://live.bianxianmao.com/redirect.htm?appKey=06da220afd5b4406b11e776fecba4b25&appType=h5&appEntrance=1" },
        { imgSrc: require("./img/wawaji.png"), title: "玩娃娃机", url: "https://wwj.bianxianmao.com/#/home?appKey=06da220afd5b4406b11e776fecba4b25&appType=h5&appEntrance=1" },
        { imgSrc: require("./img/fulishe.png"), title: "福利社", url: "https://fuli.bianxianmao.com?appKey=06da220afd5b4406b11e776fecba4b25&appType=h5&appEntrance=1" },
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
  padding: 0.14rem 0.46rem;
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
      .summ {
        color: #313131;
      }
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
