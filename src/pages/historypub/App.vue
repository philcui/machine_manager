<template>
  <div id="app">
    <div class="listWrap">
      <div class="hisItem" v-for="(item, index) in mock_data" :key="index">
        <div class="left">
          <img class="tu" :src="getIcon(item.type)" alt="">
          <div class="title">{{getTitle(item.type)}}</div>
        </div>
        <div class="right">
          <div class="rightTop">
            <div class="info">
              {{item.info}}
            </div>
            <div class="time">
              {{item.time}}
            </div>
          </div>
          <div class="rightBottom">
            <div class="btn deleteBtn">删除</div>
            <div class="btn editBtn">编辑</div>
            <div class="btn refreshBtn">刷新</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      mock_data: [
        {
          type: 'zu',
          time: '2017-5-1',
          info: 'hahahhahahahhahhaddddddddddddddddddd'
        },
        {
          type: 'pin',
          time: '2017-5-1',
          info: 'hahahhahahahhahhaddddddddddddddddddd'
        },
        {
          type: 'pei',
          time: '2017-5-1',
          info: 'hahahhahahahhahhaddddddddddddddddddd'
        },
        {
          type: 'ji',
          time: '2017-5-1',
          info: 'hahahhahahahhahhaddddddddddddddddddd'
        },
      ],
      hisTypeData: {
        zu : {
          icon: require('./img/zu.png'),
          title: '求租设备',
        },
        pin : {
          icon: require('./img/pin.png'),
          title: '招聘机手',
        },
        pei : {
          icon: require('./img/pei.png'),
          title: '买配件',
        },
        ji : {
          icon: require('./img/ji.png'),
          title: '求购二手机',
        },
      },
    }
  },
  methods:{
    getTitle(type){
      return this.hisTypeData[type].title
    },
    getIcon(type){
      return this.hisTypeData[type].icon
    },
  },
  components:{

  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

#app{
  .listWrap{
    .hisItem{
      display: flex;
      height: 1.7rem;
      padding-top: 0.27rem;
      box-sizing: border-box;
      background-color: white;
      border-top: 1px solid #dcdcdd;
      border-bottom: 1px solid #dcdcdd;
      .left{
        display: flex;
        height: 100%;
        align-items: center;
        flex-direction: column;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        .tu{
          width: 0.8rem;
          height: 0.8rem;
        }
        .title{
          font-size: 0.173rem;
        }
      }
      .right{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        .rightTop{
          height: 0.8rem;
          display: flex;
          margin-bottom: 0.08rem;
          .info{
            font-size: 0.226rem;
            width: 3.78rem;
            font-size: 0.226rem;
            word-break: break-all;
            word-wrap: break-word;
            overflow: hidden;
          }
          .time{
            flex: 1;
            font-size: 0.173rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            border-left: 1px solid #959595;
          }
        }
        .rightBottom{
          display: flex;
          flex: 1;
          justify-content: space-around;
          align-items: center;
          border-top: 1px solid #535353;
          .btn{
            width: 0.7rem;
            border: 1px solid #959595;
            color: @theme-color;
            font-size: 0.21rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
