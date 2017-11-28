<template>
  <div id="app">
    <div class="tab">
      <div @click="selectTab(1)" :class="getClass(1)">职位收藏</div>
      <!--div @click="selectTab(2)" :class="getClass(2)">二手机收藏</div-->
    </div>
    <div @click="gotoFavDetail(item.id)" class="jobCollect" v-for="(item, index) in jobList" :key="index" v-show="showBindingActive(1)">
      <div class="jobItem">
        <div class="left">
          <img :src="require('./img/tx.png')" alt="">
          <div>{{item.realname}}</div>
        </div>
        <div class="center">
          <p>{{getCarTypeName(item.car_type_id)}}</p>
          <p>{{item.salary}}元/月</p>
          <p>{{item.address}}</p>
        </div>
        <div class="right">
          <div class="time">{{item.ctime}}</div>
          <div class="cancelBtn" @click.stop="deleteFav(item.fav_id)">取消</div>
        </div>
      </div>
    </div>

    <!--div class="jobCollect machineCollect" v-for="(item, index) in jobList" :key="index" v-show="showBindingActive(2)">
      <div class="jobItem">
        <div class="left">
          <img :src="require('./img/tx.png')" alt="">
          <div>{{item.realname}}</div>
        </div>
        <div class="center">
          <p>{{getCarTypeName(item.car_type_id)}}</p>
          <p>{{item.salary}}元/月</p>
        </div>
        <div class="right">
          <div class="time">{{item.ctime}}</div>
          <div class="cancelBtn">取消</div>
        </div>
      </div>
    </div-->
  </div>
</template>

<script>
import car_type from "@/data/car_type.json"
import mode_type from "@/data/mode_type.json"
import benefit from "@/data/benefit.json"
import getName from "@/utils/getName.js"

export default {
  data(){
    return {
      activeIndex: 1,
      jobList: [],
    }
  },
  methods:{
    getCarTypeName (key){
      return getName(car_type[0], key);
    },
    deleteFav(fav_id){
      this.axios.get("/api/member-fav/delete?fav_id="+fav_id).then(res => {
        console.log(res);
        this.$vux.toast.show({
          type: "success",
          text: "删除成功"
        });
        //todo 应该是重新加载
        setTimeout(() => {
          this.loadData();
        }, 1000)
      });
    },
    getClass(index){
      return {
        active: index == this.activeIndex
      }
    },
    selectTab(index){
      this.activeIndex = index
    },
    showBindingActive(index){
      return index == this.activeIndex ? true : false
    },
    loadData() {
      // 加载，加载更多
      this.isLoading = true;
      this.axios.post("/api/member-fav/list?type=1").then(res => {
        this.isLoading = false;
        this.jobList = res.data.data;
        console.log(res);
      });
    },
    gotoFavDetail(id) {
      window.location.href = "../workdetail/index.html?id=" + id + '&' + "type=1"
    },
  },
  components:{

  },
  mounted(){
    this.loadData();
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

#app{
  .tab{
    width: 100%;
    display: flex;
    div{
      flex: 1;
      text-align: center;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.24rem;
      background-color: #d2d2d2;
      color: #898989;
    }
    .active{
      color: @theme-color;
      background-color: #ebebeb;
    }
  }
  .jobCollect{
    .jobItem{
      display: flex;
      background-color: white;
      border-bottom:1px solid @divid-color;
      height: 2rem;
      padding-left: 0.3rem;
      padding-top: 0.34rem;
      padding-top: 0.3rem;
      color: #313131;
      .left{
        height: 100%;
        width: 1rem;
        text-align: center;
        margin-right: 0.4rem;
        div{
          font-size: 0.16rem;
          overflow: hidden;
        }
        img{
          height: 0.84rem;
          width: 0.84rem;
        }
      }
      .center{
        flex: 1;
        margin-right: 0.3rem;
        font-size: 0.24rem;
        word-wrap: break-word;
        word-break: break-all;
        p{
          margin-bottom: 0.10rem;
        }
      }
      .right{
        width: 1.2rem;
        text-align: center;
        font-size: 0.213rem;
        .time{
          color: #626262;
          margin-bottom: 0.2rem;
        }
        .cancelBtn{
          width: 0.86rem;
          height: 0.36rem;
          line-height: 0.36rem;
          text-align: center;
          margin: 0 auto;
          border: 1px solid #dbdeda;
        }
      }
    }
  }
}
</style>
