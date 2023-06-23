<template>
  <div class="login-page">
    <div class="page-header header-filter" filter-color="green">
      <div class="page-header-image"
           style="background-image: url('img/login.jpg')">
      </div>
      <div class="content">
        <div class="container">
          <div class="col-md-5 ml-auto mr-auto">
            <card type="login" plain>
              <div slot="header" style="margin-bottom:40px;font-size:20px;color:white;font-weight:bold;text-align:center">
                Lightspace Roleplay
              </div>


              <fg-input v-model="formLogin.email" class="no-border input-lg"
                        placeholder="Email...">
              </fg-input>

              <fg-input v-model="formLogin.password" class="no-border input-lg"
                        type="password"
                        placeholder="Password...">
              </fg-input>

              <template slot="raw-content">
                <n-button @click.native="login()" type="info" round block>Login
                </n-button>
              </template>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Card, Button, FormGroupInput } from '@/components';
  import MainFooter from '@/components/layout/MainFooter';

  export default {
    name: 'login',
    layout: 'default-no-footer',
    components: {
      Card,
      MainFooter,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput
    },
    data() {
        return {
            host: "https://api-lightspace.primeskills.id/api",
            formLogin: {
              email: "",
              password: "",
            },
        }
    },
    
    methods: {
    async login() {
      console.log('asdas')
      const data = {
        email: this.formLogin.email,
        password: this.formLogin.password,
      };
      await this.$axios
        .post(this.host + "/auth/login", data)
        .then((res) => {
            console.log('res : ', res)
          if (res.data.code === 200) {
            this.$store.commit('SET_LOGGED_IN', true)
            this.$store.commit('SET_DATA', res.data.data.user)
            localStorage.setItem("token", res.data.data.token);
            this.$router.push('/');
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    async register() {
      this.registerStatus = false;
      const data = {
        name: this.formRegister.name,
        email: this.formRegister.email,
        password: this.formRegister.password,
        password_confirmation: this.formRegister.password_confirmation,
      };
      await this.$axios
        .post(this.host + "/auth/register", data)
        .then((res) => {
          if (res.data.code !== 200 || res.data.code !== 201) {
            this.registerStatus = true;
            this.registerMessage = "Please Try Again";
          }
          {
            this.registerStatus = true;
            this.registerMessage = "Success";
          }
        })
        .catch((error) => {
          this.registerStatus = true;
          this.registerMessage = error.response.data.message;
          console.log(error.response.data.message);
        });
    },
        toLogin() {
            this.$router.push('/login')
        },
        toRegister() {
            this.$router.push('/signup')
        }
    },
  }
</script>
<style>
</style>
