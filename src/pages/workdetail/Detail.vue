<template>
  <div class="detail">
    <div class="info info1">
      <!-- <img class="avatar" src="../../assets/avatar.png" alt=""> -->
      <div class="report">
        如遇虚假信息，请<a href="../report/index.html">点此举报</a>
      </div>
      <div class="right">
        <!-- <p class="name">{{info.realname}}</p> -->
        {{info.ctime}}
      </div>
    </div>
    <div class="info info2">
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
    <one-key-share v-if="type == 1"></one-key-share>
    <focus-wechat v-if="type == 0"></focus-wechat>
    <free-resume v-if="false"></free-resume>
    <info-bottom v-if="type == 1" :mobile="info.mobile"  :item_id="info.id" :item_type="1" :isShowCollect='true'></info-bottom>
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
//import share from '@/utils/share.js'
export default {
  data() {
    return {
      info: {},
      type: 0,
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
    this.axios.post("/api/job/detail", this.qs.stringify({id: getUrlKey('id')}))
    .then(res => {
      this.info = res.data.data
      if(this.info){
        this.info.car_type = getName(car_type[0], this.info.car_type_id);
        this.info.operating_mode = getName(mode_type[0], this.info.mode);
        this.info.benefit = getName(benefit[0], this.info.benefit)
      }
      console.log(res);
    });
    this.axios.get("/api/user/my")
    .then((res) => {
      console.log(res)
      this.type = res.data.data.status & 1 
    })
  }
};
</script>

<style lang='less' scoped>
.detail {
  background-color: #eeeeee;
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
      font-size: 0.2rem;
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
