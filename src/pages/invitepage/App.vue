<template>
  <div id="app">
    <img src="./img/qrcode.png" alt="">
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods:{

  },
  components:{

  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

body{
  background-color: #feedd3;
}
#app{
  background: url("./img/bg.jpg") center center no-repeat;
  background-size: cover;
  height: 10.32rem;
  position: relative;
  img{
    position: absolute;
    top: 6.14rem;
    left: 1.88rem;
    height: 2.17rem;
  }
}
</style>
