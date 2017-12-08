import axios from 'axios'
import Vue from 'vue'

import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
var vue = new Vue()

var instance = axios.create({
  timeout: 20000,
  baseURL: "",
  headers: {
    //'Content-Type': 'application/json; charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  transformRequest: (data) => {
    //请求数据转换
    return data
  },
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
//todo 有关状态码的判读可以在这里加
instance.interceptors.response.use(
  response => {
    vue.$vux.loading.hide()
    if(response.data.code && response.data.code != 200){
      vue.$vux.toast.show({
        type: 'warn',
        text: response.data.msg + JSON.stringify(response.data.data)
      })

      if(response.data.code == -301){
        window.location.href = "/m/account/login?ref_url=" + encodeURIComponent(location.href.split('#')[0])
      }
/*
      if(response.data.code == -302){
        window.location.href = "/m/account/login?ref_url=" + window.location.href
      }
*/
      return Promise.reject(response)
    }
    return response
  },
  error => {
    vue.$vux.loading.hide()
    vue.$vux.toast.show({
      type: 'warn',
      text: '哇，出错了'
    })
    return Promise.reject(error)
  }
)


export default instance
