<template>
  <div id="app">
    <div class="head">
      <img src="./img/money.png" alt="">
      <div class="point_wrap">
        已有积分<span>{{info.point}}</span>
      </div>
    </div>
    <div class="giftList">
      <div class="giftListHead">
        <span class="line"></span>
        积分兑换请添加微信：ibxdrgn
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
          src: require('./img/1.jpg'),
          title: "小松或者神钢合金挖机模型",
          point: 59500
        },
        {
          src: require('./img/2.jpg'),
          title: "摇动电动挖机模型，送小孩",
          point: 79000
        },
        {
          src: require('./img/3.jpg'),
          title: "工地专用工装靴，温暖冬天",
          point: 69000
        },
        {
          src: require('./img/4.jpg'),
          title: "挖机冲锋衣，牛逼机手必备",
          point: 55000
        },
        {
          src: require('./img/5.jpg'),
          title: "太阳能或者插电两用充电宝",
          point: 49000
        },
        {
          src: require('./img/6.jpg'),
          title: "私人订制 业务名片头像",
          point: 12500
        },
      ],
      info: {

      },
    }
  },
  methods:{

  },
  components:{

  },
  mounted(){
    this.axios.post("/api/user/profile").then(res => {
      console.log(res)
      this.info = res.data.data
    });
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
