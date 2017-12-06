<template>
  <div id="app">
    <div class="listWrap">
      <div @click="gotoPubDetail(item.id)" class="hisItem" v-for="(item, index) in publist" :key="index">
        <div class="left">
          <img class="tu" :src="getIcon('pin')" alt="">
          <div class="title">{{getTitle('pin')}}</div>
        </div>
        <div class="right">
          <div class="rightTop">
            <div class="info">
              <p>发布时间：{{moment(item.ctime).format("YYYY-MM-DD")}}</p>
              <p>工作地点：{{item.address}}</p>
            </div>
            <div class="time">
              {{moment(item.ctime).format("YYYY-MM-DD")}}
            </div>
          </div>
          <div class="rightBottom">
            <div @click.stop="delPubInfo(item.id)" class="btn deleteBtn">删除</div>
            <div @click.stop="editPubInfo(item.id)" class="btn editBtn">编辑</div>
            <div @click.stop="refreshPubInfo(item.id)" class="btn refreshBtn">刷新</div>
          </div>
        </div>
      </div>
    </div>
    <div @click="loadData" class="loadMore">查看更多</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publist: [],
      nowPage: 0,
      hisTypeData: {
        zu: {
          icon: require("./img/zu.png"),
          title: "求租设备"
        },
        pin: {
          icon: require("./img/pin.png"),
          title: "招聘机手"
        },
        pei: {
          icon: require("./img/pei.png"),
          title: "买配件"
        },
        ji: {
          icon: require("./img/ji.png"),
          title: "求购二手机"
        }
      }
    };
  },
  methods: {
    getTitle(type) {
      return this.hisTypeData[type].title;
    },
    getIcon(type) {
      return this.hisTypeData[type].icon;
    },
    gotoPubDetail(id) {
      window.location.href = "../workdetail/index.html?id=" + id
    },
    editPubInfo(id) {
      window.location.href = "../pubinfo/index.html?id=" + id + '&' + "type=1";
    },
    delPubInfo(id) {
      if (confirm("确认删除？删除后将无法恢复")) {
        this.axios.get("/api/job/delete-member-job/?id=" + id).then(res => {
          console.log(res);
          this.$vux.toast.show({
            type: "success",
            text: "删除成功"
          });
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        });
      } else {
      }
    },
    refreshPubInfo(id) {
      this.axios.get("/api/job/update-member-job/?id=" + id).then(res => {
        console.log(res);
        this.$vux.toast.show({
          type: "success",
          text: "刷新成功"
        })
        setTimeout(() => {
            window.location.reload()
        }, 1000)
      });
    },
    loadData(){
      this.axios.post("/api/job/member-job-list", this.qs.stringify({page: this.nowPage}))
      .then(res => {
        console.log(res);
        if(res.data.data.length){
          this.nowPage++
          this.publist = this.publist.concat(res.data.data)
        }else{
          this.$vux.toast.show({
            type: "text",
            text: "没有了"
          });
        }
      })
    },
  },
  components: {},
  mounted() {
    this.loadData()
  }
};
</script>

<style lang='less'>
@import "~vux/src/styles/reset.less";
@import "../../style/base.less";

#app {
  .listWrap {
    .hisItem {
      display: flex;
      height: 1.9rem;
      padding-top: 0.27rem;
      box-sizing: border-box;
      background-color: white;
      border-top: 1px solid #dcdcdd;
      border-bottom: 1px solid #dcdcdd;
      .left {
        display: flex;
        height: 100%;
        align-items: center;
        flex-direction: column;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        .tu {
          width: 0.8rem;
          height: 0.8rem;
        }
        .title {
          font-size: 0.173rem;
        }
      }
      .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        .rightTop {
          height: 0.8rem;
          display: flex;
          margin-bottom: 0.08rem;
          .info {
            font-size: 0.226rem;
            width: 3.78rem;
            font-size: 0.226rem;
            word-break: break-all;
            word-wrap: break-word;
            overflow: hidden;
          }
          .time {
            flex: 1;
            font-size: 0.173rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            border-left: 1px solid #959595;
          }
        }
        .rightBottom {
          display: flex;
          flex: 1;
          justify-content: space-around;
          align-items: center;
          border-top: 1px solid #535353;
          .btn {
            width: 1rem;
            border: 1px solid #959595;
            color: @theme-color;
            font-size: 0.21rem;
            height: 0.45rem;
            line-height: 0.45rem;
            text-align: center;
          }
        }
      }
    }
  }
  .loadMore{
    text-align: center;
    line-height: 0.6rem;
    line-height: 0.6rem;
    color: @theme-color;
  }
}
</style>
