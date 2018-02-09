<template>
  <div id="app">
    <div class="infoWrap">
      <a href="/personinfo/index.html"><img :src="uinfo.avatar" /></a>
      <dl>
        <dt>
          <span class="name">{{uinfo.nickname}}</span>
          <!-- <span class="tag" v-if="myself" @click="popularize">申请推广</span> -->
          <span class="certi" v-if="uinfo.status==2">已认证</span>
          <span class="uncerti" v-else>未认证<a href="/idcardauth/index.html" v-if="myself">&nbsp;>>&nbsp;去认证</a></span>
        </dt>
        <dd>{{uinfo.nickname}}</dd>
        <dd>{{uinfo.address}}</dd>
      </dl>
    </div>
    <h1>
      <div @click="tab=1"><span :class="{'selected':tab==1}">我的发布</span></div>
      <div @click="tab=2"><span :class="{'selected':tab==2}">我的收藏</span></div>
    </h1>
    <div class="listWrap" v-show="tab==1">
      <div @click="gotoPubDetail(item.id)" class="hisItem" v-for="(item, index) in publist" :key="index">
        <div class="top">
          <img class="left" :src="item.thumb" alt="">
          <div class="right">
            <div class="info">
              <p>{{item.brand}}{{item.model}}</p>
              <h5>{{item.production_date}} | {{item.address}}</h5>
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
    <div class="listWrap" v-show="tab==2">
      <div @click="gotoPubDetail(item.id)" class="hisItem" v-for="(item, index) in favlist" :key="index">
        <div class="top">
          <img class="left" :src="item.thumb" alt="">
          <div class="right">
            <div class="info">
              <p>{{item.brand}}{{item.model}}</p>
              <h5>{{item.production_date}} | {{item.address}}</h5>
            </div>
            <div class="time">
              <strong>{{item.price}}万</strong>{{item.ctime}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="publist.length > 0 && tab == 1" @click="loadData" class="loadMore">查看更多</div>
    <div v-if="favlist.length > 0 && tab == 2" @click="loadFavList" class="loadMore">查看更多</div>
    <div style="text-align:center;" v-if="publist.length == 0 && tab == 1">
      还没有发布过二手机
    </div>
    <div style="text-align:center;" v-if="favlist.length == 0 && tab == 2">
      还没有收藏
    </div>
    <div class="share-btn" v-if="myself" @click="showTip=true;">分享我的店铺</div>
    <share-guide @closeGuide="closeGuide" :show="showTip"></share-guide>
    <!-- <one-key-share v-if="myself"></one-key-share> -->
    <focus-wechat v-if="!myself"></focus-wechat>
    <info-bottom v-if="!myself" :mobileLink="mobileLink" :item_type="1" :isShowCollect='false'></info-bottom>
  </div>
</template>

<script>
import getUrlKey from '@/utils/getUrlKey.js'
import FocusWechat from "@/components/FocusWechat.vue";
import OneKeyShare from "@/components/OneKeyShare.vue";
import InfoBottom from '@/components/InfoBottom.vue'
import ShareGuide from "@/components/ShareGuide.vue"
import share from '@/utils/share.js'
export default {
  data() {
    return {
      tab: 1,
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
      favlist: [],
      nowPage: 0,
      nowFavPage: 0,
    };
  },
  methods: {
    popularize() {
      this.$vux.toast.show({
        text: "功能开发中，敬请期待",
        type: "text"
      });
    },
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
    loadFavList(){
      let _this = this
      let listPromise = new Promise((resolve,reject)=>{
        _this.axios.get("/api/member-fav/list?type=3&mid="+getUrlKey('mid')+"&page="+_this.nowFavPage).then((listRes)=>{
          resolve(listRes)
        })
      })
      listPromise.then((listRes)=>{
        if(listRes.data.data.length){
          _this.nowFavPage++
          _this.favlist = _this.favlist.concat(listRes.data.data)
        }else{
          _this.$vux.toast.show({
            type: "text",
            text: "没有了"
          });
        }
      })
    },
    loadData(){
      let _this = this
      let listPromise = new Promise((resolve,reject)=>{
        _this.axios.post("/api/used-m/sell-list",_this.qs.stringify({
          mid: getUrlKey('mid'),
          page: _this.nowPage,
        })).then((listRes)=>{
          resolve(listRes)
        })
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
    init(){
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
          share({
            title: storeRes.data.data.nickname + "的最新二手机",
            img: "http://m.gongji58.com/static/imgtest.jpg",
            desc: storeRes.data.data.amount + "台二手机在售",
            link: window.location.href,
          })
        })
        _this.loadData()
        _this.loadFavList()
      })
    },
  },
  components: {
    FocusWechat,
    OneKeyShare,
    InfoBottom,
    ShareGuide
  },
  mounted() {
    this.init()
    //this.loadData()
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
    >a {
      display: block;
      >img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        border: 2px solid #fff;
        margin-right: 0.2rem;
      }
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
          margin-right: 0.2rem;
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
        .uncerti {
          display: flex;
          align-items: center;
          background-color: #313131;
          text-align: center;
          color: #fff;
          font-size: 0.24rem;
          margin-right: 0.16rem;
          border-radius: 2px;
          padding: 0.04rem;
          >a {
            color: @theme-color;
            font-style: normal;
          }
        }
        .certi {
          display: flex;
          align-items: center;
          background-color: #313131;
          color: @theme-color;
          border-radius: 2px;
          font-size: 0.24rem;
          padding: 0.04rem;
        }
      }
      >dd {
        display: flex;
        font-size: 0.28rem;
        height: 0.4rem;
        .add {

        }
      }
    }
  }
  h1 {
    width: 100%;
    height: 0.6rem;
    background-color: #f8f8f8;
    font-size: 0;
    >div {
      width: 50%;
      height: 100%;
      display: inline-block;
      font-size: 0.28rem;
      >span {
        display: block;
        width: 60%;
        height: 100%;
        line-height: 0.68rem;
        margin: 0 auto;
        text-align: center;
        color: #5a5a5a;
      }
      .selected {
        color: @theme-color;
        border-bottom: 1px solid @theme-color;
      }
    }
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
            padding-bottom: 0.1rem;
            >p {
              color: #626262;
            }
            >h5 {
              color: #9f9f9f;
              font-weight: normal;
            }
          }
          .time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.24rem;
            color: #b2b2b2;
            padding-top: 0.16rem;
            padding-right: 0.25rem;
            >strong {
              color: @theme-color;
              font-size: 0.36rem;
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
