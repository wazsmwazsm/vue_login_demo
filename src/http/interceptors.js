import { apiPath } from '@/config/path'
import store from '@/store'
import router from '@/router'
import urlParse from 'url-parse'

export default function setInterceptors (axiosInstance) {

  axiosInstance.interceptors.request.use(
    config => {
      let token = store.state.loginMoudule.token

      // if token is setted, set http Authorization header
      if (token) {
        config.headers.Authorization = `bearer ${token}`
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    response => {
      // if token refresh
      if (response.headers.authorization) {
        let token = response.headers.authorization.split(" ")[1]

        store.dispatch('refreshToken', token)
      }

      return response
    },
    error => {
      if (error.response) {
        let requestUrl = urlParse(error.response.config.url)
        switch (error.response.status) {
          /* Unauthorized Explained */
          // token expired or not exist
          case 401:
            if (
              requestUrl.pathname != apiPath.auth.logout &&
              requestUrl.pathname != apiPath.auth.login
            ) {
              store.dispatch('logout')
              .then(response => {
                // do nothing
              })
              .catch(error => {
                // do nothing
              })
              .finally(() => {
                router.replace({
                  path: '/login'
                })
              })
            }

            break;
        }
      }

      return Promise.reject(error)
    }
  )
}
