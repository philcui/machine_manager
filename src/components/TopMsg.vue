<template>
  <div class="msgTop">
    <img class="msg" src="../assets/huatong.png" alt="">
    <marquee class="marquee">
      <marquee-item @click.native="goto(item.link)" v-for="(item, index) in pubMessage" :key="index">{{item.content}}</marquee-item>
    </marquee>
  </div>
</template>

<script>
import { Marquee, MarqueeItem} from 'vux'
export default {
  props: {
    pubMessage: Array
  },
  components:{
    Marquee,
    MarqueeItem
  },
  methods: {
    goto(link){
      window.location.href = link
    }
  }
}
</script>

<style lang='less' scoped>
.msgTop {
  padding-left: 0.26rem;
  padding-right: 0.26rem;
  height: 0.76rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .msg {
    height: 0.32rem;
    display: block;
  }
  .marquee {
    margin-left: 0.2rem;
    font-size: 0.21rem;
    color: red;
  }
}
</style>
