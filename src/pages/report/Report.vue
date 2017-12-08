<template>
  <div class="report">
    <!-- <group gutter='0'>
      <x-input title="标题" placeholder="请输入" v-model="title" text-align='right'></x-input>
      <x-input title="联系方式" placeholder="请输入" v-model="phone" text-align='right'></x-input>
    </group> -->
    <group>
      <cell title="举报内容"></cell>
      <checker class="checker" v-model="reportType" default-item-class="work-item" selected-item-class="work-item-selected">
        <checker-item
          v-for="(item, index) in reportList"
          :key="index"
          :value='item.value'>
          {{item.key}}
        </checker-item>
      </checker>
      <div class="reportContent">
        <textarea v-model="content" name="" id="" cols="30" rows="10" placeholder="请填写举报内容"></textarea>
      </div>
    </group>
    <a @click="submitReport" class="submit">提交</a>
  </div>
</template>

<script>
import { Cell, Group, Checker, CheckerItem, XInput} from 'vux'
import getUrlKey from '@/utils/getUrlKey.js'
export default {
  data() {
    return {
      reportType: "",
      reportList: [
        { key: "虚假信息", value: "1" },
        { key: "与描述不符", value: "2" },
        { key: "无法取得联系", value: "3" }
      ],
      type: this.getInfo(getUrlKey("type")),
      title: "",
      phone: "",
      content: "",
      info: [],
    };
  },
  components: {
    Cell,
    Group,
    Checker,
    CheckerItem,
    XInput,
  },
  methods: {
    getInfo(id){
      if(this.type == 1){
        return this.axios.post("/api/job/detail", this.qs.stringify({id: id}))
          .then((res) => {
            console.log(res)
            this.info = res.data.data
          })
      }else if(this.type == 2){
        return this.axios.post("/api/resume/detail", this.qs.stringify({id: id}))
          .then((res) => {
            console.log(res)
            this.info = res.data.data
          })
      }else{
        this.info = '';
      }

    },
     validatePubInfo() {
      // if (this.title == "") {
      //   this.$vux.toast.show({
      //     text: "请输入标题",
      //     type: "text"
      //   });
      //   return false;
      // }
      // if (this.phone == "") {
      //   this.$vux.toast.show({
      //     text: "请输入联系方式",
      //     type: "text"
      //   });
      //   return false;
      // }
      // if (!/^1[34578]\d{9}$/.test(this.phone)) {
      //   this.$vux.toast.show({
      //     text: "请输入正确格式的电话号码",
      //     type: "text"
      //   });
      //   return false;
      // }
      if (this.content == "") {
        this.$vux.toast.show({
          text: "请输入举报内容",
          type: "text"
        });
        return false;
      }
      return true;
    },
    submitReport(){
      if(this.validatePubInfo()){
        //前端校验通过
        this.axios.post("/api/default/add-report", this.qs.stringify({
          // title: this.title,
          // phone: this.phone,
          content: this.content,
          category: this.reportType,
          item_id: this.info.id,
        }))
        .then((res) => {
          console.log(res)
          this.$vux.toast.show({
            type: "success",
            text: "提交成功"
          })
          setTimeout(() => {
            history.back()
          }, 1000)
        })
      }else{

      }
    },
  },
  mounted(){
    this.getInfo(getUrlKey("id"))
  }
};
</script>

<style lang='less' scoped>
.report {
  .submit {
    display: block;
    height: 0.62rem;
    line-height: 0.62rem;
    background-color: @theme-color;
    color: white;
    text-align: center;
    font-size: 0.32rem;
    margin-top: 0.2rem;
  }
  .reportContent {
    margin: 0.15rem 0.26rem;
    padding: 0.15rem;
    border: 1px solid #e2e2e2;
    textarea {
      width: 100%;
      height: 1.21rem;
      resize: none;
      padding: 0;
      margin: 0;
      border: none;
    }
  }
}
.checker {
  padding-left: 0.26rem;
}
</style>
