<template>
  <el-container>
    <el-main>
      <div class="login">
        <el-row :gutter="24" type="flex" justify="center" align="middle">
          <el-col :span="12" :xs="24" :sm="16" :md="12" :lg="8" :xl="6">
            <el-card v-loading="loading">
              <h1>Register</h1>
              <el-form ref="form" :model="form" :rules="rules" status-icon>
                <el-form-item prop="username">
                  <el-input v-model="form.username" placeholder="your username"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input type="text" v-model="form.email" placeholder="your email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" v-model="form.password" placeholder="your password"></el-input>
                </el-form-item>
                <el-form-item prop="password_confirmation">
                  <el-input type="password" v-model="form.password_confirmation" placeholder="confirm your password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" @click="register('form')">register</el-button>
                  <el-button @click="back()">back</el-button>
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
  name: "Register",
  data() {
    let confirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please retype the password'));
      } else if (value !== this.form.password) {
        callback(new Error('The passwords entered did not match!'));
      } else {
        callback();
      }
    }

    return {
      form: {
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      rules: {
        username: [
          {
            type: "string",
            required: true,
            message: "Please enter your username",
            trigger: "blur"
          }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please provide a valid email address",
            trigger: "blur"
          }
        ],
        password: [
          {
            type: "string",
            required: true,
            message: "Please enter your password",
            trigger: "blur"
          }
        ],
        password_confirmation: [
          { 
            validator: confirmPassword, 
            trigger: 'blur'
          }
        ],
      },
      loading: false
    }
  },
  methods: {
    register(formName) {
      // validate form
      this.$refs[formName].validate(valid => {
        if (valid) {
          /* validate successed */
          let $this = this

          // add loading
          this.loading = true

          $this.$store.dispatch('register', {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password,
            password_confirmation: this.form.password_confirmation
          }).then(response => {
              // remove loading
              $this.loading = false
              // login
              this.$store.dispatch('login', {
                username: this.form.username,
                password: this.form.password
              })
              .then(response => {
                let msg = 'Your registration is successful!'

                $this.$message({
                  showClose: true,
                  type: 'error',
                  message: msg
                })

                $this.$router.push({
                  path: '/'
                })
              })
            }).catch(error => {
              // remove loading
              $this.loading = false
              if(error.response.status == 400) {

                let msg = error.response.data.error

                $this.$message({
                  showClose: true,
                  type: 'error',
                  message: msg
                })
              }
            })
          
        } else {
          /* validate failed */
          return false
        }
      })
    },
    back() {
      this.$router.back()
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
  height: 100%;
}

.el-container {
  height: 100%;
  margin-top: 60px;
}
</style>
