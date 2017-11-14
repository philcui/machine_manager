<template>
  <div id="app">
    <group gutter='0'>
      <div class="info">
        <img class="tx" src="./img/tx.png" alt="">
        <div class="text">
          <div class="name">陈一宇</div>
          <div class="short">挖掘机 | 浙江杭州西湖区 | 8年驾龄</div>
        </div>
      </div>
    </group>
    <group>
      <x-switch title="是否公开"></x-switch>      
      <cell title="查看简历" is-link></cell>
      <cell title="刷新简历" is-link></cell>
      <cell title="修改简历" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, XSwitch, Cell} from "vux";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Group,
    XSwitch,
    Cell,
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app{
  .info{
    display: flex;
    align-items: center;
    height: 1.92rem;
    .tx{
      border-radius: 50%;
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.25rem;
      margin-left: 0.4rem;
    }
    .text{
      color: @theme-color;
      .name{
        font-size: 0.29rem;
      }
      .short{
        font-size: 0.16rem;
        margin-top: 0.17rem;
      }
    }
  }
}
</style>
