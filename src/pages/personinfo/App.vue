<template>
  <div id="app">
    <person-info></person-info>
  </div>
</template>

<script>
import PersonInfo from './PersonInfo.vue'
export default {
  data(){
    return {

    }
  },
  methods:{

  },
  components:{
    PersonInfo
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';

</style>
