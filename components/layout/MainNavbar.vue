<template>
    <navbar position="fixed"
            menu-classes="ml-auto">
        <template slot-scope="">
                <nuxt-link v-popover:popover1 class="navbar-brand" to="/">
                    Lightspace Roleplay
                </nuxt-link>
        </template>
        <template slot="navbar-menu">
            <drop-down :style="isLoggedin ? '' : 'display:none' " tag="li" title="Lessons" icon="now-ui-icons text_align-left" style="margin-top:9px;" class="nav-item">
                <nav-link to="/lessons">
                    <i class="now-ui-icons shopping_bag-16"></i> My Lessons
                </nav-link>
                <nav-link to="/lessons/create">
                    <i class="now-ui-icons education_paper"></i> Create new
                </nav-link>
            </drop-down>
            <li v-if="!isLoggedin" class="nav-item"  style="padding-left:5px;padding-right:5px;">
                <n-button @click.native="toLogin()" type="info" block>Login</n-button>
            </li>
            <li v-if="!isLoggedin" class="nav-item"  style="padding-left:5px;padding-right:5px;">
                <n-button @click.native="toRegister()" type="info" block>Register</n-button>
            </li>
            <li v-if="isLoggedin" class="nav-item"  style="padding-left:5px;padding-right:5px;">
                <n-button @click.native="logout()" type="danger" block>Logout</n-button>
            </li>

        </template>
    </navbar>
</template>

<script>
  import { mapState } from 'vuex'
  import { DropDown, Button, NavbarToggleButton, Navbar, NavLink } from '@/components';
  import { Popover } from 'element-ui'
  export default {
    name: 'main-navbar',
    props: {
      transparent: Boolean,
      colorOnScroll: Number,
    },
    components: {
      [Button.name]: Button,
      DropDown,
      Navbar,
      NavbarToggleButton,
      NavLink,
      [Popover.name]: Popover
    },
    computed: {
        ...mapState({
            isLoggedin: (state) => {
            return state.isLoggedin
        }
        }),
        // isLoggedin(){
        //     if (typeof window !== 'undefined') {
        //         let ls =  localStorage.getItem("vuex")
        //     let data = JSON.parse(ls)
        //     return data.isLoggedin
        //     }
          
        // }
    },
    data() {
        return {
            host: "https://api-lightspace.primeskills.id/api"
        }
    },
    methods: {
        toLogin() {
            this.$router.push('/login')
        },
        toRegister() {
            this.$router.push('/signup')
        },
        logout () {
            this.$store.commit('SET_LOGGED_IN', false)
            this.$store.commit('SET_DATA', null)
            localStorage.setItem("token", null);
            
            // this.router.go(0)
        }
    },
      
  }
</script>

<style scoped>

</style>
