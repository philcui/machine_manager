<template>
  <div id="app">
    <group gutter="0">
      <cell>
        <span slot="title" class="title">您有什么问题或建议想对我们说</span>
      </cell>
      <x-textarea placeholder="您的宝贵意见，是我们进步的源泉"></x-textarea>
    </group>
    <div class="buttonWrap">
      <x-button type="primary">提交</x-button>
    </div>
  </div>
</template>

<script>
import {Group, Cell, XTextarea, XButton} from 'vux'
export default {
  data(){
    return {
      
    }
  },
  methods:{

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
