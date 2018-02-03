import Vue from 'vue'
import Vuex from 'vuex'
import loginMoudule from './modules/loginMoudule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loginMoudule: loginMoudule
  }
})

// reload token store when page refresh
if (window.localStorage.getItem('token')) {
  store.commit('login', window.localStorage.getItem('token'))
}

export default store
