<template>
  <div class="detail">
    <div class="info info1">
      <!-- <img class="avatar" src="../../assets/avatar.png" alt=""> -->
      <div class="report">
        如遇虚假信息，请<a :href="'../report/index.html?type=1&id=' + info.id">点此举报</a>
      </div>
     <!-- <div class="right">
        <p class="name">{{info.realname}}</p>
        {{info.ctime}}
      </div> -->
    </div>
    <div class="info info2">
      <pre-cell title="发布时间" :content='info.utime'></pre-cell>
      <pre-cell title="月薪" :content='info.salary'></pre-cell>
      <pre-cell title="设备类型" :content='info.car_type'></pre-cell>
      <pre-cell title="工作地点" :content='info.address'></pre-cell>
    </div>
    <div class="info info3">
      <pre-cell title="操作方向" :content='info.operating_mode'></pre-cell>
      <pre-cell title="吃住" :content='info.benefit'></pre-cell>
      <pre-cell title="工作内容" :content='info.skills'></pre-cell>
      <pre-cell title="工作介绍"></pre-cell>
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
import car_type from "@/data/car_type.json"
import mode_type from "@/data/mode_type.json"
import benefit from "@/data/benefit.json"
import getName from "@/utils/getName.js"
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
      salary : "",
    };
  },
  components: {
    PreCell,
    OneKeyShare,
    FocusWechat,
    FreeResume,
    InfoBottom,
  },
  mounted() {
    //todo 地址有问题

    let minfo = this.axios.get("/api/job/detail?id=" + getUrlKey('id'))
    .then(res => {
      console.log(res)
      this.info = res.data.data
      this.member_id = res.data.data.mid
      if(this.info){
        this.info.car_type = getName(car_type[0], this.info.car_type_id);
        this.info.operating_mode = getName(mode_type[0], this.info.mode);
        this.info.benefit = getName(benefit[0], this.info.benefit)
        this.mobileLink = "/api/job/query-mobile?item_id=" + this.info.id
        this.salary = (this.info.salary != "面议" && this.info.salary) ? (this.info.salary + "元") : "面议";
      }

      share({
        title: this.info.address + "招聘驾驶员",
        img: "http://m.gongji58.com/static/imgtest.jpg",
        desc: this.salary + " / " + this.info.description,
        link: window.location.href,
      })
    });
    let uinfo = this.axios.get("/api/user/my")
    .then((res) => {
      console.log(res)
      this.isLogin = res.data.data.status & 1
      this.user_id = res.data.data.id
    })

    Promise.all([minfo,uinfo]).then(() => {
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
    .catch((err) => {
      this.nowType = this.typeMap.otherInfo
    })
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
    .report {
      color: #686868;
      font-size: 0.3rem;
      a {
        color: red;
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
    margin-top: 0.18rem;
    flex: 1;
    .workDetail {
      font-size: 0.24rem;
      color: #535353;
      padding-top: 0.2rem;
    }
  }
}
</style>
