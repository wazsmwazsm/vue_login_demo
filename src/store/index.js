import Vue from 'vue'
import Vuex from 'vuex'
import loginMoudule from './modules/loginMoudule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginMoudule: loginMoudule
  }
})
