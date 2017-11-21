<template>
  <div id="app">
    <div class="head">
      <img src="./img/money.png" alt="">
      <div class="point_wrap">
        已有积分<span>23580</span>
      </div>
    </div>
    <div class="giftList">
      <div class="giftListHead">
        <span class="line"></span>
        积分兑换请添加微信：dasheng8186
      </div>
      <div class="giftCellList">
        <div class="giftCell" v-for="(item, index) in giftList" :key="index">
          <img :src="item.src" alt="">
          <div class="title">{{item.title}}</div>
          <div class="point">{{item.point}}积分</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      giftList: [
        {
          src: require('./img/charge.png'),
          title: "小米移动电源 2000毫安",
          point: 26000
        },
        {
          src: require('./img/waji.png'),
          title: "全合金挖掘机模型",
          point: 26000
        },
        {
          src: require('./img/charge.png'),
          title: "小米移动电源 2000毫安",
          point: 26000
        },
        {
          src: require('./img/charge.png'),
          title: "小米移动电源 2000毫安",
          point: 26000
        },
      ],
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

#app{
  color: #535353;
  .head{
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.2rem;
    height: 1.89rem;
    img{
      width: 0.94rem;
      margin-right: 0.28rem;
    }
    .point_wrap{
      span{
        font-size: 0.3rem;
        color: #f39700;
      }
    }
  }
  .giftList{
    background-color: white;
    .giftListHead{
      height: 0.84rem;
      padding-left: 0.18rem;
      display: flex;
      align-items: center;
      .line{
        display: inline-block;
        height: 0.3rem;
        width: 0.1rem;
        background-color: @theme-color;
        margin-right: 0.1rem;
      }
    }
    .giftCellList{
      overflow: hidden;
      border: 1px solid @divid-color;
      .giftCell{
        display: flex;
        width: 50%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        float: left;
        height: 3.34rem;
        border-right: 1px solid @divid-color;
        border-bottom: 1px solid @divid-color;
        img{
          height: 1.68rem;
        }
        .title{

        }
        .point{
          color: #f39700;
        }
      }
    }
  }
}
</style>
