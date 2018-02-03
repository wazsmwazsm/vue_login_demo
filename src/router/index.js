import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/components/Home'
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

const router = new Router({
  routes: [
    { /* default route */
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.state.loginMoudule.token) {
          // already login, redirect to home page
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // requires auth ?
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // auth successed ?
    if (store.state.loginMoudule.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }

})

export default router
