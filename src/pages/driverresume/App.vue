<template>
  <div id="app">
    <group gutter='0'>
      <div class="info">
        <img class="tx" :src="myresume.avatar" alt="">
        <div class="text">
          <div class="name">{{myresume.nickname}}</div>
          <div class="short">{{findKey(myresume.car_type_id, carType[0])}} | {{findKey(myresume.address_id, prov[0])}} | {{findKey(myresume.working_age, workingAge[0])}}</div>
        </div>
      </div>
    </group>
    <group>
      <x-switch title="是否公开" :value-map="[0, 1]" v-model="isPublic" :inline-desc="getSwitchResult()" @on-change='switchResumePublic'></x-switch>
      <cell title="查看简历" is-link @click.native="gotoPreview('../resumepreview/index.html')"></cell>
      <cell title="刷新简历" is-link @click.native="refreshResume"></cell>
      <cell title="修改简历" is-link @click.native="goto('../pubresume/index.html')"></cell>
    </group>
  </div>
</template>

<script>
import { Group, XSwitch, Cell } from "vux";
import prov from "@/data/prov.json";
import carType from "@/data/car_type.json";
import workingAge from "@/data/working_age.json";
export default {
  data() {
    return {
      myresume: {},
      carType: carType,
      workingAge: workingAge,
      prov: prov,
      isPublic: 0,
      resumeId : 0,
    };
  },
  methods: {

    findKey(val, list) {
      let name = "待完善";
      list.forEach(element => {
        if (element.value == val) {
          name = element.name;
          return;
        }
      });
      return name;
    },
    switchResumePublic(currentVal) {
      if(this.resumeId) {
        this.axios.post("/api/resume/update", this.qs.stringify({is_public: currentVal}))
          .then(res => {
            console.log(res);
          });
      }else{
        this.$vux.toast.show({
          text: "您还没有创建过简历",
          type: "text"
        });
      }
    },
    getSwitchResult() {
      return this.isPublic ? "已公开" : "已关闭";
    },
    gotoPreview(link){
      if(this.resumeId && this.resumeId > 0) {
        window.location.href = link + "?id=" + this.resumeId
      }else{
        this.$vux.toast.show({
          text: "您还没有创建过简历",
          type: "text"
        });
      }
    },
    goto(link){
        window.location.href = link
    },
    refreshResume(){
      if(this.resumeId) {
        this.axios.post("/api/resume/update")
          .then((res) => {
            console.log(res)
            this.$vux.toast.show({
              text: "刷新成功",
              type: "success"
            });
          })
      }else {
        this.$vux.toast.show({
          text: "您还没有创建过简历",
          type: "text"
        });
      }
    }
  },
  components: {
    Group,
    XSwitch,
    Cell
  },
  mounted() {
    this.axios.post("/api/resume/my-resume").then(res => {
      this.myresume = res.data.data;
      this.isPublic = res.data.data.is_public;
      this.resumeId = res.data.data.id;
      console.log(res);
    });
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app {
  .info {
    display: flex;
    align-items: center;
    height: 1.92rem;
    .tx {
      border-radius: 50%;
      width: 0.8rem;
      height: 0.8rem;
      margin-right: 0.25rem;
      margin-left: 0.4rem;
    }
    .text {
      color: @theme-color;
      .name {
        font-size: 0.29rem;
      }
      .short {
        font-size: 0.16rem;
        margin-top: 0.17rem;
      }
    }
  }
}
</style>
