<template>
  <div class="wrapper about-page">
    <div class="page-header page-header-small rellax-header">
      <div
        class="page-header-image"
        style="background-image: url('img/bg32.jpg')"
      ></div>
      <div class="content-center">
        <div class="row">
          <div class="ml-auto mr-auto">
            <h1 class="title">Lightspace Roleplay</h1>
            <div>
              A place where you can generate your gameplay to educate others
              share with the rest of the world ! <br />
              We vision a place where everyone can teach each other with methods
              of story telling. In this world we can understand better if we are
              placed in someone elses shoes. <br />
              What is that you want to share with others? Create it with
              Lightspace.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="subscribe-line subscribe-line-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h4 class="title" style="padding-top: 0px; margin-top: 0px">
                Join Lightspace Roleplay!
              </h4>
              <p class="description">
                A place where you can generate your gameplay to educate others
                share with the rest of the world !
              </p>
            </div>
            <div class="col-md-6">
              <card plain class="card-form-horizontal" style="margin-top: 0px">
                <div class="row">
                  <div class="col-sm-8">
                    <fg-input placeholder="Enter Game ID..." v-model="gameId">
                    </fg-input>
                  </div>
                  <div class="col-sm-4">
                    <n-button
                      type="info"
                      round
                      block
                      @click.native="getFindLesson()"
                      >Join
                    </n-button>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-if="selectedLessonId != null">
      <div class="container">
        <h5 class="title" style="padding-top: 0px; margin-top: 0px">
          {{ gameData.name }}
        </h5>
        <iframe
          ref="iframe"
          src="/lightspace/index.html"
          style="height: 100vh; width: 100%"
        />
      </div>
    </div>
    <div
      v-if="isLoggedin"
      class="section related-products"
      data-background-color="black"
    >
      <div class="container">
        <h3 class="title text-center">My Previous Lesson</h3>
        <div class="row">
          <div
            v-for="(item, index) in previousLesson"
            :key="index"
            class="col-sm-6 col-md-3"
          >
            <card type="product">
              <img
                slot="image"
                class="img rounded"
                :src="item.thumbnail"
                style="height: 150px"
              />
              <div
                class="category text-black"
                style="margin-top: 0px; text-align: left; font-size: 20px"
              >
                {{ item.name }}
              </div>
              <div
                class="category text-black"
                style="
                  margin-top: 0px;
                  font-weight: normal;
                  text-align: left;
                  font-size: 15px;
                "
              >
                {{ item.description }}
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoggedin" class="container">
      <div class="section">
        <h3 class="title text-center">My Lesson</h3>
        <br />
        <div class="row">
          <div v-for="(item, index) in myLesson" :key="index" class="col-md-3">
            <card type="blog" plain>
              <img
                slot="image"
                class="img rounded img-raised"
                style="height: 150px; width: 100%; object-fit: cover"
                :src="item.thumbnail"
              />
              <h6
                class="category text-info"
                style="margin-bottom: 0px; margin-top: 5px"
              >
                {{ item.name }}
              </h6>
              <h4 class="card-title" style="margin-top: 5px">
                {{ item.description }}
              </h4>
            </card>
          </div>
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
import { mapState } from "vuex";

export default {
  name: "about-us",
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
      selectedLessonId: null,
      gameId: null,
      gameData: null,
    };
  },
  created() {
    if (process.browser) {
      window.addEventListener("getTokenEvent", this.getToken);
      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("getTokenEvent", this.getToken);
      });
    }
  },
  computed: {
    ...mapState({
      isLoggedin: (state) => {
        return state.isLoggedin;
      },
    }),
    // isLoggedin(){
    //     if (typeof window !== 'undefined') {
    //         let ls =  localStorage.getItem("vuex")
    //     let data = JSON.parse(ls)
    //     return data.isLoggedin
    //     }

    // },
  },
  mounted() {
    initParallax();
    if (this.idUser !== "1" && this.idUser !== "null") {
      this.getPreviousLesson();
      this.getMyLesson();
    }
  },
  methods: {
    getToken() {
      console.log("========get token executed===========");
      let token = localStorage.getItem("token");
      this.$refs.iframe.contentWindow.sendToken(
        `${this.selectedLessonId},${token}`
      );
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
          this.gameData = res.data.data;
          this.selectedLessonId = res.data.data.id;
          this.gameId = null;
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },
    async getPreviousLesson() {
      await this.$axios
        .get(this.host + "/lesson/history", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.previousLesson = res.data.data;
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },
    async getMyLesson() {
      await this.$axios
        .get(this.host + "/lesson/my", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.myLesson = res.data.data;
          this.myLesson = this.myLesson.slice(
            Math.max(this.myLesson.length - 4, 1)
          );
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },
  },
};
</script>
<style></style>
