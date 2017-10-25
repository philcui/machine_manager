<template>
  <div class="focus-wechat">
    <div class="inner">
      <span class="slogan">找活、找人、板车、维修，请关注</span>
      <img class="arrow_right" src="../assets/arrow_right.png" alt="">
      <img class="qrcode" src="../assets/qrcode.png" alt="">
    </div>
  </div>  
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.focus-wechat{
  width: 100%;
  height: 1.34rem;
  position: absolute;
  bottom: 1.4rem;
  .inner{
    height: 100%;
    line-height: 1.34rem;
    border: 1px solid #434343;
    width: 5.13rem;
    margin: 0 auto;
    text-align: center;
    img{
      vertical-align: middle;
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
