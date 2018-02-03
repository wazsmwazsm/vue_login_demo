
export default {
  state: {
    userInfo: {},
    token: null,
  },
  mutations: {
    login: (state, data) => {
      window.localStorage.token = data;
      state.token = data;
    },
    logout: (state) => {
      window.localStorage.removeItem('token');
      state.token = null
    }
  }
}
