<template>
  <div class="detail">
    <div class="info info1">
      <img class="avatar" src="../../assets/avatar.png" alt="">
      <div class="right">
        <p class="name">李峰</p>
        <p class="time">2018-04-29 09:00</p>
      </div>
      <div class="report">
        如遇虚假信息，请<a href="../report/index.html">立即举报</a>
      </div>
    </div>
    <div class="info info2">
      <pre-cell v-for="(item, index) in cellList1" :key="index" :title="item.title" :content='item.content'></pre-cell>
    </div>
    <div class="info info3">
      <pre-cell v-for="(item, index) in cellList2" :key="index" :title="item.title" :content='item.content'></pre-cell>
      <div class="workDetail">
        工资月结，想干的尽快联系我
      </div>
    </div>
  </div>  
</template>

<script>
import PreCell from "../../components/PreCell.vue";
export default {
  data() {
    return {
      cellList1: [
        { title: "月薪", content: "6000元" },
        { title: "设备类型", content: "大挖" },
        { title: "干活地点", content: "杭州市文三路100号创意大厦" },
        { title: "工作内容", content: "挖坑、破碎" }
      ],
      cellList2: [
        { title: "操作方向", content: "反手" },
        { title: "福利", content: "包吃包住" },
        { title: "月薪", content: "6000元" },
        { title: "工作内容", content: "" }
      ]
    };
  },
  components: {
    PreCell
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
    .report{
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      color: #686868;
      font-size: 0.2rem;
      a{
        color: @theme-color;
      }
    }
    .avatar{
      width: 0.82rem;
      margin-right: 0.22rem;
    }
    .right{
      height: 0.82rem;
      p{
        line-height: 0.40rem;
      }
      .name{
        color: #626262;
        font-size: 0.24rem;
      }
      .time{
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
    .workDetail{
      font-size: 0.24rem;
      color: #535353;
      padding-top: 0.2rem;
    }
  }
}
</style>
