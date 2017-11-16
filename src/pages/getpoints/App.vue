<template>
  <div id="app">
    <div class="top">
      <div class="circle">
        <div class="points_label">我的积分</div>
        <div class="points">{{points}}</div>
      </div>
    </div>
    <div class="center">
      <div class="cell personInfo">
        <img src="./img/person_info.png" alt="">
        <div>完善个人资料</div>
        <div>+20积分</div>
        <div :class="getBtnClass(isInfoComplete)">去完成</div>
      </div>
      <div class="cell idcard">
        <img src="./img/id_card.png" alt="">
        <div>完成实名认证</div>
        <div>+20积分</div>
        <div :class="getBtnClass(isIdCardComplete)">已完成</div>
      </div>
    </div>
    <div class="bottom">
      <img src="./img/friends.png" alt="">
      <div>邀请好友注册</div>
      <div>+20积分</div>
      <div class="btn uncomplete">去分享</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isInfoComplete: false,
      isIdCardComplete: true,
      points: 0,
    };
  },
  methods: {
    getBtnClass(flag){
      return flag ? "btn complete" : "btn uncomplete"
    },
    numberAnimate(num){
      for(let i=0; i <= num; i++){
        setTimeout(() => {this.points = i}, 1000/30)
      }
    }
  },
  components: {},
  mounted(){
    this.numberAnimate(5000)
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app {
  background-color: #fee8d0;
  font-size: 0.24rem;
  color: #6a3906;
  display: flex;
  flex-direction: column;
  .btn{
    height: 0.44rem;
    width: 1.12rem;
    line-height: 0.44rem;
    text-align: center;
    color: white;
    font-size: 0.267rem;
    margin-top: 0.28rem;
  }
  .complete{
    background-color: #959595;
  }
  .uncomplete{
    background-color: #f7af4e;
  }
  .top {
    height: 4rem;
    background: url("./img/bg_points.png") no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle{
      text-align: center;
      .points_label{
        font-size: 0.3rem;
        color: #fee8d0;
        border-bottom: 1px solid white;
      }
      .points{
        font-size: 0.817rem;
        color: #fec73d;
      }
    }
  }
  .center {
    height: 2.58rem;
    display: flex;
    border-bottom: 1px solid #959595;
    .personInfo{
      border-right: 1px solid #959595; 
    }
    .cell {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        height: 0.44rem;
        margin-bottom: 0.24rem;
      }
    }
  }
  .bottom {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
      height: 0.44rem;
      margin-bottom: 0.24rem;
    }
  }
}
</style>
