<template>
  <div id="app">
    <MainHead></MainHead>
    <!-- <top-msg :pubMessage='pubMessage'></top-msg> -->
    <div class="menu">
      <menu-cell :cell-style="{'height': '1.41rem'}" class="menu-cell" @on-cellclick="cellClick(item)" v-for="(item, index) in cellList" :key="index" :menuCell='item'></menu-cell>
    </div>
    <a href="./invitefriends/index.html" class="ad"><img src="./img/ad.jpg" alt=""></a>
    <div class="jiyouquan">
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

    <x-dialog @on-show='initReg' v-model="showReg" :dialog-style="{'background-color': 'transparent', 'width': '87%', 'max-width': '100%'}">
      <div class="regContent">
        <!-- <a href="" class="huangou"><img src="./img/huangou.png" alt=""></a> -->
        <img class="reg_img" src="./img/reg_img.jpg" alt="">
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
            <div class="codeBtn" @click="sendCode" :style="{'background-color': isSending?'#ccc':'white'}">{{checkButtonText}}</div>
          </div>
          <div class="selectLine">
            <select name="" id="" v-model="regInfo.personType">
              <option v-for="(item, index) in whoimList" :key="index" :value="item.value">{{item.key}}</option>
            </select>
          </div>
          <div @click="regByPhone" class="submit">
            提 交
          </div>
        </div>
        <!-- <div class="regTip">注册用户才可体验完整功能哦</div> -->
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
      pubMessage: [
        { content: "邀请好友领大奖，请点击屏幕右下角“我的”，注册后即可参与", link: "/invitefriends/index.html" },
      ],
      cellList: [
        {
          imgSrc: require("./img/zhaojiashi.png"),
          title: "找驾驶员",
          url: "/selectindent/index.html?type=1"
        },
        {
          imgSrc: require("./img/guzhang.png"),
          title: "故障问答",
          url: "https://v.pengxun.cn/f/s-826187?typeId=352705&h=0"
        },
        {
          imgSrc: require("./img/vid.png"),
          title: "精彩视频",
          url: "https://v.pengxun.cn/f/s-826187?typeId=449253&h=0"
        },
        {
          imgSrc: require("./img/code.png"),
          title: "故障代码",
          url: "https://mp.weixin.qq.com/s/Msz5qTU8Q29HPCf1-bqaFA"
        },
        {
          imgSrc: require("./img/light.png"),
          title: "故障灯查询",
          url: "http://mp.weixin.qq.com/s/i_bzD3RzhQk-PxvWQ-8InQ"
        },
       {
          imgSrc: require("./img/ershou.png"),
          title: "二手机",
          //url: "/selectindent/index.html?type=2"
        }
        // { imgSrc: require("./img/maimai.png"), title: "买卖供求" },
        // { imgSrc: require("./img/banche.png"), title: "板车托运" }
      ],
      jiyouList: [
        /*{
          imgSrc: require("./img/video.png"),
          tag: "精彩视频",
          title: "每天更新，最懂机友的挖机视频",
          content: "拥有这样一台挖机就能娶三个老婆"
        },
        {
          imgSrc: require("./img/imgtest.jpg"),
          tag: "机友交流",
          title: "大神们，帮我看下值多少钱，卡特320",
          content: "刚刚在工地包完月，工况非常好，行走有力，油、水温不高"
        },
        {
          imgSrc: require("./img/imgtest.jpg"),
          tag: "机友交流",
          title: "大神们，帮我看下值多少钱，卡特320",
          content: "刚刚在工地包完月，工况非常好，行走有力，油、水温不高"
        }*/
      ],
      pubNotice: false,
      showReg: false,
      whoimList: [
        { key: "请选择自己的身份", value: "" },
        { key: "我是驾驶员", value: 1 },
        { key: "我是机主", value: 2 },
        { key: "我是自己的机子自己开", value: 3 },
        { key: "我是维修商", value: 4 },
        { key: "我是板车运输", value: 5 },
        { key: "我是二手车商", value: 6 },
        { key: "我是配件商", value: 7 },
        { key: "我有工程方找设备", value: 8 },
        { key: "其它", value: 9 }
      ],

      regInfo: {
        phoneNum: "",
        checkNum: "",
        personType: ""
      },
      checkButtonText: "短信验证码",
      sendTime: 60,
      isSending: false,
      timer: ""
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
//      if (item.title == "故障问答") {
      if (item.title == "") {
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
      if (this.isSending) {
        return;
      } else {
        if (this.validatePhone()) {
          this.axios
            .post(
              "/api/default/get_captcha",
              this.qs.stringify({
                mobile: this.regInfo.phoneNum
              })
            )
            .then(res => {
              console.log(res);
              this.$vux.toast.show({
                text: res.data.msg
              });
              if (res.data.code == 200) {
                this.isSending = true;
                var int = setInterval(() => {
                  if (this.sendTime == 0) {
                    clearInterval(int);
                    this.checkButtonText = "发送短信验证码";
                    this.sendTime = 60;
                    this.isSending = false;
                  } else {
                    this.checkButtonText = (this.sendTime--).toString() + "秒后重发";
                  }
                }, 1000);
                this.timer = int;
              }
            });
        } else {
          return;
        }
      }
    },
    regByPhone() {
      if (this.validateRegInfo()) {
        //前端校验完成
        this.axios
          .post(
            "/api/user/bind",
            this.qs.stringify({
              mobile: this.regInfo.phoneNum,
              code: this.regInfo.checkNum,
              type: this.regInfo.personType
            })
          )
          .then(res => {
            console.log(res);
            this.$vux.toast.show({
              text: res.data.msg
            });
            if (res.data.code == 200) {
              this.showReg = false;
              let jumpUrl = res.data.data.url;
              if(jumpUrl){
                window.location.href = jumpUrl;
              }
            }
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
      if (!/^1[3456789]\d{9}$/.test(this.regInfo.phoneNum)) {
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
      if (this.regInfo.personType === "") {
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
    },
    initReg() {
      Object.keys(this.regInfo).forEach((item, index) => {
        this.regInfo[item] = "";
      });
      this.isSending = false;
      clearTimeout(this.timer);
    },
    getArtical() {
      this.axios.post("/api/default/articles").then(res => {
        console.log(res);
        this.jiyouList = res.data.data;
      });
    },
    setCookie() {
      //模拟登录，写入cookie
      //this.cookie.set('auth_cookie', tmp)

      document.cookie =
        "auth_cookie=0e544bfb28838d0cce9280a3b684d60ea7656f3ea2f2fa4a6a4032c119ef98f3a%3A2%3A%7Bi%3A0%3Bs%3A11%3A%22auth_cookie%22%3Bi%3A1%3Bs%3A40%3A%22efb70420a7a4e8899cc60290194f69ce%23%23%2350005%22%3B%7D";

    },
    getAccountInfo() {
      this.axios.get("/api/user/my").then(res => {
        console.log(res);
        //this.showReg = true
        this.showReg = res.data.data.status & 2 ? false : true;
      });
    }
  },
  mounted() {
    //this.setCookie();
    this.getAccountInfo();
    this.getArtical();
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";
.ad{
  height: 1.3rem;
  display: block;
  img{
    width: 100%;
  }
}
#app {
  padding-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
}
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
  //max-height: 55%;
  flex: 1;
  overflow-y: auto;
}

.regContent {
  //width: 5.54rem;
  min-height: 6.96rem;
  padding-bottom: 0.38rem;
  //background: url(./img/reg_bg.jpg) no-repeat center center;
  //background-size: cover;
  //position: relative;
  box-sizing: border-box;
  background-color: #e1e1e1;
  //padding-top: 3.2rem;
  .reg_img{
    width: 100%;
  }
  .info {
    margin-left: 0.31rem;
    margin-right: 0.31rem;
    .label {
      text-align: left;
      font-size: 0.194rem;
      margin-bottom: 0.05rem;
      span {
        color: green;
      }
    }
    .phoneLine {
      height: 1rem;
      border: 1px solid #bfbbab;
      border-radius: 0.05rem;
      background-color: white;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      span {
        display: block;
        width: 1.43rem;
        height: 100%;
        background-color: #f1f1f1;
        text-align: center;
        line-height: 1rem;
        float: left;
      }
      input {
        display: block;
        float: left;
        //width: 2.72rem;
        flex: 1;
        height: 100%;
        padding: 0.2rem;
        font-size: 0.24rem;
        box-sizing: border-box;
        border: none;
      }
    }
    .codeLine {
      margin-top: 0.3rem;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      .codeInput {
        //width: 2.52rem;
        flex: 1;
        float: left;
        border: 1px solid #bfbbab;
        height: 1rem;
        input {
          display: inline-block;
          padding: 0.2rem;
          font-size: 0.24rem;
          box-sizing: border-box;
          border: none;
          width: 100%;
          height: 100%;
        }
      }
      .codeBtn {
        width: 1.35rem;
        margin-left: 0.23rem;
        height: 100%;
        border: 1px solid #bfbbab;
        border-radius: 0.05rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #f1f1f1;
        text-align: center;
        font-size: 0.21rem;
        float: left;
        box-sizing: border-box;
      }
    }
    .selectLine {
      margin-top: 0.3rem;
      height: 1rem;
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
        appearance: none;
        background: url("./img/select.jpg") no-repeat scroll right center transparent;
        background-size: 1.35rem 100%;
        padding: 0.3rem;
        letter-spacing: 0.1rem;
      }
    }
  }
  .submit {
    margin: 0 auto;
    margin-top: 0.38rem;
    height: 0.74rem;
    width: 2.7rem;
    text-align: center;
    line-height: 0.66rem;
    color: white;
    font-size: 0.29rem;
    border-radius: 0.05rem;
    background-color: #b98f5c;
  }
  .regTip{
    background-color: white;
    font-weight: bold;
    color: red;
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
