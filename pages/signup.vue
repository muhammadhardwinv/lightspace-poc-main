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

              <fg-input v-model="formRegister.name" class="no-border input-lg"
                        placeholder="Name">
              </fg-input>

              <fg-input v-model="formRegister.email" class="no-border input-lg"
                        placeholder="Email">
              </fg-input>
              <fg-input v-model="formRegister.password" class="no-border input-lg" type="password"
                        placeholder="Password">
              </fg-input>
              <fg-input v-model="formRegister.password_confirmation" class="no-border input-lg" type="password"
                        placeholder="Password Confirmation">
              </fg-input>

              <alert v-if="registerMessage === 'Success'" type="success" dismissible style="margin-top:30px;">
                <div class="alert-icon">
                      <i class="now-ui-icons ui-2_like"></i>
                    </div>Register success !
              </alert>
              <alert v-if="registerMessage !== 'Success' && registerMessage !== ''" type="danger" dismissible style="margin-top:30px;">Register Failed ! {{  registerMessage }}
              </alert>
              <template slot="raw-content">
                <n-button @click.native="register()" type="info" round block>Register
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
  import { Card, Button, FormGroupInput, Alert } from '@/components';
  import MainFooter from '@/components/layout/MainFooter';

  export default {
    name: 'login',
    layout: 'default-no-footer',
    components: {
      Card,
      MainFooter,
      [Button.name]: Button,
      [FormGroupInput.name]: FormGroupInput,
      [Alert.name]: Alert
    },
    
    data() {
        return {
            host: "https://api-lightspace.primeskills.id/api",
            formRegister: {
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
            },
      registerStatus: false,
      registerMessage: "",
        }
    },
    methods: {
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
    },
  }
</script>
<style>
</style>
