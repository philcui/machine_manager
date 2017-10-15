<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <group>
      <calendar title="title" v-model="value"></calendar>
    </group>
  </div>
</template>

<script>
import setRem from '@/utils/setRem.js'
import { Group, Cell, Calendar} from 'vux'
export default {
  name: 'app',
  mounted(){
    //setRem()
  },
  components: {
    Group,
    Cell,
    Calendar
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
