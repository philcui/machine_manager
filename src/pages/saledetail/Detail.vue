<template>
  <div class="detail">
    <div class="info info1">
      <!-- <img class="avatar" src="../../assets/avatar.png" alt=""> -->
      <a :href="'../report/index.html?type=1&id=' + info.id" class="report">
        <img src="./img/jubao.png" alt="">
      </a>
      <div class="right">
        {{moment(info.utime).format("YYYY-MM-DD HH:MM")}}
      </div>
    </div>
    <div class="info info2">
      <pre-cell title="设备类型" :content='brandName'></pre-cell>
      <pre-cell title="出厂日期" :content='info.production_date'></pre-cell>
      <pre-cell title="价格" :content='info.price'></pre-cell>
      <pre-cell title="设备位置" :content='info.address'></pre-cell>
    </div>
    <div class="info info2">
      <pre-cell title="详细介绍" :com-style="{'border': 'none'}"></pre-cell>
      <div class="dec-btn" @click="decShow=true;">免责声明</div>
      <div class="workDetail">{{info.description}}</div>
    </div>
    <a @click="shareTip" class="shareButton" v-if="nowType.showShare">立即分享</a>
    <div class="info" :style="{'marginTop': '0.18rem'}">
      <h3>设备照片</h3>
      <div class="img-list">
        <img v-for="(item,index) in info.imgs" :key="index" :src="item" />
      </div>
    </div>
    <a class="my-store" :href="gethref()">
      <img src="./img/store.png" />
      <dl>
        <dd>{{store.nickname}}</dd>
        <dd>在售：{{store.amount}}台</dd>
        <dd>地址：{{store.address}}</dd>
      </dl>
      <span>更多>></span>
    </a>
    <declaration @on-hideclick="tabShow" @on-tipclick="tabTip" :tip="tip" :dec-show="decShow" :no-decla="noDecla"></declaration>
    <one-key-share v-if="nowType.showShare" :p-style="{'position':'static'}"></one-key-share>
    <focus-wechat v-if="nowType.showFocus"></focus-wechat>
    <free-resume v-if="false"></free-resume>
    <info-bottom v-if="nowType.showInfo" :mobileLink="mobileLink"  :item_id="info.id" :item_type="1" :isShowCollect='true'></info-bottom>
    <share-guide @closeGuide="closeGuide" :show="showTip"></share-guide>
  </div>
</template>

<script>
import Declaration from "../../components/Declaration.vue";
import PreCell from "../../components/PreCell.vue";
import OneKeyShare from "../../components/OneKeyShare.vue";
import FocusWechat from "../../components/FocusWechat.vue";
import FreeResume from "../../components/FreeResume.vue";
import getUrlKey from '@/utils/getUrlKey.js'
import InfoBottom from '@/components/InfoBottom.vue'
import car_type from "@/data/car_type.json"
import mode_type from "@/data/mode_type.json"
import getName from "@/utils/getName.js"
import share from '@/utils/share.js'
import ShareGuide from "@/components/ShareGuide.vue"
export default {
  data() {
    return {
      tip: false,
      decShow: true,
      noDecla: false,
      showTip: false,
      info: { 
        production_date: '',
        price: '',
        address: '',
        imgs: []
      },
      store: {
        address: '',
        amount: 0,
        nickname: '',
      },
      brandName: '',
      isLogin: false,
      typeMap: {
        unLogIn:{
          showShare: false,
          showFocus: true,
          showInfo: true,
        },
        myInfo: {
          showShare: true,
          showFocus: false,
          showInfo: false,
        },
        otherInfo :{
          showShare: false,
          showFocus: true,
          showInfo: true,
        },
      },
      nowType: {
        showShare: false,
        showFocus: false,
        showInfo: false,
      },
      user_id: "",
      member_id: "",
      mobileLink: "",
    };
  },
  components: {
    Declaration,
    ShareGuide,
    PreCell,
    OneKeyShare,
    FocusWechat,
    FreeResume,
    InfoBottom,
  },
  methods: {
    shareTip(){
      this.showTip = true
    },
    closeGuide(){
      this.showTip = false;
    },
    gethref(){
      return "../mystore/index.html?mid=" + this.member_id
    },
    tabShow(){
      this.decShow = false
      if (this.tip) {
        localStorage.setItem("noDecla", true)
        this.noDecla = true
      }
    },
    tabTip(){
      this.tip = !this.tip
    }
  },
  mounted() {
    if (localStorage.getItem("noDecla")) {
      console.log(1111)
      this.noDecla = true
      this.decShow = false
    }

    let minfo = this.axios.get("/api/used-m/sell-detail?id=" + getUrlKey('id'))
    .then(res => {
      console.log(res)
      this.info = res.data.data
      this.member_id = res.data.data.mid
      this.brandName = res.data.data.brand+res.data.data.model
      this.info.price = res.data.data.price+'万'
      this.info.production_date = res.data.data.production_date+'年'
      // this.info.imgs = this.info.imgs.map((item,i)=>{
      //   return 'http://'+item
      // })
      if(this.info){
        this.mobileLink = "/api/used-m/query-sell-mobile?item_id=" + this.info.id
      }
      share({
        title: this.info.address + "转卖二手机",
        img: "http://m.gongji58.com/static/imgtest.jpg",
        desc: " / " + this.info.description,
        link: window.location.href,
      })
      let uinfo = this.axios.get("/api/user/my")
      .then((res) => {
        this.isLogin = res.data.data.status & 1
        this.user_id = res.data.data.id
        this.axios.get("/api/used-m/member-store?mid="+this.info.mid)
        .then(res => {
          this.store = res.data.data
          if(this.isLogin){
            if(this.user_id == this.member_id){
              this.nowType = this.typeMap.myInfo
            }else{
              this.nowType = this.typeMap.otherInfo
            }
          }else{
            this.nowType = this.typeMap.unLogIn
          }
        })
      })
    });

    // Promise.all([minfo,uinfo]).then(() => {
      
    // })
    // .catch((err) => {
    //   this.nowType = this.typeMap.otherInfo
    // })
  }
};
</script>

<style lang='less' scoped>
.detail {
  background-color: white;
  // height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.4rem;
  .info {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    background-color: white;
    h3 {
      line-height: 0.3413rem;
      border-left: 4px solid @theme-color;
      color: #000;
      font-size: 1em;
      padding-left: 12px;
    }
    .img-list {
      width: 100%;
      >img {
        width: 100%;
        margin-top: 0.2rem;
      }
    }
  }
  .info1 {
    display: flex;
    align-items: center;
    position: relative;
    height: 0.6rem;
    justify-content: space-between;
    margin-top: 0.1rem;
    a{
      height: 0.37rem;
    }
    .report {
      img{
        height: 0.42rem;
      }
    }
    .avatar {
      width: 0.82rem;
      margin-right: 0.22rem;
    }
    .right {
      color: #a0a0a0;
      font-size: 0.21rem;
    }
  }
  .info2 {
    position: relative;
    .dec-btn {
      position: absolute;
      right: 0.25rem;
      top: 0.1rem;
      width: 1.2rem;
      line-height: 0.32rem;
      text-align: center;
      font-size: 0.24rem;
      color: #fff;
      background-color: @theme-color;
    }
  }
  .info3 {
    //margin-top: 0.18rem;
    flex: 1;
    .workDetail {
      font-size: 0.24rem;
      color: #535353;
      padding-top: 0.1rem;
    }
  }
}
.shareButton{
  display: inline-block;
  height: 0.84rem;
  width: 4.66rem;
  text-align: center;
  line-height: 0.84rem;
  color: white;
  font-size: 0.32rem;
  border-radius: 0.05rem;
  background-color: @theme-color;
  margin: 0.2rem auto;
}
.my-store {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.7rem;
  background-color: #efefef;
  padding: 0 0.25rem;
  box-sizing: border-box;
  margin: 0.2rem 0;
  >img {
    width: 1.47rem;
    margin-right: 0.3rem;
  }
  >dl {
    flex: 1;
    font-size: 0.26rem;
    color: #000;  
    >dd {

    }
  }
  >span {
    font-size: 0.24rem;
    color: #999;
  }
}
</style>
