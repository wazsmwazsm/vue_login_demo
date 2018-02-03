<template>
  <div class="home">
    <h1>Home</h1>
    <el-button @click="logout">Logout</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.replace({
        path: 'login',
        query: {redirect: this.$router.currentRoute.fullPath}
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
