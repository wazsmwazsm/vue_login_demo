// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './http'
import './ui'

// when page refresh
store.dispatch('reloadStore')
  .catch(error => {
    if(router.currentRoute.matched.some(record => record.meta.requiresAuth)) {
      store.dispatch('logout')
    }
  })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
