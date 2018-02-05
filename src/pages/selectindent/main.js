// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import setRem from '@/utils/setRem.js'
import axios from '@/utils/http.js'
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  methods:{
  },
  mounted(){
		setRem()
	}
})
