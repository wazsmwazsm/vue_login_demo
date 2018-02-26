<template>
  <div class="home">
    <h1>Home</h1>
    <el-button @click="logout">Logout</el-button>
    <el-button @click="getme">getme</el-button>
    <p>{{ profile }}</p>
  </div>
</template>

<script>
import { apiPath } from '@/config/path'

export default {
  name: 'Home',
  data () {
    return {
      profile: {}
    }
  },
  methods: {
    logout () {

      // for user-friendly, whether the server requests success or not
      // just clean local store, redirect route
      this.$store.dispatch('logout')
      .then(response => {
        // do nothing
      })
      .catch(error => {
        // do nothing
      })
      .finally(() => {
        this.$router.replace({
          path: '/login'
        })
      })

    },
    getme () {
      let $this = this
      this.$http.get(apiPath.auth.profile)
        .then(response => {
          $this.profile = response.data
        })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
