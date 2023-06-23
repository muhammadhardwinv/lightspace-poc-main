<template>
    <div class="wrapper about-page">
      <div class="section">
        <div class="subscribe-line subscribe-line-white">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h4 class="title" style="padding-top:0px;margin-top:0px;">Join Lightspace Roleplay!</h4>
                        <p class="description">
                            A place where you can generate your gameplay to educate others share with the rest of the world !
                        </p>
                    </div>
                    <div class="col-md-6">
                        <card plain class="card-form-horizontal" style="margin-top: 0px;">
                            <div class="row">
                                <div class="col-sm-8">
                                    <fg-input placeholder="Enter Game ID..." v-model="gameId">
                                    </fg-input>
                                </div>
                                <div class="col-sm-4">
                                    <n-button type="info" round block @click.native="getFindLesson2()">Join
                                    </n-button>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="subscribe-line subscribe-line-white">
            <div class="container">
              
                   
                        <div class="section" v-if="selectedLessonId != null">
                            <h5 class="title" style="padding-top:0px;margin-top:0px;">{{ gameData.name }} | {{ gameIdLabel }}</h5>
          <iframe
            ref="iframe"
            src="/lightspace/index.html"
            style="height:100vh;width:104%;"
          />
      </div>
                    </div>
                  
                
        </div>
     
     
    
    </div>
  </template>
  <script>
  import {
    Card,
    Button,
    Badge,
    InfoSection,
    FormGroupInput,
    Checkbox,
  } from "@/components";
  import { Select, Option } from "element-ui";
  import initParallax from "@/utils/initParallax";
  import { mapState } from 'vuex'

  export default {
    name: "join-lesson-by-uuid",
    components: {
      Card,
      InfoSection,
      Badge,
      [Button.name]: Button,
      [Checkbox.name]: Checkbox,
      [FormGroupInput.name]: FormGroupInput,
      [Select.name]: Select,
      [Option.name]: Option,
    },
    data() {
      return {
      host: "https://api-lightspace.primeskills.id/api",
      previousLesson: {},
      myLesson: {},
      selectedLessonId : null,
      gameId: null,
      gameIdLabel : null,
      gameData: null,
      };
    },
    created () {

      if (process.browser){
    
        window.addEventListener('getTokenEvent', this.getToken)
       this.$once('hook:beforeDestroy', () => {
         window.removeEventListener('getTokenEvent', this.getToken)
       })
    }
  
  },
    computed: {
        ...mapState({
            isLoggedin: (state) => {
            return state.isLoggedin
        }
        })
    },
    mounted() {
      
        this.gameId = this.$route.params.index
        this.getFindLesson();
      
    },
    methods: {
      getToken () {
      console.log('========get token executed===========');
      console.log(`${this.selectedLessonId},${token}`);
      let token = localStorage.getItem("token")
      this.$refs.iframe.contentWindow.sendToken(`${this.selectedLessonId},${token}`)
    },
    async getFindLesson() {
       
        this.selectedLessonId = null;
      await this.$axios
        .get(this.host + "/find-lesson", {
          params: {
            uuid: this.gameId,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })  
        .then((res) => {
          console.log("find  :", res);
          this.gameData = res.data.data
          this.selectedLessonId = res.data.data.id
          this.gameIdLabel = this.gameId
          this.gameId = null;
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },

    async getFindLesson2() {
      // parent.location.replace = this.gameId;
      parent.location.hash = this.gameId;

window.location.replace(`lessons/join/${this.gameId}`);
       
        this.selectedLessonId = null;
      await this.$axios
        .get(this.host + "/find-lesson", {
          params: {
            uuid: this.gameId,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })  
        .then((res) => {
          console.log("find  :", res);
          this.gameData = res.data.data
          this.selectedLessonId = res.data.data.id
          this.gameId = null;
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },
  
  
    }
  };
  </script>
  <style></style>
  