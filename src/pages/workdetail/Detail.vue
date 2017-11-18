<template>
  <div class="detail">
    <div class="info info1">
      <img class="avatar" src="../../assets/avatar.png" alt="">
      <div class="right">
        <p class="name">{{info.realname}}</p>
        <p class="time">{{info.ctime}}</p>
      </div>
      <div class="report">
        如遇虚假信息，请<a href="../report/index.html">立即举报</a>
      </div>
    </div>
    <div class="info info2">
      <pre-cell title="月薪" :content='info.base_salary'></pre-cell>
      <pre-cell title="设备类型" :content='info.car_type'></pre-cell>
      <pre-cell title="工作地点" :content='info.address'></pre-cell>
    </div>
    <div class="info info3">
      <pre-cell title="操作方向" :content='info.operating_mode'></pre-cell>
      <pre-cell title="吃住" :content='info.benefit'></pre-cell>
      <pre-cell title="工作内容" :content='info.skills'></pre-cell>  
      <div class="workDetail">{{info.description}}</div>
    </div>
    <one-key-share v-if="false"></one-key-share>
    <focus-wechat v-if="false"></focus-wechat>
    <free-resume></free-resume>
  </div>  
</template>

<script>
import PreCell from "../../components/PreCell.vue";
import OneKeyShare from "../../components/OneKeyShare.vue";
import FocusWechat from "../../components/FocusWechat.vue";
import FreeResume from "../../components/FreeResume.vue";
import getUrlKey from '@/utils/getUrlKey.js'
//import share from '@/utils/share.js'
export default {
  data() {
    return {
      info: {},
    };
  },
  components: {
    PreCell,
    OneKeyShare,
    FocusWechat,
    FreeResume
  },
  mounted() {
    this.axios.post("/api/job/detail", this.qs.stringify({id: getUrlKey('id')}))
    .then(res => {
      this.info = res.data.data
      console.log(res);
    });
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
    background-color: white;
  }
  .info1 {
    height: 1.3rem;
    display: flex;
    align-items: center;
    position: relative;
    .report {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      color: #686868;
      font-size: 0.2rem;
      a {
        color: @theme-color;
      }
    }
    .avatar {
      width: 0.82rem;
      margin-right: 0.22rem;
    }
    .right {
      height: 0.82rem;
      p {
        line-height: 0.4rem;
      }
      .name {
        color: #626262;
        font-size: 0.24rem;
      }
      .time {
        color: #a0a0a0;
        font-size: 0.21rem;
      }
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
