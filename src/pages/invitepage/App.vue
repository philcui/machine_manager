<template>
  <div id="app">
    <!--img :src="src" alt=""-->
    <img v-bind:src="imgUrl" alt="二维码加载中..." />
  </div>
</template>

<script>
  import getUrlKey from '@/utils/getUrlKey.js'

  export default {
  data(){
    return {
      src: "",
      imgUrl: '',
    }
  },
  methods:{

  },
  mounted(){
    this.imgUrl = "/api/qrcode/qrcode-img?code=" + getUrlKey("code");
    /*
    this.axios.post("/api/qrcode/qrcode-img?code=" + getUrlKey("code"))
    .then((res) => {
      console.log(res)
      this.src = res.data
    })
    */
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
  text-align: center;
  img{
    margin-top: 6.14rem;
    height: 2.17rem;
  }
}
</style>
