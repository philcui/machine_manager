<template>
  <div id="app">
    <MainHead></MainHead>
    <!-- <top-msg :pubMessage='pubMessage'></top-msg> -->
    <div class="menu">
      <menu-cell class="menu-cell" @on-cellclick="cellClick(item)" v-for="(item, index) in cellList" :key="index" :menuCell='item'></menu-cell>
    </div>
    <div class="jiyouquan" @click="showReg=true">
      <hdivider class="divider"></hdivider>
      <jiyou-item v-for="(item, index) in jiyouList" :key="index" :itemData='item'></jiyou-item>
    </div>
    <TabBottom :selectedItem='0'></TabBottom>
    
    <x-dialog v-model="pubNotice" :dialog-style="{'background-color': 'transparent', 'width': '87%', 'max-width': '100%'}">
      <div class="noticeDialog">
        <div class="notice-title">
          发布须知
        </div>
        <div class="notice-content">
          你好，请把故障问题描述清楚，<br/> 
          最好配上照片，再发布， <br/>
          有利于维修师傅帮你准确诊断。
        </div>
        <a href="" class="pubbtn">点此发布故障问答</a>
        <div class="notice-tip">
        如果24小时内，你得不到满意答案，请通过工机管家公众号发送故障描述。联系客服帮你解决，谢谢
        </div>
      </div>
      <div @click="pubNotice=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>

    <x-dialog v-model="showReg" :dialog-style="{'background-color': 'transparent', 'width': '87%', 'max-width': '100%'}">
      <div class="regContent">
        <a href="" class="huangou"><img src="./img/huangou.png" alt=""></a>
        <div class="info">
          <p class="label"><span>* </span>手机号码</p>
          <div class="phoneLine">
            <span>+86</span>
            <input type="phone" placeholder="请输入手机号" v-model.trim="regInfo.phoneNum">
          </div>
          <div class="codeLine">
            <div class="codeInput">
              <input type="text" placeholder="请输入验证码" v-model.trim="regInfo.checkNum">
            </div>
            <div class="codeBtn" @click="sendCode">短信验证码</div>
          </div>
          <div class="selectLine">
            <select name="" id="" v-model="regInfo.personType">
              <option v-for="(item, index) in whoimList" :key="index" :value="item.value">{{item.key}}</option>
            </select>
          </div>
          <div @click="regByPhone" class="submit">
            确 定
          </div>
        </div>
      </div>
      <div @click="showReg=false">
        <img class="close" src="../../assets/close.png" alt="">
      </div>
    </x-dialog>
  </div>
</template>

<script>
//底部tab
import TabBottom from "@/components/TabBottom.vue";
//头部
import MainHead from "@/components/MainHead.vue";
//菜单单元格
import MenuCell from "@/components/MenuCell.vue";
//新闻列表元素
import JiyouItem from "@/components/JiyouItem.vue";
//分隔标题
import Hdivider from "@/components/Hdivider.vue";
//顶部滚动播报
import TopMsg from "@/components/TopMsg.vue";

import { XDialog } from "vux";
export default {
  name: "app",
  data() {
    return {
      // pubMessage: [
      //   { content: "最新卡特挖掘机性能介绍，必看！" },
      //   { content: "最新卡特挖掘机性能介绍，必看！" },
      //   { content: "最新卡特挖掘机性能介绍，必看！" }
      // ],
      cellList: [
        {
          imgSrc: require("./img/zhaojiashi.png"),
          title: "找驾驶员",
          url: "./finddriver/index.html"
        },
        { imgSrc: require("./img/guzhang.png"), title: "故障问答" },
        { imgSrc: require("./img/ershou.png"), title: "二手机" },
        { imgSrc: require("./img/qiuzu.png"), title: "设备求租" },
        { imgSrc: require("./img/maimai.png"), title: "买卖供求" },
        { imgSrc: require("./img/banche.png"), title: "板车托运" }
      ],
      jiyouList: [
        {
          imgSrc: require("./img/video.png"),
          tag: "精彩视频",
          title: "每天更新，最懂机友的挖机视频",
          text: "拥有这样一台挖机就能娶三个老婆"
        },
        {
          imgSrc: require("./img/imgtest.jpg"),
          tag: "机友交流",
          title: "大神们，帮我看下值多少钱，卡特320",
          text: "刚刚在工地包完月，工况非常好，行走有力，油、水温不高"
        },
        {
          imgSrc: require("./img/imgtest.jpg"),
          tag: "机友交流",
          title: "大神们，帮我看下值多少钱，卡特320",
          text: "刚刚在工地包完月，工况非常好，行走有力，油、水温不高"
        }
      ],
      pubNotice: false,
      showReg: false,
      whoimList: [
        { key: "请选择自己的身份", value: "" },
        { key: "我是驾驶员", value: 0 },
        { key: "我是机主", value: 1 },
        { key: "我是自己的机子自己开", value: 2 },
        { key: "我是维修商", value: 3 },
        { key: "我是板车运输", value: 4 },
        { key: "我是二手车商", value: 5 },
        { key: "我是配件商", value: 6 },
        { key: "我有工程方找设备", value: 7 },
        { key: "其它", value: 8 }
      ],

      regInfo: {
        phoneNum: "",
        checkNum: "",
        personType: ""
      }
    };
  },
  components: {
    TabBottom,
    MainHead,
    MenuCell,
    JiyouItem,
    Hdivider,
    TopMsg,
    XDialog
  },
  methods: {
    cellClick(item) {
      if (item.title == "故障问答") {
        this.pubNotice = true;
      } else if (!item.url) {
        this.$vux.toast.show({
          text: "敬请期待",
          type: "text"
        });
      } else {
        window.location.href = item.url;
      }
    },
    sendCode() {
      if (this.validatePhone()) {
        this.axios
          .post("sendCode/", {
            phoneNum: this.regInfo.phoneNum
          })
          .then(() => {});
      } else {
        return;
      }
    },
    regByPhone() {
      if (this.validateRegInfo()) {
        //前端校验完成
        this.axios
          .post("submit/", {
            regInfo: this.regInfo
          })
          .then(() => {
            this.showReg = false;
          });
      } else {
        //前端校验不通过
        return;
      }
    },
    validatePhone() {
      if (this.regInfo.phoneNum == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("001"),
          type: "text"
        });
        return false;
      }
      if (!/^1[34578]\d{9}$/.test(this.regInfo.phoneNum)) {
        this.$vux.toast.show({
          text: this.getErrorInfo("003"),
          type: "text"
        });
        return false;
      }

      return true;
    },
    validateRegInfo() {
      if (!this.validatePhone()) {
        return false;
      }
      if (this.regInfo.checkNum == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("002"),
          type: "text"
        });
        return false;
      }
      if (this.regInfo.personType == "") {
        this.$vux.toast.show({
          text: this.getErrorInfo("005"),
          type: "text"
        });
        return false;
      }

      return true;
    },
    getErrorInfo(key) {
      var infoMap = {
        "001": "请填写电话号码",
        "002": "请填写验证码",
        "003": "请填写正确格式的电话号码",
        "004": "请填写正确的验证码",
        "005": "请选择身份"
      };
      return infoMap[key];
    }
  },
  mounted() {
    window.myc = this.cookie
    this.cookie.set('test', 'cookie123')
    console.log(this.cookie.get('test'))
    this.cookie.delete('test')
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
.menu {
  background-color: #fff;
  margin-top: 0.12rem;
  overflow: hidden;
  .menu-cell {
    width: 33.333%;
  }
}
.jiyouquan {
  margin-top: 0.12rem;
  background-color: #fff;
  padding-top: 0.33rem;
  max-height: 55%;
  overflow-y: auto;
}

.regContent {
  //width: 5.54rem;
  height: 6.46rem;
  background: url(./img/reg_bg.jpg) no-repeat center center;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  padding-top: 2.94rem;
  .huangou {
    position: absolute;
    top: 1.97rem;
    right: 0;
    img {
      height: 0.34rem;
    }
  }
  .info {
    margin-left: 0.68rem;
    margin-right: 0.68rem;
    .label {
      text-align: left;
      font-size: 0.194rem;
      margin-bottom: 0.05rem;
      span {
        color: green;
      }
    }
    .phoneLine {
      height: 0.68rem;
      border: 1px solid #bfbbab;
      border-radius: 0.05rem;
      background-color: white;
      box-sizing: border-box;
      overflow: hidden;
      span {
        display: block;
        width: 1.43rem;
        height: 100%;
        background-color: #f1f1f1;
        text-align: center;
        line-height: 0.68rem;
        float: left;
      }
      input {
        display: block;
        float: left;
        width: 2.72rem;
        padding: 0.2rem;
        font-size: 0.24rem;
        box-sizing: border-box;
        border: none;
      }
    }
    .codeLine {
      margin-top: 0.18rem;
      box-sizing: border-box;
      overflow: hidden;
      .codeInput {
        width: 2.52rem;
        float: left;
        border: 1px solid #bfbbab;
        height: 0.68rem;
        input {
          display: inline-block;
          padding: 0.2rem;
          font-size: 0.24rem;
          box-sizing: border-box;
          border: none;
          width: 2.52rem;
          height: 100%;
        }
      }
      .codeBtn {
        width: 1.38rem;
        margin-left: 0.23rem;
        height: 100%;
        border: 1px solid #bfbbab;
        border-radius: 0.05rem;
        height: 0.68rem;
        line-height: 0.68rem;
        background-color: #f1f1f1;
        text-align: center;
        font-size: 0.21rem;
        float: left;
        box-sizing: border-box;
      }
    }
    .selectLine {
      margin-top: 0.18rem;
      height: 0.55rem;
      border: 1px solid #bfbbab;
      border-radius: 0.05rem;
      background-color: white;
      box-sizing: border-box;
      select {
        display: inline-block;
        font-size: 0.24rem;
        box-sizing: border-box;
        border: none;
        height: 100%;
        width: 100%;
      }
    }
  }
  .submit {
    margin: 0.1rem auto;
    height: 0.66rem;
    width: 3.45rem;
    text-align: center;
    line-height: 0.66rem;
    color: white;
    font-size: 0.29rem;
    border-radius: 0.05rem;
    background-color: @theme-color;
  }
}
.close {
  margin-top: 0.88rem;
  width: 0.6rem;
}
.noticeDialog {
  height: 5.56rem;
  background-color: white;
  .notice-title {
    height: 1.15rem;
    line-height: 1.15rem;
    font-size: 0.4rem;
    color: #313131;
    border-bottom: 1px solid @divid-color;
  }
  .notice-content {
    font-size: 0.24rem;
    color: @theme-color;
    margin-top: 0.36rem;
  }
  .pubbtn {
    display: inline-block;
    height: 0.58rem;
    width: 3.2rem;
    text-align: center;
    line-height: 0.58rem;
    color: white;
    font-size: 0.266rem;
    border-radius: 0.05rem;
    background-color: @theme-color;
    margin-top: 0.36rem;
    margin-bottom: 0.36rem;
  }
  .notice-tip {
    border-top: 1px solid @divid-color;
    font-size: 0.213rem;
    color: #535353;
    padding: 0.26rem 0.36rem;
  }
}
</style>
