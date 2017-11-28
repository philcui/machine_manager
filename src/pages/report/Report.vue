<template>
  <div class="report">
    <group gutter='0'>
      <cell title="标题" value='求租150挖掘机'></cell>
      <cell title="联系方式" value='18710843069'></cell>
    </group>
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
        <textarea name="" id="" cols="30" rows="10" placeholder="请填写举报内容"></textarea>
      </div>
    </group>
    <a class="submit" href="../result/index.html?restype=report">提交</a> 
  </div>  
</template>

<script>
import { Cell, Group, Checker, CheckerItem } from 'vux'
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
      info: [],
    };
  },
  components: {
    Cell,
    Group,
    Checker,
    CheckerItem
  },
  methods: {
    getInfo(id){
      return this.axios.get("/api/job/detail", this.qs.stringify({id: id}))
      .then((res) => {
        console.log(res)
        this.info = res.data.data
      })
    }
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
