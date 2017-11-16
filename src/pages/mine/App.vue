<template>
  <div id="app">
    <personal-center></personal-center>
  </div>
</template>

<script>
import PersonalCenter from "./PersonalCenter"
export default {
  data(){
    return {

    }
  },
  methods:{

  },
  components:{
    PersonalCenter
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
@import '../../style/base.less';
#app{
  padding-bottom: 0.9rem;
}
</style>
