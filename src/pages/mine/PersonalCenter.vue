<template>
  <div class="personalCenter">
    <div class="head">
      <div class="avatar">
        <img src="./img/demo_avatar.png" alt="">
      </div>
      <div class="info">
        <div class="left-info">
          <div class="info-line1">
            <div class="name">陈一宇</div>
            <div class="score">积分：3000</div>
          </div>
          <percent class="info-line2" :percent="percent"></percent>
          <div class="info-line3">完善认证，让更多的机会找上你</div>
        </div>
        <div class="right-arrow">
          <img src="./img/right_arrow.png" alt="">
        </div>  
      </div>
    </div>
    <div class="renzheng">
      <div class="idcard_wrap wrap">
        <span class="item item-left"><img src="./img/id_card.png" alt="">身份证认证</span>
        <span class="item unauth"><img src="./img/unauth.png" alt="">未认证</span>
      </div>
      <div class="opcard_wrap wrap">
        <span class="item item-left"><img src="./img/op_card.png" alt="">操作证认证</span>
        <span class="item"><img src="./img/authed.png" alt="">已认证</span>
      </div>
    </div>
    <div class="menu">
      <menu-cell v-for="(item, index) in cellList" :key="index" :cellStyle='cellStyle' :menuCell='item'></menu-cell>
    </div>
    <div class="feedback">
      <div class="title">意见反馈</div>
      <p>
        如果你有建议和要求，
        <a href="../feedback/index.html">请点此发送</a>
      </p>
    </div>
    <tab-bottom :selectedItem='3'></tab-bottom>
  </div>  
</template>

<script>
import TabBottom from "@/components/TabBottom.vue";
import Percent from "@/components/Percent.vue";
import MenuCell from "@/components/MenuCell.vue";
export default {
  data() {
    return {
      percent: 0,
      cellStyle: {
        width: "33.33%"
      },
      cellList: [
        { imgSrc: require("./img/resume.png"), title: "机手简历", url: "../driverresume/index.html" },
        { imgSrc: require("./img/history.png"), title: "历史发布", url: "../historypub/index.html" },
        { imgSrc: require("./img/collection.png"), title: "我的收藏", url: "../mycollection/index.html" },
        { imgSrc: require("./img/friends.png"), title: "邀请好友", url: "../invitefriends/index.html" },
        { imgSrc: require("./img/get_points.png"), title: "赚取积分", url: "../getpoints/index.html" },
        { imgSrc: require("./img/exchange_points.png"), title: "积分换购", url: "../pointstore/index.html" }
      ]
    };
  },
  components: {
    TabBottom,
    Percent,
    MenuCell
  },
  mounted() {
    this.percent = 90;
  }
};
</script>

<style lang="less" scoped>
.personalCenter {
  height: 100%;
  background-color: white;
  .head {
    height: 2.16rem;
    background-color: @theme-color;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar{
      width: 1.34rem;
      height: 1.34rem;
      border-radius: 50%;
      padding: 0.05rem;
      background-color: white;
      box-shadow: 0.1rem 0.1rem 0.05rem #5a5358;
      overflow: hidden;
      margin-right: 0.35rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      display: flex;
      align-items: center;
      .left-info{
        .info-line1{
          margin-bottom: 0.13rem;
          display: flex;
          align-items: center;
          .name{
            color: white;
            font-size: 0.3rem;
            margin-right: 0.25rem;
          }
          .score{
            background-color: #9b774b;
            border-radius: 0.1rem;
            width: 1.23rem;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.173rem;
            color: white;
            text-align: center;
          }
        }
        .info-line2{
          margin-bottom: 0.13rem;
        }
        .info-line3{
          color: #dcdcdc;
          font-size: 0.16rem;
        }
      }
      .right-arrow{
        width: 0.2rem;
        height: 0.4rem;
        margin-left: 0.23rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .renzheng{
    display: flex;
    border-bottom: 1px solid #626262;
    height: 0.9rem;
    .wrap{
      display: flex;
      align-items: center;
      .item{
        display: flex;
        align-items: center;
        font-size: 0.2rem;
        color: #356ca6;
        img{
          height: 0.30rem;
          margin-right: 0.1rem;
        }
        .unauth{
          color: #707070;
        }
      }
      .item-left{
        margin-right: 0.3rem;
        margin-left: 0.1rem;
      }
    }
    .idcard_wrap{
      flex: 1;
      border-right: 1px solid #626262;
    }
    .opcard_wrap{
      flex: 1;
    }
  }
  .menu{
    overflow: hidden;
    border-bottom: 1px solid #626262;
    padding-bottom: 0.4rem;
    padding-top: 0.4rem;
  }
  .feedback{
    margin-top: 1.92rem;
    margin-left: 0.64rem;
    .title{
      color: #1b1b1b;
      font-size: 0.2rem;
    }
    p{
      font-size: 0.16rem;
      color: #737373;
      a{
        color: @theme-color;
      }
    }
  }
}
</style>
