<template>
  <div id="app">
    
  </div>
</template>

<script>
import setRem from '@/utils/setRem.js'
export default {
  name: 'app',
  mounted(){
    setRem()
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
