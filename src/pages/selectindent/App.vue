<template>
  <div id="app">
    <div class="selectPage">
      <div class="me1">
        <img src="./img/jizhu.png" alt="">
        <a href="../finddriver/index.html?indent=1" class="btn">
          我是机主，找驾驶员
        </a>
      </div>
      <div class="me2">
        <img src="./img/jishou.png" alt="">
        <a href="../finddriver/index.html?indent=2" class="btn">
          我是机手，找工作
        </a>
      </div>
    </div>
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
.selectPage{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    z-index: 9999;
    .me1, .me2{
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 4.45rem;
      margin: 0 auto;
      img{
        height: 2.3rem;
      }
      .btn{
        display: block;
        height: 0.84rem;
        width: 3.46rem;
        line-height: 0.84rem;
        text-align: center;
        background-color: #b48a58;
        color: white;
        font-size: 0.32rem;
        border-radius: 0.05rem;
        box-shadow: 0 0.05rem 0 #6e6e6e;
        margin-top: 0.34rem;
      }
    }
    .me1{
      border-bottom: 1px solid #707070;
    }
  }
</style>
