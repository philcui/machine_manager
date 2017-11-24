<template>
  <div class="infoBottom">
    <div class="box shareContainer">
      <img src="../assets/share.png" alt="">
      <span>分享</span>
    </div>
    <div class="box shareContainer" v-if="isShowCollect" @click="favItem()">
      <img src="../assets/collect.png" alt="">
      <span>收藏</span>
    </div>
    <div class="box concatContainer">
      <img src="../assets/call.png" alt=""><a :href="mobileHref">立即联系</a>
    </div>
    <div class="box mainContainer">
      <img src="../assets/icon.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    mobile: {
      type: String
    },
    isShowCollect: {
      default: false
    },
    item_id: {
      type: String
    },
    item_type: {
      type: String
    }
  },
  computed: {
    mobileHref(){
      return "tel:" + this.mobile
    }
  },
  data(){
    return {

    }
  },
  methods:{
    favItem(){
      this.axios
        .get("/api/member-fav/add?type="+this.item_type+"&id="+this.item_id)
          .then(res => {
            console.log(res)
          });
    }
  }
};
</script>

<style lang='less' scoped>
.infoBottom {
  height: 0.86rem;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  .box {
    text-align: center;
    img {
      vertical-align: middle;
    }
  }
  .shareContainer {
    width: 0.88rem;
    background-color: white;
    font-size: 0.2rem;
    color: #535353;
    border-right: 1px solid @divid-color;
    img {
      width: 0.26rem;
      display: block;
      margin: 0 auto;
      margin-top: 0.18rem;
    }
  }
  .concatContainer {
    flex: 1;
    background-color: @theme-color;
    color: white;
    font-size: 0.29rem;
    line-height: 0.86rem;
    img {
      width: 0.37rem;
      margin-right: 0.15rem;
    }
    a{
      color: white;
    }
  }
  .mainContainer {
    width: 1.58rem;
    line-height: 0.86rem;
    background-color: #926e44;
    img {
      width: 0.8rem;
    }
  }
}
</style>
