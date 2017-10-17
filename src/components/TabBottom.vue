<template>
  <tabbar>
    <tabbar-item>
      <!-- <img slot="icon" src="../assets/demo/icon_nav_button.png"> -->
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item show-dot>
      <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
      <span slot="label">发现</span>
    </tabbar-item>
    <tabbar-item selected link="/component/demo">
      <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
      <span slot="label">机友圈</span>
    </tabbar-item>
    <tabbar-item badge="2">
      <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'
export default {
  components:{
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang='less' scoped>
  
</style>
