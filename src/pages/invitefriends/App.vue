<template>
  <div id="app">
    <a @click="showTip = true" class="inviteTop"></a>
    <a href="" class="myInvite" @click.prevent="showMyInvite=true"></a>
    <a href="" class="myPoint" @click.prevent="showGift=true"></a>
    <a @click="showTip = true" class="inviteBottom"></a>

    <x-dialog v-model="showMyInvite" :dialog-style="{'background-color': 'transparent'}">
      <img class="invitebg" src="./img/myinvite.jpg" alt="">
      <div class="num_wrap">{{count}}</div>
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

    <share-guide @closeGuide="closeGuide" :show="showTip"></share-guide>
  </div>
</template>

<script>
import { XDialog } from "vux";
import ShareGuide from "@/components/ShareGuide.vue"
import share from '@/utils/share.js'
export default {
  data() {
    return {
      showMyInvite: false,
      showGift: false,
      count: 0,
      showTip: false,
    };
  },
  methods: {
    closeGuide(){
      this.showTip = false;
    },
  },
  mounted() {
    this.axios.post("/api/qrcode/member-total-scan").then(res => {
      console.log(res);
      this.count = res.data.data.count;
      let code = res.data.data.code;
      share({
        title: "工机管家，邀请注册",
        img: "http://m.gongji58.com/static/imgtest.jpg",
        desc: "注册享好礼，老铁快来工机管家看看吧",
        link: "http://m.gongji58.com/invitepage/index.html?code=" + code,
      })

    });
  },
  components: {
    XDialog,
    ShareGuide,
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
#app {
  background: url("./img/bg_big.jpg") center center no-repeat;
  background-size: cover;
  height: 16.9rem;
  position: relative;
  a {
    position: absolute;
    display: block;
  }
  .inviteTop {
    top: 2.75rem;
    left: 0.84rem;
    height: 0.63rem;
    width: 2.97rem;
  }
  .myInvite {
    top: 2.75rem;
    left: 4.07rem;
    height: 0.54rem;
    width: 1.69rem;
  }
  .myPoint {
    top: 9.7rem;
    left: 2.34rem;
    width: 1.53rem;
    height: 0.39rem;
  }
  .inviteBottom {
    top: 13.85rem;
    left: 0.27rem;
    width: 5.79rem;
    height: 0.9rem;
  }
  .myinvite {
    height: 7.75rem;
  }
  .invitebg {
    width: 4.74rem;
    position: relative;
  }
  .num_wrap{
    background: url("./img/num_bg.png") center center no-repeat;
    background-size: cover;
    width: 1.08rem;
    height: 2.13rem;
    position: absolute;
    top: 1.07rem;
    left: 50%;
    margin-left: -0.54rem;
    text-align: center;
    font-size: 0.3rem;
    color: #e56341;
    padding-top: 0.35rem;
  }
  .toreal {
    width: 4.8rem;
  }
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
</style>
