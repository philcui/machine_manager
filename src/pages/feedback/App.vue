<template>
  <div id="app">
    <group gutter="0">
      <cell>
        <span slot="title" class="title">您有什么问题或建议想对我们说</span>
      </cell>
      <x-textarea v-model="content" placeholder="您的宝贵意见，是我们进步的源泉"></x-textarea>
    </group>
    <div class="buttonWrap">
      <x-button @click.native="submitFed" type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
import {Group, Cell, XTextarea, XButton} from 'vux'
export default {
  data(){
    return {
      content: "",
    }
  },
  methods:{
    submitFed(){
      if(this.content == ""){
        this.$vux.toast.show({
          type: "text",
          text: "请填写意见"
        })
      }else{
        this.axios.post("/api/default/add-suggest", this.qs.stringify({content: this.content}))
        .then((res) => {
          console.log(res)
          this.$vux.toast.show({
            type: "success",
            text: "感谢您的反馈"
          })
          setTimeout(() => {
            history.back()
          }, 1000)
        })
      }
    }
  },
  components:{
    Group,
    Cell,
    XTextarea,
    XButton,
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

#app{
  background-color: white;
  .title{
    color: @theme-color;
  }
  .buttonWrap{
    width: 100%;
    padding: 0.5rem;
  }
}
</style>
