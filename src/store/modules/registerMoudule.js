import axios from '@/http/axiosInstance'
import { apiPath } from '@/config/path'

export default {
  state: {

  },
  mutations: {
    register(state) {

    }
  },
  actions: {
    register({ commit }, registerInfo) {
      return new Promise((resolve, reject) => {
        axios.post(apiPath.auth.register, registerInfo)
          .then(response => {
            resolve(response)
          })
          // Authentication failed
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
