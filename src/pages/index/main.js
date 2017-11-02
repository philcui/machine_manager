// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import FastClick from 'fastclick'
import setRem from '@/utils/setRem.js'
import Cookie from 'vue-cookie'
import qs from 'qs'
import axios from '@/utils/http.js'
import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'

Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.cookie = Cookie
Vue.prototype.qs = qs
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    setRem()
  }
})
