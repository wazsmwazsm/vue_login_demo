import axios from '@/http/axiosInstance'
import { apiPath } from '@/config/path'

export default {
  state: {
    token: null,
    profile: {}
  },
  mutations: {
    refreshToken (state, token) {
      localStorage.token = token
      state.token = token;
    },
    refreshProfile (state, profile) {
      localStorage.profile = JSON.stringify(profile)
      state.profile = profile
    },
    logout (state) {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
      state.token = null
      state.profile = {}
    }
  },
  actions: {
    login ({ commit }, loginInfo) {
      return new Promise((resolve, reject) => {
        axios.post(apiPath.auth.login, loginInfo)
          // Authentication passed
          .then(response => {
            if (response.data.token) {
              // save token to store object
              commit('refreshToken', response.data.token)
              // save user info
              commit('refreshProfile', response.data.profile)
              // give response to Promise.then()
              resolve(response)
            } else {
              reject('token missed!')
            }
          })
          // Authentication failed
          .catch(error => {
            reject(error)
          })
      })
    },
    refreshToken({ commit }, token) {
      return new Promise(function (resolve, reject) {
        commit('refreshToken', token)
      })
    },
    refreshProfile({ commit }, profile) {
      return new Promise(function (resolve, reject) {
        commit('refreshProfile', profile)
      })
    },
    // reload store when page refresh
    reloadStore({ commit, dispatch }) {
      return new Promise(function (resolve, reject) {

        let token = localStorage.getItem('token')
        let profile = localStorage.getItem('profile')

        if ( ! token || ! profile) {
          reject('reload failed: token not exists')
          
        } else {
          // refresh token \ profile
          commit('refreshToken', token)
          commit('refreshProfile', JSON.parse(profile))
          // request server authorizate roken
          // ensure token not be tamper
          dispatch('authToken')
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)  
            })
          
        }
      })
    },
    authToken({ dispatch }) {
      return new Promise((resolve, reject) => {    
        axios.post(apiPath.auth.authToken)
          .then(response => {
            // give response to Promise.then()
            resolve(response)
          })
          .catch(error => {
            dispatch('logout')
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.delete(apiPath.auth.logout)
          .then(response => {
            // give response to Promise.then()
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
          .finally(() => {
            // clean local info
            commit('logout')
          })
      })
    }
  }
}
