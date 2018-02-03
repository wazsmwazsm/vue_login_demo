import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import axiosConf from '@/config/axiosConf'
import store from '@/store/store'
import router from '@/router'
import Qs from 'qs'

var axios_instance = axios.create({
  baseURL: axiosConf.baseURL,
  // transform data before request. only for PUT, POST, PATCH methods
  transformRequest: [
    // transform json data to query string
    function (data) {
      data = Qs.stringify(data)
      return data
    }
  ],
  // POST from
  headers:{ 'Content-Type': 'application/x-www-form-urlencoded' },
  timeout: 5000
})

axios_instance.interceptors.request.use(
  config => {
    let token = store.state.loginMoudule.token
    // if token is setted, set http Authorization header
    if (token) {
      config.headers.Authorization = `token ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

axios_instance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err.response) {

      switch (err.response.status) {
        /* Unauthorized Explained */
        // 1、token expired
        // 2、server refused
        case 401:
          // clean token
          store.commit('logout')
          router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
          })
          break;
      }
    }

    return Promise.reject(err)
  }
)

Vue.use(VueAxios, axios_instance)
