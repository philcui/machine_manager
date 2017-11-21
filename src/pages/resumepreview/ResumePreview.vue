<template>
  <div class="resPre">
    <div class="head">
      <img class="avatar" :src="info.image || './img/avatar_gj.jpg'" alt="">
      <div class="right">
        <div class="line1">
          <div class="name">{{info.realname}}</div>
          <div class="renzheng">
            <img src="./img/id_card.png" alt="">
            <div>身份已认证</div>
          </div>
          <div class="renzheng">
            <img src="./img/opreate_card.png" alt="">
            <div>有操作证</div>
          </div>
        </div>
        <div class="line2">{{info.address}}</div>
      </div>
      <img class="up_right" src="./img/up_right.png" alt="">
      <img class="down_right" src="./img/down_right.png" alt="">
      <div class="getOpCard">办操作证？</div>
    </div>
    <div class="jianjie">
      <p class="content_title">
        <img src="./img/icon_person.png" alt="">个人简介
      </p>
      <div class="list">
        <p class="item">
          <span class="title">机型</span> :
          <span class="text">{{getName(car_type[0], info.car_type_id)}}</span>
        </p>
        <p class="item">
          <span class="title">驾龄</span> :
          <span class="text">{{getName(working_age[0], info.working_age)}}</span>
        </p>
        <p class="item">
          <span class="title">地区偏好</span> :
          <span class="text">{{getName(location[0], info.location)}}</span>
        </p>
        <p class="item">
          <span class="title">操作方向</span> :
          <span class="text">{{getName(mode_type[0], info.mode)}}</span>
        </p>
        <p class="item">
          <span class="title">工作技能</span> :
          <span class="text">{{info.skills}}</span>
        </p>
        <p class="item">
          <span class="title">期望薪资</span> :
          <span class="text">{{getName(salary[0], "[" + info.base_salary + ',' + info.max_salary + "]")}}</span>
        </p>
      </div>
    </div>
    <div class="jieshao">
      <p class="content_title">
        <img src="./img/icon_detail.png" alt="">个人介绍
      </p>
      <p class="jieshao_info">{{info.description}}</p>
    </div>
    <info-bottom></info-bottom>
  </div>  
</template>

<script>
import InfoBottom from '@/components/InfoBottom.vue'
import car_type from "@/data/car_type.json"
import mode_type from "@/data/mode_type.json"
import salary from "@/data/salary.json"
import working_age from "@/data/working_age.json"
import location from "@/data/location.json"
import getName from "@/utils/getName.js"
export default {
  data() {
    return {
      info: {},
      mode_type: mode_type,
      car_type: car_type,
      working_age: working_age,
      salary: salary,
      location: location,
    };
  },
  components:{
    InfoBottom
  },
  methods: {
    getName: getName
  },
  mounted(){
    this.axios.post("/api/resume/detail")
    .then((res) => {
      console.log(res)
      this.info  = res.data.data
    })
  },
};
</script>

<style lang='less' scoped>
.resPre {
  .head {
    height: 2.15rem;
    width: 100%;
    background-color: @theme-color;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .avatar {
      width: 1.54rem;
      display: block;
      float: left;
      margin-left: 0.47rem;
      margin-top: 0.37rem;
    }
    .right{
      float: left;
      margin-left: 0.47rem;
      margin-top: 0.37rem;
      color: white;
      .line1{
        display: block;
        height: 0.32rem;
        line-height: 0.32rem;
        img{
          width: 0.49rem;
        }
        .name{
          float: left;
          font-size: 0.36rem;
        }
        .renzheng{
          float: left;
          text-align: center;
          font-size: 0.133rem;
          margin-left: 0.28rem;
        }
      }
    }
    .down_right{
      position: absolute;
      bottom: 0.4rem;
      right: 0.38rem;
      width: 0.3rem;  
    }
    .up_right{
      position: absolute;
      top: 0.32rem;
      right: 0.38rem;
      width: 0.3rem;
    }
    .getOpCard{
      position: absolute;
      color: white;
      text-align: center;
      background-color: #81511c;
      font-size: 0.14rem;
      border-radius: 0.05rem;
      bottom: 0.62rem;
      right: 1.03rem;
      width: 0.86rem;
      height: 0.23rem;
      line-height: 0.23rem;
    }
  }
  .jianjie{
    background-color: white;
    padding-left: 0.2rem;
    img{
      width: 0.36rem;
    }
    .title{
      text-align: justify;
      text-align-last: justify;
      min-width: 1.35rem;
      display: inline-block;
    }
    .list{
      padding: 0.18rem;
    }
    .item{
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.24rem;
    }
  }
  .jieshao{
    margin-top: 0.1rem;
    background-color: white;
    padding-left: 0.2rem;
    img{
      width: 0.28rem;
    }
    .jieshao_info{
      padding: 0.18rem;
      font-size: 0.24rem;
    }
  }
  .content_title{
    height: 0.69rem;
    line-height: 0.69rem;
    border-bottom: 1px solid #e4e4e4;
    font-size: 0.3rem;
    color: @theme-color;
    img{
      vertical-align: middle;
      margin-right: 0.1rem;
    }
  }
}
</style>
