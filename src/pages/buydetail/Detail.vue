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
      <pre-cell title="设备类型" :content='info.name'></pre-cell>
      <pre-cell title="需求地点" :content='info.addresses'></pre-cell>
    </div>
    <div class="info info3">
      <pre-cell title="工作介绍" :com-style="{'border': 'none'}"></pre-cell>
      <div class="workDetail">{{info.description}}</div>
    </div>
    <one-key-share v-if="nowType.showShare"></one-key-share>
    <focus-wechat v-if="nowType.showFocus"></focus-wechat>
    <free-resume v-if="false"></free-resume>
    <info-bottom v-if="nowType.showInfo" :mobileLink="mobileLink"  :item_id="info.id" :item_type="1" :isShowCollect='true'></info-bottom>
  </div>
</template>

<script>
import PreCell from "../../components/PreCell.vue";
import OneKeyShare from "../../components/OneKeyShare.vue";
import FocusWechat from "../../components/FocusWechat.vue";
import FreeResume from "../../components/FreeResume.vue";
import getUrlKey from '@/utils/getUrlKey.js'
import InfoBottom from '@/components/InfoBottom.vue'
import provinceData from "@/data/prov.json"
import share from '@/utils/share.js'
export default {
  data() {
    return {
      info: {},
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
    PreCell,
    OneKeyShare,
    FocusWechat,
    FreeResume,
    InfoBottom,
  },
  methods: {
    findName(val, mylist) {
      var name = "";
      var valList = val.split(' ');
      mylist[0].forEach((item, index) => {
        if (valList.indexOf(item.value)>-1) {
          name += item.name+' ';
        }
      });
      return name;
    },
  },
  mounted() {
    //todo 地址有问题
    let _this = this
    let mInfoPromise = new Promise((resolve,reject)=>{
      _this.axios.get("/api/used-m/want-detail?id=" + getUrlKey('id')).then(mInfoRes => {
        resolve(mInfoRes)
      })
    })
    let uInfoPromise = new Promise((resolve,reject)=>{
      _this.axios.get("/api/user/my").then(uInfoRes => {
        resolve(uInfoRes)
      })
    })
    
    Promise.all([mInfoPromise,uInfoPromise]).then((res) => {
      let mInfoRes = res[0]
      let uInfoRes = res[1]
      _this.info = mInfoRes.data.data
      _this.info.addresses = _this.findName(mInfoRes.data.data.addresses,provinceData)
      _this.member_id = mInfoRes.data.data.mid
      if(_this.info){
        _this.mobileLink = "/api/used-m/query-want-mobile?item_id=" + _this.info.id
      }
      share({
        title: _this.info.addresses + "求购二手机",
        img: "http://m.gongji58.com/static/imgtest.jpg",
        desc: " / " + _this.info.description,
        link: window.location.href,
      })
      _this.isLogin = uInfoRes.data.data.status & 1
      _this.user_id = uInfoRes.data.data.id
      if(_this.isLogin){
        if(_this.user_id == _this.member_id){
          _this.nowType = _this.typeMap.myInfo
        }else{
          _this.nowType = _this.typeMap.otherInfo
        }
      }else{
        _this.nowType = _this.typeMap.unLogIn
      }
    }).catch((err) => {
      console.log(err)
      _this.nowType = _this.typeMap.otherInfo
    })

    // let minfo = this.axios.get("/api/used-m/want-detail?id=" + getUrlKey('id'))
    // .then(res => {
    //   this.info = res.data.data
    //   this.info.addresses = this.findName(res.data.data.addresses,provinceData)
    //   this.member_id = res.data.data.mid
    //   if(this.info){
    //     this.mobileLink = "/api/used-m/query-want-mobile?item_id=" + this.info.id
    //   }

    //   share({
    //     title: this.info.addresses.join(' ') + "求购二手机",
    //     img: "http://m.gongji58.com/static/imgtest.jpg",
    //     desc: " / " + this.info.description,
    //     link: window.location.href,
    //   })
    // });
    // let uinfo = this.axios.get("/api/user/my")
    // .then((res) => {
    //   this.isLogin = res.data.data.status & 1
    //   this.user_id = res.data.data.id
    // })
    // Promise.all([minfo,uinfo]).then(() => {
    //   if(this.isLogin){
    //     if(this.user_id == this.member_id){
    //       this.nowType = this.typeMap.myInfo
    //     }else{
    //       this.nowType = this.typeMap.otherInfo
    //     }
    //   }else{
    //     this.nowType = this.typeMap.unLogIn
    //   }
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
  height: 100%;
  display: flex;
  flex-direction: column;
  .info {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    background-color: white;
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
</style>
