import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
var qs = require('qs')
//前台调试用微信配置
//import wxConfig from "@/data/wxConfig.json";

function setWxConfig(res, conf) {
  wx.config({
    appId: res.appId, // 必填，公众号的唯一标识
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.nonceStr, // 必填，生成签名的随机串
    signature: res.signature, // 必填，签名
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
  });
  wx.ready(() => {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: conf.title, // 分享标题
      link: conf.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: conf.img // 分享图标
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: conf.title, // 分享标题
      desc: conf.desc, // 分享描述
      link: conf.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: conf.img // 分享图标
    });

  });
}

export default function (conf) {
  axios.get('/wechat/jssdk/index?url=' + encodeURIComponent(location.href.split('#')[0]))
    .then((res) => {
      console.log(res)
      setWxConfig(res, conf)
    })
}