import axios from 'axios'
import setInterceptors from './interceptors'
import { baseURL } from '@/config/path'
import Qs from 'qs'

let axiosInstance = axios.create({
  baseURL: baseURL,
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

// setInterceptors
setInterceptors(axiosInstance)

export default axiosInstance
