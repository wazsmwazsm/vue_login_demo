<template>
  <div id="app">
    <el-container>
      <router-view/>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

body {
  background: #f9fafc;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
