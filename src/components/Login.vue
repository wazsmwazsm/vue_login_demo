<template>
  <el-container>
    <el-main>
      <div class="login">
        <el-row :gutter="24" type="flex" justify="center" align="middle">
          <el-col :span="12" :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
            <el-card>
              <img src="../assets/logo.png">
              <el-form ref="form" :model="form">
                <el-form-item>
                  <el-input v-model="form.username" placeholder="your username"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" v-model="form.password" placeholder="your password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="login">Login</el-button>
                  <el-button>Register</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {

      let $this = this

      this.$http.post('/api.php', {
        username: this.form.username,
        password: this.form.password
      })
      .then(response => {
        // Authentication passed ?
        if (response.data.token) {
          // save token to store object
          $this.$store.commit('login', response.data.token)
          // redirect
          let redirect = decodeURIComponent($this.$route.query.redirect || '/')
          $this.$router.push({
            path: redirect
          })

        } else {

          $this.$message({
            showClose: true,
            type: 'error',
            message: 'Invalid Login or password.'
          });
        }
      })
      .catch(error => {
        $this.$message({
          showClose: true,
          type: 'error',
          message: error
        });
      })
    }
  }
}
</script>

<style scoped>

.login {
  padding: 5px 10px 10px 5px;
  height: 100%;
}

.el-card {
  margin-top: 60px;
  padding: 0px;
  border-radius: 6px;
  background: #fafafa;
}

.el-main {
  text-align: center;
  height:100%;
}

.el-container {
  height:100%;
  margin-top: 60px;
}

</style>
