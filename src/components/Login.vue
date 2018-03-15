<template>
  <el-container>
    <el-main>
      <div class="login">
        <el-row :gutter="24" type="flex" justify="center" align="middle">
          <el-col :span="12" :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
            <el-card v-loading="loading">
              <img src="../assets/logo.png">
              <el-form ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item prop="username">
                  <el-input v-model="form.username" placeholder="your username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="form.password" placeholder="your password" @keyup.enter.native="login('form')"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="login('form')">Login</el-button>
                  <el-button @click="register()">Register</el-button>
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
      },
      rules: {
        username: [
          { type: "string", required: true, message: 'Please enter your username', trigger: 'blur' }
        ],
        password: [
          { type: "string", required: true, message: 'Please enter your password', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    login (formName) {
      // validate from
      this.$refs[formName].validate((valid) => {
        if (valid) { /* validate successed */
          let $this = this
          // add loading
          this.loading = true

          this.$store.dispatch('login', {
            username: this.form.username,
            password: this.form.password
          }).then(response => {
              // remove loading
              $this.loading = false
              // redirect
              let redirect = $this.$router.currentRoute.query.redirect ?
                decodeURIComponent($this.$router.currentRoute.query.redirect) : '/'

              $this.$router.push({
                path: redirect
              })
            })
            .catch(error => {
              // remove loading
              $this.loading = false
              // create error message
              let msg = ''

              if (error.response.status == 401) {
                msg = 'Invalid Login or password.'
              } else {
                msg = error.response.status + ' ' + error.response.statusText + ': ' + error.response.data.error
              }

              $this.$message({
                showClose: true,
                type: 'error',
                message: msg
              })
            })
        } else { /* validate failed */
          return false
        }
      })
    },
    register() {
      this.$router.push({
        path: '/register'
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
