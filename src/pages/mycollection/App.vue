<template>
  <div id="app">
    <div class="tab">
      <div @click="selectTab(1)" :class="getClass(1)">职位收藏</div>
      <div @click="selectTab(2)" :class="getClass(2)">二手机收藏</div>
    </div>
    <div class="jobCollect" v-for="(item, index) in jobList" :key="index" v-show="true">
      <div class="jobItem">
        <div class="left">
          <img :src="item.img" alt="">
          <div>{{item.name}}</div>
        </div>
        <div class="center">
          <p>{{item.type}}</p>
          <p>{{item.salary}}</p>
          <p>{{item.address}}</p>
        </div>
        <div class="right">
          <div class="time">{{item.time}}</div>
          <div class="cancelBtn">取消</div>
        </div>
      </div>
    </div>
    <div class="machineCollect" v-show="false">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      activeIndex: 1,
      jobList: [
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
        {
          img: require('./img/tx.png'),
          name: '李峰',
          type: '大挖',
          salary: '6000元/月',
          address: '江苏省南京市大观路',
          time: '10-25',
        },
      ]
    }
  },
  methods:{
    getClass(index){
      return {
        active: index == this.activeIndex
      }
    },
    selectTab(index){
      this.activeIndex = index
    }
  },
  components:{

  },
  mounted(){
   
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

#app{
  .tab{
    width: 100%;
    display: flex;
    div{
      flex: 1;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      background-color: #d2d2d2;
      color: #898989;
    }
    .active{
      color: @theme-color;
      background-color: #ebebeb;
    }
  }
  .jobCollect{
    .jobItem{
      display: flex;
      background-color: white;
      border-bottom:1px solid @divid-color;
      height: 2rem;
      padding-left: 0.3rem;
      padding-top: 0.34rem;
      padding-top: 0.3rem;
      color: #313131;
      .left{
        height: 100%;
        width: 0.9rem;
        text-align: center;
        margin-right: 0.4rem;
        img{
          height: 0.84rem;
          width: 0.84rem;
        }
      }
      .center{
        flex: 1;
        margin-right: 0.3rem;
        font-size: 0.24rem;
        word-wrap: break-word;
        word-break: break-all;
        p{
          margin-bottom: 0.10rem;
        }
      }
      .right{
        width: 1.2rem;
        text-align: center;
        font-size: 0.213rem;
        .time{
          color: #626262;
          margin-bottom: 0.2rem;
        }
        .cancelBtn{
          width: 0.86rem;
          height: 0.36rem;
          line-height: 0.36rem;
          text-align: center;
          margin: 0 auto;
          border: 1px solid #dbdeda;
        }
      }
    }
  }
}
</style>
