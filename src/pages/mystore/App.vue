<template>
  <div id="app">
    <div class="infoWrap">
      <img :src="uinfo.avatar" />
      <dl>
        <dt>
          <span class="name">{{uinfo.nickname}}</span>
          <span class="tag" v-if="myself">申请推广</span>
        </dt>
        <dd>{{uinfo.nickname}}</dd>
        <dd>
          <span class="certi" v-if="uinfo.status==2">已认证</span>
          <span class="uncerti" v-else>未认证</span>
          <span class="add">{{uinfo.address}}</span>
        </dd>
      </dl>
    </div>
    <h1>我发布的二手机</h1>
    <div class="listWrap">
      <div @click="gotoPubDetail(item.id)" class="hisItem" v-for="(item, index) in publist" :key="index">
        <div class="top">
          <img class="left" :src="item.thumb" alt="">
          <div class="right">
            <div class="info">
              <p>{{item.brand}}{{item.model}}</p>
              <p>{{item.production_date}}|{{item.address}}</p>
            </div>
            <div class="time">
              <strong>{{item.price}}万</strong>{{item.ctime}}
            </div>
          </div>
        </div>
        <div class="bottom" v-if="myself">
          <div @click.stop="delPubInfo(item.id)" class="btn deleteBtn">删除</div>
          <div @click.stop="refreshPubInfo(item.id)" class="btn refreshBtn">刷新</div>
          <div @click.stop="editPubInfo(item.id)" class="btn editBtn">编辑</div>
        </div>
      </div>
    </div>
    <div v-if="publist.length > 0" @click="loadData" class="loadMore">查看更多</div>
    <div style="text-align:center;" v-if="publist.length == 0">
      还没有发布过二手机
    </div>
    <div class="share-btn" v-if="myself" @click="showTip=true;">分享我的店铺</div>
    <share-guide @closeGuide="closeGuide" :show="showTip"></share-guide>
    <!-- <one-key-share v-if="myself"></one-key-share> -->
    <focus-wechat v-if="!myself"></focus-wechat>
    <info-bottom v-if="!myself" :mobileLink="mobileLink" :item_type="1" :isShowCollect='true'></info-bottom>
  </div>
</template>

<script>
import getUrlKey from '@/utils/getUrlKey.js'
import FocusWechat from "@/components/FocusWechat.vue";
import OneKeyShare from "@/components/OneKeyShare.vue";
import InfoBottom from '@/components/InfoBottom.vue'
import ShareGuide from "@/components/ShareGuide.vue"
export default {
  data() {
    return {
      showTip: false,
      myId: '',
      myself: false,
      mobileLink: '',
      isLogin: true,
      uinfo: {
        address: '',
        avatar: '',
        nickname: '',
        id: '',
        point: '',
        realname: '',
        status: 0,
      },
      publist: [],
      nowPage: 0,
    };
  },
  methods: {
    closeGuide() {
      this.showTip = false
    },
    gotoPubDetail(id) {
      window.location.href = "../saledetail/index.html?id=" + id
    },
    editPubInfo(id) {
      window.location.href = "../pubsale/index.html?id=" + id;
    },
    delPubInfo(id) {
      if (confirm("确认删除？删除后将无法恢复")) {
        this.axios.get("/api/used-m/delete-sell?id=" + id).then(res => {
          console.log(res);
          this.$vux.toast.show({
            type: "success",
            text: "删除成功"
          });
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        });
      } else {
      }
    },
    refreshPubInfo(id) {
      this.axios.get("/api/used-m/refresh-sell?id=" + id).then(res => {
        console.log(res);
        this.$vux.toast.show({
          type: "success",
          text: "刷新成功"
        })
        setTimeout(() => {
            window.location.reload()
        }, 1000)
      });
    },
    loadData(){
      this.mobileLink = "/api/job/query-mobile?item_id="
      let _this = this
      let mInfoPromise = new Promise((resolve,reject)=>{
        _this.axios.get("/api/user/my").then((mInfoRes) => {
          resolve(mInfoRes)
        })
      })
      let storePromise = new Promise((resolve,reject)=>{
        _this.axios.get("/api/used-m/member-store?mid="+getUrlKey('mid')).then(storeRes => {
          resolve(storeRes)
        })
      })
      let listPromise = new Promise((resolve,reject)=>{
        _this.axios.post("/api/used-m/sell-list",_this.qs.stringify({
          mid: getUrlKey('mid')
        })).then((listRes)=>{
          resolve(listRes)
        })
      })
      mInfoPromise.then((mInfoRes)=>{
        _this.isLogin = mInfoRes.data.data.status & 1
        _this.myId = mInfoRes.data.data.id
        if(_this.myId == getUrlKey('mid')){
          _this.myself = true
        }else{
          _this.myself = false
        }
        storePromise.then((storeRes)=>{
          _this.uinfo = storeRes.data.data
        })
        listPromise.then((listRes)=>{
          if(listRes.data.data.length){
            _this.nowPage++
            _this.publist = _this.publist.concat(listRes.data.data)
          }else{
            _this.$vux.toast.show({
              type: "text",
              text: "没有了"
            });
          }
        })
      })
      // this.axios.get("/api/user/my")
      // .then((res) => {
      //   this.isLogin = res.data.data.status & 1
      //   this.myId = res.data.data.id
      //   if(this.myId == getUrlKey('mid')){
      //     this.myself = true
      //   }else{
      //     this.myself = false
      //   }
      //   this.axios.get("/api/used-m/member-store?mid="+getUrlKey('mid'))
      //   .then(res => {
      //     this.uinfo = res.data.data
      //   })
      //   this.axios.post("/api/used-m/sell-list",this.qs.stringify({
      //     mid: getUrlKey('mid')
      //   }))
      //   .then(res => {
      //     if(res.data.data.length){
      //       this.nowPage++
      //       this.publist = this.publist.concat(res.data.data)
      //     }else{
      //       this.$vux.toast.show({
      //         type: "text",
      //         text: "没有了"
      //       });
      //     }
      //   })
      // })
    },
  },
  components: {
    FocusWechat,
    OneKeyShare,
    InfoBottom,
    ShareGuide
  },
  mounted() {
    this.loadData()
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app {
  .infoWrap {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2.15rem;
    padding: 0 0.4rem;
    background-color: @theme-color;
    >img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      border: 2px solid #fff;
      margin-right: 0.2rem;
    }
    >dl {
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      height: 100%;
      >dt {
        display: flex;
        align-items: center;
        font-size: 0.32rem;
        height: 0.4rem;
        .name {
          margin-right: 0.5rem;
        }
        .tag {
          width: 1.2rem;
          line-height: 0.38rem;
          text-align: center;
          font-size: 0.24rem;
          text-align: center;
          background-color: #fff;
          color: @theme-color;
          border: 1px solid #000;
          border-radius: 10px;
        }
      }
      >dd {
        display: flex;
        font-size: 0.28rem;
        height: 0.4rem;
        .uncerti {
          width: 0.88rem;
          height: 0.4rem;
          background-color: #eeeeee;
          text-align: center;
          color: #8d8d8d;
          font-size: 0.28rem;
          margin-right: 0.16rem;
        }
        .certi {
          background-color: #000;
          color: @theme-color;
        }
        .add {

        }
      }
    }
  }
  h1 {
    width: 100%;
    line-height: 0.6rem;
    text-align: center;
    background-color: #f8f8f8;
    font-size: 0.28rem;
  }
  .listWrap {
    .hisItem {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      background-color: white;
      border-bottom: 1px solid #9f9f9f;
      .top {
        display: flex;
        align-items: center;
        height: 2.1rem;
        border-bottom: 1px solid @divid-color;
        .left {
          display: flex;
          width: 1.5rem;
          height: 1.5rem;
          margin: 0 0.25rem;
        }
        .right {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          .info {
            font-size: 0.226rem;
            word-break: break-all;
            word-wrap: break-word;
            overflow: hidden;
            border-bottom: 1px solid @divid-color;
            padding-bottom: 0.16rem;
          }
          .time {
            display: flex;
            justify-content: space-between;
            font-size: 0.2rem;
            color: #b2b2b2;
            padding-top: 0.16rem;
            padding-right: 0.25rem;
            >strong {
              color: @theme-color;
              font-size: 0.16rem;
            }
          }
        }
      }      
      .bottom {
        display: flex;
        flex: 1;
        justify-content: space-around;
        align-items: center;
        height: 0.76rem;
        padding-left: 25%;
        .btn {
          width: 1rem;
          border: 1px solid @theme-color;
          color: @theme-color;
          font-size: 0.21rem;
          height: 0.45rem;
          line-height: 0.45rem;
          text-align: center;
        }
      }
    }
  }
  .loadMore{
    text-align: center;
    line-height: 0.6rem;
    line-height: 0.6rem;
    color: @theme-color;
    margin-bottom: 1.2rem;
  }
  .share-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 1rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
    background-color: @theme-color;
  }
}
</style>
