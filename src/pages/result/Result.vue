<template>
  <div class="result">
    <img class="icon" src="../../assets/success.png" alt="">
    <div class="content">
      <p>{{resObj.content1}}</p>
      <p>{{resObj.content2}}</p>
    </div>
    <div class="operate">
      <a class="successBtn" :href="resObj.url1">{{resObj.button1}}</a>
      <a class="back" :href="resObj.url2">{{resObj.button2}}</a>
    </div>
  </div>  
</template>

<script>
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data(){
    return {
      resObj: {},
      resMap:{
        report:{
          content1: "感谢您的举报",
          content2: "我们会尽快核实",
          button1: "举报成功",
          button2: "返回首页",
          url1: "../index.html",
          url2: "../index.html",
          title: "举报成功"
        },
        pubinfo:{
          content1: "发布招聘信息成功",
          content2: "我们会尽审核",
          button1: "发布成功",
          button2: "返回首页",
          url1: "../index.html",
          url2: "../index.html",
          title: "发布招聘信息成功"
        },
        pubresume: {
          content1: "简历提交成功",
          content2: "正在跳转至我的简历",
          button1: "点击返回应聘界面",
          button2: "点击查看我的简历",
          url1: "../index.html",
          url2: "../resumepreview/index.html",
          title: "简历提交成功"
        }
      }
    }
  },
  mounted(){
    //this.resObj = this.resMap[getUrlKey('restype')]
    this.resObj = JSON.parse(getUrlKey('restype'))
    document.title = this.resObj.title;
  }
}
</script>

<style lang='less' scoped>
.result{
  text-align: center;
  .content{
    margin-top: 0.54rem;
    margin-bottom: 0.54rem;
    p{
      font-size: 0.3rem;
      color: #535353;
      height: 0.52rem;
    }
  }
  .icon{
    width: 1.65rem;
    margin-top: 1.45rem;
  }
  .operate{
    border-top: 1px solid #000000; 
    a{
      display: block;
      width: 3.2rem;
      height: 0.52rem;
      line-height: 0.52rem;
      text-align: center;
      margin: 0 auto;
      color: white;
      font-size: 0.267rem;
      margin-top: 0.25rem;
    }
    .successBtn{
      background-color: @theme-color; 
    }
    .back{
      background-color: @second-color;
    }
  }
}
</style>
