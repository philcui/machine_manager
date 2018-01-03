<template>
  <div class="focus-wechat">
    <div class="inner">
      <!-- <span class="slogan">找驾驶员、故障诊断、二手机</span>
      <img class="arrow_right" src="../assets/arrow_right.png" alt="">
      <img class="qrcode" src="../assets/qrcode.png" alt=""> -->
      <img src="../assets/focusGJ.png" alt="">
    </div>
  </div>  
</template>

<script>
export default {
  methods:{
    focus(){
      window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5NjA3MTA2Nw"
    }
  }
}
</script>

<style lang='less' scoped>
.focus-wechat{
  width: 100%;
  height: 1.34rem;
  margin-top: 0.1rem;
  margin-bottom: 1.66rem;
  .inner{
    height: 100%;
    line-height: 1.34rem;
    //border: 1px solid #434343;
    width: 5.13rem;
    margin: 0 auto;
    text-align: center;
    img{
      vertical-align: middle;
      width: 100%;
    }
    .slogan{
      color: #313131;
      font-size: 0.213rem;
    }
    .arrow_right{
      width: 0.2rem;
    } 
    .qrcode{
      width: 1.15rem;
    }
  }  
}
</style>
