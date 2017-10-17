<template>
  <div id="app">
    <MainHead></MainHead>
    <div class="msgTop">
      <img class="msg" src="./img/huatong.png" alt="">
      <marquee>
        <marquee-item v-for="(item, index) in pubMessage" :key="index">{{item.content}}</marquee-item>
      </marquee>
      <img class="huatong" src="./img/msg.png" alt="">
    </div>
    <div class="menu">
      <div class="row">
        <menu-cell v-for="(item, index) in cellList1" :key="index" :menuCell='item'></menu-cell>
      </div>
      <div class="row">
        <menu-cell v-for="(item, index) in cellList2" :key="index" :menuCell='item'></menu-cell>
      </div>
    </div>
    <div class="jiyouquan">
      <hdivider class="divider"></hdivider>
      <jiyou-item v-for="(item, index) in jiyouList" :key="index" :itemData='item'></jiyou-item>
    </div>
    <TabBottom></TabBottom>
  </div>
</template>

<script>
import setRem from '@/utils/setRem.js'
import TabBottom from '@/components/TabBottom.vue'
import MainHead from '@/components/MainHead.vue'
import { Marquee, MarqueeItem} from 'vux'
import MenuCell from '@/components/MenuCell.vue'
import JiyouItem from '@/components/JiyouItem.vue'
import Hdivider from '@/components/Hdivider.vue'
export default {
  name: 'app',
  data() {
    return {
      pubMessage: [
        { content: '最新卡特挖掘机性能介绍，必看！' },
        { content: '澳门最大的赌场上线啦！' },
        { content: '学厨师，到新东方！' }
      ],
      cellList1: [
        {imgSrc: require('./img/zhaojiashi.png'), title: '找驾驶员'},
        {imgSrc: require('./img/guzhang.png'), title: '故障问答'},
        {imgSrc: require('./img/ershou.png'), title: '二手机'}
      ],
      cellList2: [
        {imgSrc: require('./img/qiuzu.png'), title: '设备求租'},
        {imgSrc: require('./img/maimai.png'), title: '买卖供求'},
        {imgSrc: require('./img/banche.png'), title: '板车托运'}
      ],
      jiyouList:[
        {
          imgSrc: require('./img/imgtest.jpg'), 
          tag: '精彩视频', 
          title: '每天更新，最懂机友的挖机视频', 
          text: '拥有这样一台挖机就能娶三个老婆'
        },
        {
          imgSrc: require('./img/imgtest.jpg'), 
          tag: '机友交流', 
          title: '大神们，帮我看下值多少钱，卡特320',
          text: '刚刚在工地包完月，工况非常好，行走有力，油、水温不高'
        },
      ]
    }
  },
  mounted() {
    setRem()
  },
  components: {
    TabBottom,
    MainHead,
    Marquee,
    MarqueeItem,
    MenuCell,
    JiyouItem,
    Hdivider
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
body,
html {
  height: 100%;
  font-size: 16px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #eeeeee;
}
.msgTop{
  background-color: #fff;
}
.menu {
  background-color: #fff;
  margin-top: 12px;
  .row {
    display: flex;
  }
}
.jiyouquan{
  margin-top: 12px;
  background-color: #fff;
  padding-top: 0.33rem;
}
.msgTop{
  padding-left: 0.26rem;
  padding-right: 0.26rem;
  height: 0.76rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .msg{
    height: 0.32rem;
    display: block;
  }
  .huatong{
    height: 0.32rem;
    display: block;
  }
}
</style>
