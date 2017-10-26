import axios from 'axios'
import Vue from 'vue'

import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
var vue = new Vue()

var instance = axios.create({
  timeout: 10000,
  baseURL: "",
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

instance.interceptors.request.use(
  config => {
    vue.$vux.loading.show({
      text: '请稍等'
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    vue.$vux.loading.hide()
    vue.$vux.toast.show({
      type: 'warn',
      text: '请求失败'
    })
    return Promise.reject(error)
  }
)


export default instance
