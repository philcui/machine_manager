<template>
  <div class="freeResume">
    <a class="inner">
      免费制作我的求职简历
      <img class="goResume" src="../assets/go_resume.png" alt="">
    </a>
  </div>  
</template>

<script>
export default {
  
};
</script>

<style lang='less' scoped>
.freeResume {
  width: 100%;
  position: absolute;
  bottom: 1.92rem;
  text-align: center;
  .inner {
    display: inline-block;
    height: 0.46rem;
    width: 3.06rem;
    text-align: center;
    line-height: 0.46rem;
    color: white;
    font-size: 0.23rem;
    border-radius: 0.15rem;
    background-color: @theme-color;
    .goResume {
      height:0.3rem;
      vertical-align: middle;
      margin-left: 0.16rem;
    }
  }
}
</style>
