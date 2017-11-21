<template>
  <div id="app">
    <a href="../invitepage/index.html" class="inviteTop"></a>
    <a href="" class="myInvite"></a>
    <a href="" class="myPoint"></a>
    <a href="" class="inviteBottom"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
//为了进度也是没办法 MDZZ PM
#app {
  background: url("./img/bg_big.jpg") center center no-repeat;
  background-size: cover;
  height: 16.59rem;
  position: relative;
  a{
    position: absolute;
    display: block;
  }
  .inviteTop {
    top: 2.55rem;
    left: 0.84rem;
    height: 0.63rem;
    width: 2.97rem;
  }
  .myInvite {
    top: 2.55rem;
    left: 4.07rem;
    height: 0.54rem;
    width: 1.69rem;
  }
  .myPoint {
    top: 9.5rem;
    left: 2.34rem;
    width: 1.53rem;
    height: 0.39rem;
  }
  .inviteBottom {
    top: 13.65rem;
    left: 0.27rem;
    width: 5.79rem;
    height: 0.9rem;
  }
}
</style>
