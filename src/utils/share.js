import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
var qs = require('qs')
//前台调试用微信配置
import wxConfig from "@/data/wxConfig.json";

export default function () {
  axios.get('/api/wechat/jssdk/index', qs.stringify({'url': 'http://kucubai.mynatapp.cc'}))
  .then((res) => {
    console.log(res)
  })
  var res = wxConfig.data;
  wx.config({
    appId: res.appId, // 必填，公众号的唯一标识
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.nonceStr, // 必填，生成签名的随机串
    signature: res.signature, // 必填，签名，见附录1
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
  });

  wx.ready(() => {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: '', // 分享标题
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '' // 分享图标
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: 'fdfdf', // 分享标题
      desc: 'fdfdfdf', // 分享描述
      link: 'www.baidu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '' // 分享图标
    });

  });
}