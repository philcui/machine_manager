import wx from 'weixin-js-sdk'
import axios from '@/utils/http.js'
var qs = require('qs')
//前台调试用微信配置
//import wxConfig from "@/data/wxConfig.json";

function setWxConfig(res) {
  console.info(res);
  // console.info(conf);
  wx.config({
    appId: res.appId, // 必填，公众号的唯一标识
    timestamp: res.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.nonceStr, // 必填，生成签名的随机串
    signature: res.signature, // 必填，签名
    jsApiList: [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      'chooseImage',
      'uploadImage',
    ]
  });
}

function setWxReadyHandle(obj){

  wx.ready( function(){
    console.log("-----------START-------------");
    //console.log(obj);

    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        //$(obj).attr('src', localIds);
        alert(localIds);

        for (var i = 0; i < localIds.length; i++) {

          var localId = localIds[i];

          alert(localId);
          console.log("localId: " + localId);

          // 上传照片
          setTimeout('', 100);
          wx.uploadImage({
            localId: '' + localId,
            isShowProgressTips: 1,
            success: function (res) {
              var serverId = res.serverId;
              //$(obj).next().val(serverId); // 把上传成功后获取的值附上

              axios.get('/wechat/jssdk/index?url=' + serverId.toString());
              alert("serverId: " + serverId);


              console.log(serverId);

            }
          });

        }

      }
    });

  });
}

export default function (obj) {
  console.log(obj);
  axios.get('/wechat/jssdk/index?url=' + encodeURIComponent(location.href.split('#')[0]))
    .then((res) => {
      console.log(res.data.data);
      setWxConfig(res.data.data);
      setWxReadyHandle(obj);

    })
}
