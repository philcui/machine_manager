<template>
  <div id="app">
    <MainHead></MainHead>
    <top-msg :pubMessage='pubMessage'></top-msg>
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
    <TabBottom :tabBarList='tabBarList'></TabBottom>
  </div>
</template>

<script>
//底部tab
import TabBottom from '@/components/TabBottom.vue'
//头部
import MainHead from '@/components/MainHead.vue'
//菜单单元格
import MenuCell from '@/components/MenuCell.vue'
//新闻列表元素
import JiyouItem from '@/components/JiyouItem.vue'
//分隔标题
import Hdivider from '@/components/Hdivider.vue'
//顶部滚动播报
import TopMsg from '@/components/TopMsg.vue'
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
        {imgSrc: require('./img/zhaojiashi.png'), title: '找驾驶员', url: './finddriver/index.html'},
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
        {
          imgSrc: require('./img/imgtest.jpg'), 
          tag: '机友交流', 
          title: '大神们，帮我看下值多少钱，卡特320',
          text: '刚刚在工地包完月，工况非常好，行走有力，油、水温不高'
        },
        {
          imgSrc: require('./img/imgtest.jpg'), 
          tag: '机友交流', 
          title: '大神们，帮我看下值多少钱，卡特320',
          text: '刚刚在工地包完月，工况非常好，行走有力，油、水温不高'
        }
      ],
      tabBarList: [
        {imgSrc: require('./img/zhuye.png'), title: '主页'},
        {imgSrc: require('./img/faxian.png'), title: '发现'},
        {imgSrc: require('./img/friends.png'), title: '机友圈'},
        {imgSrc: require('./img/wode.png'), title: '我的'}
      ]
    }
  },
  components: {
    TabBottom,
    MainHead,
    MenuCell,
    JiyouItem,
    Hdivider,
    TopMsg
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';
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
  max-height: 40%;
  overflow-y: auto;
}
</style>
