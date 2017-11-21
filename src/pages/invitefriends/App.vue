<template>
  <div id="app">
    <a href="../invitepage/index.html" class="inviteTop"></a>
    <a href="" class="myInvite" @click.prevent="showMyInvite=true"></a>
    <a href="" class="myPoint" @click.prevent="showGift=true"></a>
    <a href="../invitepage/index.html" class="inviteBottom"></a>

    <x-dialog v-model="showMyInvite" :dialog-style="{'background-color': 'transparent'}">
      <div class="contentWrap">
        <div class="num">25</div>
      </div>
      <div @click="showMyInvite=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>

    <x-dialog v-model="showGift" :dialog-style="{'background-color': 'transparent'}">
      <img class="toreal" src="./img/toreal.jpg" alt="">
      <div @click="showGift=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from "vux";
export default {
  data() {
    return {
      showMyInvite: false,
      showGift: false,
    };
  },
  methods: {},
  components: {
    XDialog
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
//为了进度也是没办法 MDZZ
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
  .myinvite{
    height: 7.75rem;
  }
  .contentWrap{
    height: 7.75rem;
    width: 4.74rem;
    background: url("./img/myinvite.jpg") center center no-repeat;
    background-size: cover;
    position: relative;
    .num{
      position: absolute;
      top: 1.44rem;
      left: 2.05rem;
      font-size: 0.3rem;
      color: #e56341;
    }
  }
  .toreal{
    width: 4.8rem;
  }
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
</style>
