<template>
  <div class="section">
    <div class="container">
      <div class="col-md-12">
        <h2 class="title text-center">Create New Lessons</h2>
        <br />
        <fg-input
          v-model="name"
          class="col-sm-12 col-12"
          label="Lesson Name"
          placeholder=""
          value=""
          type="text"
        >
        </fg-input>
        <fg-input
          v-model="description"
          class="col-sm-12 col-12"
          label="Lesson Description"
          placeholder=""
          value=""
          type="text"
        >
        </fg-input>
        <div class="container1">
          <div v-if="imageData === null" class="card1">
            <div class="drop_box" @click="$refs.file.click()">
              <header>
                <h4>Click to add Thumbnail</h4>
              </header>
              <input
                id="file-upload"
                ref="file"
                class="custom-file-upload"
                type="file"
                hidden
                style="display: inline-block; cursor: pointer"
                accept="image/*"
                @change="changeImage($event)"
              />
              <button class="btn">Choose File</button>
            </div>
          </div>
          <div v-else style="display: flex; flex-direction: column">
            <img :src="imageUrl" style="height: 200px; width: 400px" />
            <n-button class="btn-stumbleupon" block @click.native="toDelete()">
              <i class="fa fa-trash mr-2"></i> Delete image
            </n-button>
          </div>
        </div>

        <alert
          v-if="isLoading"
          type="info"
          dismissible
          style="margin-top: 30px"
        >
          {{ message }}
        </alert>
        <n-button type="info" round block @click.native="save()"
          >Create New
        </n-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import { Button, Pagination, FormGroupInput, Alert } from "@/components";

export default {
  components: {
    [FormGroupInput.name]: FormGroupInput,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Pagination.name]: Pagination,
    [Alert.name]: Alert,
  },
  data() {
    return {
      host: "https://api-lightspace.primeskills.id/api",
      name: "",
      description: "",
      imageData: null,
      imageUrl: null,
      isLoading: false,
      message: null,
      defaultImg: 'https://c4.wallpaperflare.com/wallpaper/600/919/630/digital-art-illustration-lofi-hd-wallpaper-preview.jpg'
    };
  },
  methods: {
    toDelete() {
      this.imageData = null;
      this.imageUrl = null;
    },
    changeImage(file) {
      const { files } = event.target;
      if (files && files[0]) {
        const formatData = files[0].type;
        if (
          formatData === "image/jpg" ||
          formatData === "image/jpeg" ||
          formatData === "image/png" ||
          formatData === "image/gif" ||
          formatData === "image/bmp"
        ) {
          if (files[0].size / 1023.4 > 500) {
            this.isLoading = true;
            this.message = "Image size can not exceed 500KB!";
          } else {
            this.imageData = files[0];
            this.imageUrl = URL.createObjectURL(files[0]);
            console.log(URL.createObjectURL(files[0]));
          }
        } else {
          this.isLoading = true;
          this.message = "Image must be JPG, JPEG, PNG, GIF & BMP format";
        }
      }
    },
    async uploadImg() {
      var data = new FormData();
      let img = null
      data.append("file", this.imageData);
      await this.$axios
        .post(this.host + "/s3/upload/image", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(async (res) => {
         img = res.data.data
        });

        return img
    },
    async save() {
      this.isLoading = true;
      this.message = "Loading ...";

      var data2 = {
        name: this.name,
        description: this.description,
        thumbnail: this.imageData !== null ? await this.uploadImg() : this.defaultImg,
      };
      await this.$axios
        .post(this.host + "/lesson/create", data2, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.message = "Create Success";
            this.$router.push("/lessons");
          }
          console.log(res);
        })
        .catch((error) => {
          // const keys = Object.keys(error.response.data.errors);
          // const arr = [];
          // keys.forEach((key, index) => {
          //   arr.push(error.response.data.errors[key]);
          // });
          // this.message = "Error !" + arr.join();
        });
    },
  },
};
</script>
<style scoped>
.container1 {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;
}

.card1 {
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
  width: 600px;
  height: 190px;
  background-color: #ffffff;
}

.card1 h3 {
  font-size: 22px;
  font-weight: 600;
}

.drop_box {
  margin: 0;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 3px dotted #a3a3a3;
  border-radius: 5px;
}

.drop_box h4 {
  font-size: 16px;
  font-weight: 400;
  color: #2e2e2e;
}

.drop_box p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #a3a3a3;
}

.btn {
  text-decoration: none;
  background-color: #005af0;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  outline: none;
  transition: 0.3s;
}

.btn:hover {
  text-decoration: none;
  background-color: #ffffff;
  color: #005af0;
  padding: 10px 20px;
  border: none;
  outline: 1px solid #010101;
}
.form input {
  margin: 10px 0;
  width: 100%;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}
</style>
