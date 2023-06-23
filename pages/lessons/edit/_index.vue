<template>
  <div class="section">
    <div class="container" v-if="isPage == 'Dialogue'">
      <div class="col-md-12">
        <h2 class="title text-center">Edit Lessons</h2>
        <br />
        <div class="edit-lesson">
          <div class="form-less">
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
          </div>
          <div class="container1">
            <div v-if="imageUrl === null" class="card1">
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
              <n-button type="danger" block @click.native="toDelete()">
                <i class="fa fa-trash mr-2"></i> Delete image
              </n-button>
            </div>
          </div>
        </div>

        <alert
          v-if="isLoading2"
          type="info"
          dismissible
          style="margin-top: 30px"
        >
          {{ message2 }}
        </alert>

        <n-button
          @click.native="updateLesson()"
          type="info"
          style="margin-top: 0px; margin-bottom: 30px"
          round
          block
          >Edit
        </n-button>

        <h2 class="title text-center">Manage Content</h2>
        <n-button type="info" round @click.native="addSequence()"
          >Add Sequence
        </n-button>
        <div class="manage-content">
          <div
            v-for="(item10, index10) in sequences"
            :key="index10"
            class="card-content2 mb-4"
          >
            <div class="left-side2">
              <div class="img-tag">
                <img :src="item10.bg_url" class="img-drag" />
              </div>
              <div class="text-tag">
                <div class="name2">
                  {{ item10.name }}
                </div>
              </div>
            </div>
            <div class="right-side2">
              <div class="galery-img">
                <span
                  v-for="(item11, index11) in item10.dialogues"
                  :key="index11"
                >
                  <img
                    :src="item11.character_thumbnail"
                    class="card-gall"
                    style="border: 1px solid grey"
                  />
                </span>
              </div>
              <n-button
                type="default"
                class="ml-4"
                round
                @click.native="toEdit(item10)"
              >
                <i class="fa fa-edit"></i> Edit
              </n-button>

              <n-button
                type="info"
                round
                @click.native="toEdit(item10)"
                class="ml-4"
                size="sm"
              >
                <i class="fa fa-edit"></i> Edit
              </n-button>

              <n-button
                type="danger"
                round
                @click.native="toDeleteLessonDialog(item10)"
                class="ml-2"
                size="sm"
              >
                <i class="fa fa-trash"></i> Delete
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container align-items-center" v-if="isPage == 'QnA'">
      <div>
        <h4 class="d-flex justify-content-center">QnA</h4>
        <div class="card d-flex justify-content-center align-items-center">
          <div
            class="card text-center d-flex justify-content-center"
            style="width: 200px; height: 50px; margin-top: 40px"
            @click="selectBG()"
            type="submit"
          >
            Select BG
          </div>
          <div
            class="card text-center d-flex justify-content-center"
            style="width: 200px; height: 50px"
            @click="selectBGM()"
            type="submit"
          >
            Select BGM (Optional)
          </div>
          <div
            class="card text-center d-flex justify-content-center"
            style="width: 200px; height: 50px; margin-bottom: 40px"
            @click="toPage('Add Question')"
            type="submit"
          >
            Add Question
          </div>
        </div>
      </div>
    </div>
    <div
      class="container d-flex justify-content-center"
      style="
        margin-top: 100px;
        margin-bottom: 100px;
        border-radius: 30px;
        width: 1250px;
      "
    >
      <div
        class="container d-flex justify-content-center p-4"
        style="margin-top: 10px"
        v-if="isPage == 'Add Question'"
      >
        <div class="container row d-flex justify-content-around">
          <div class="card" style="width: 1250px; padding: 25px">
            <p
              class="card"
              style="border-radius: 10px; max-width: 75%; padding-left: 10px"
            >
              Input Field: Insert Question here
            </p>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
          </div>
          <div class="card" style="width: 1250px; padding: 25px">
            <p
              class="card"
              style="border-radius: 10px; max-width: 75%; padding-left: 10px"
            >
              Input Field: Insert Question here
            </p>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
            <div class="d-flex align-items-center" style="max-height: 20px">
              <input
                style="width: 30px; height: 30px; margin-bottom: 30px"
                type="checkbox"
              />
              <p
                class="card"
                style="
                  border-radius: 10px;
                  max-width: 75%;
                  padding-left: 10px;
                  margin-left: 20px;
                "
              >
                Input Field: Insert Question here
              </p>
            </div>
            <br />
            <div class="container d-flex justify-content-center">
              <n-button type="info" round @click.native="AddOptionMessage()"
                >Add Option
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container align-items-center" v-if="isPage == 'Branching'">
      <div>
        <h4 class="d-flex justify-content-center">Branching</h4>
        <div class="card d-flex justify-content-center align-items-center">
          <div
            class="card text-center d-flex justify-content-center"
            style="width: 200px; height: 50px; margin-top: 40px"
            @click="selectBG()"
            type="submit"
          >
            Select BG
          </div>
          <div
            class="card text-center d-flex justify-content-center"
            style="width: 200px; height: 50px"
            @click="selectBGM()"
            type="submit"
          >
            Select BGM (Optional)
          </div>
          <div class="container row d-flex justify-content-around">
            <div class="card text-center" style="width: 450px; padding: 25px">
              <p class="card" style="border-radius: 10px">
                Eh kamu sudah siap belum untuk aku kasih mini quiz lagi
              </p>
              <p class="card text-center" style="border-radius: 10px">
                kita ngomongin apa sih?
              </p>
              <p class="card text-center" style="border-radius: 10px">
                Uhhh siap gak siap sih...
              </p>
              <p class="card text-center" style="border-radius: 10px">Siap!</p>
            </div>
            <div
              class="card text-center"
              style="width: 150px; border-radius: 10px"
              id="dropdown"
            >
              <p style="margin-top: 15px">Go to which sequence</p>
              <select
                style="margin-top: 30px"
                name="sequence-button1"
                id="sequence-button1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="1">3</option>
                <option value="2">4</option>
                <option value="1">5</option>
                <option value="2">6</option>
                <option value="1">7</option>
                <option value="2">8</option>
                <option value="1">9</option>
                <option value="2">10</option>
              </select>
              <br />
              <select
                style="margin-top: 35px"
                name="sequence-button1"
                id="sequence-button1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="1">3</option>
                <option value="2">4</option>
                <option value="1">5</option>
                <option value="2">6</option>
                <option value="1">7</option>
                <option value="2">8</option>
                <option value="1">9</option>
                <option value="2">10</option></select
              ><br />
              <select
                style="margin-top: 35px"
                name="sequence-button1"
                id="sequence-button1"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="1">3</option>
                <option value="2">4</option>
                <option value="1">5</option>
                <option value="2">6</option>
                <option value="1">7</option>
                <option value="2">8</option>
                <option value="1">9</option>
                <option value="2">10</option>
              </select>
            </div>
          </div>
          <div
            class="card text-center d-flex justify-content-center"
            style="height: 50px; width: 200px"
            type="submit"
            @click="addOption()"
          >
            Add option
          </div>
        </div>
      </div>
    </div>
    <div id="myModal" class="modals text-center" @click="closeDialog()">
      <!-- Modal content -->
      <div class="modals-content">
        <span @click="closeDialog()" ref="coba" class="close">&times;</span>
        <p>Create Sequence</p>

        <div class="card d-flex justify-content-center text-center">
          <h4>Choose an action:</h4>
          <div
            class="d-flex justify-content-center text-center"
            style="margin-top: 10px"
          >
            <div
              class="card d-flex justify-content-center text-center"
              style="width: 250px; height: 50px; margin-right: 10px"
              @click="
                hideSequence();
                toPage('Dialogue');
              "
              type="submit"
            >
              <router-link to="">Dialogue</router-link>
            </div>
            <div
              class="card d-flex justify-content-center text-center"
              style="width: 250px; height: 50px; margin-right: 10px"
              @click="
                hideSequence();
                toPage('QnA');
              "
              type="submit"
            >
              <router-link to="">QnA</router-link>
            </div>
            <div
              class="card d-flex justify-content-center text-center"
              style="width: 250px; height: 50px; margin-right: 10px"
              @click="
                hideSequence();
                toPage('Branching');
              "
              type="submit"
            >
              <router-link to="">Branching</router-link>
            </div>
          </div>
        </div>

        <div class="modals" id="dialogContent" @click="closeDialog2">
          <div></div>
        </div>

        <!-- buat dialog untuk QnA dan Branching -->

        <!-- Div isi dari konten pop-up create sequence -->
        <div id="kontenDialogue" v-if="showDialogue">
          <div class="manage-content">
            <n-button type="info" round @click.native="addDialog()"
              >Add Dialogue
            </n-button>
            <div
              v-for="(item, index) in listDialog"
              :key="index"
              class="card-content2 mb-4"
            >
              <div class="left-side2">
                <div class="img-tag"></div>
                <div class="text-tag">
                  <fg-input
                    v-model="listDialog[index].char_name"
                    label="Character Name"
                    placeholder="Character Name"
                    value=""
                    style="width: 300px"
                    type="text"
                  >
                  </fg-input>
                  <fg-input
                    v-model="listDialog[index].char_dialogue"
                    label="Character Dialogue"
                    placeholder="Character Dialogue"
                    value=""
                    style="width: 300px"
                    type="text"
                  >
                  </fg-input>
                </div>
              </div>
              <div class="right-side2">
                <div
                  style="display:flex;flex-direction:column;width:500px;marg"
                >
                  <div class="select-font" style="margin-left: 0px">
                    Select Character :
                  </div>
                  <div
                    class="galery-img"
                    style="width: 500px; margin-left: auto"
                  >
                    <span
                      v-for="(item2, index2) in dataCharacter"
                      :key="index2"
                      @click="listDialog[index].char_img_url = item2"
                    >
                      <img
                        :src="item2"
                        class="card-gall2"
                        :style="
                          listDialog[index].char_img_url === item2
                            ? ' border: 5px solid red'
                            : ''
                        "
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;width:535px;marg">
              <div class="select-font" style="">Select Background :</div>
              <div class="galery-img" style="width: 535px; margin-left: 15px">
                <span
                  v-for="(item3, index3) in dataBackground"
                  :key="index3"
                  @click="activeItem2 = item3"
                >
                  <img
                    :src="item3"
                    class="card-gall2"
                    :style="
                      activeItem2 === item3 ? ' border: 5px solid red' : ''
                    "
                  />
                </span>
              </div>
            </div>
            <n-button
              type="info"
              class="ml-2 mt-4"
              block
              round
              @click.native="saveDialog()"
            >
              <i class="fa fa-save"></i> Save
            </n-button>
          </div>
        </div>

        <div class="edit-lesson">
          <div class="form-less">
            <!-- <fg-input
              v-model="dialog_name"
              class="col-sm-12 col-12"
              label="Name"
              placeholder=""
              value=""
              type="text"
            >
            </fg-input> -->

            <!-- <div class="select-font">
              Upload file : <br />
              <input
                id="file-upload"
                ref="file"
                class="custom-file-upload"
                type="file"
                style="display: inline-block; cursor: pointer; margin-top: 10px"
                @change="changeImage2($event)"
              />
            </div> -->
          </div>
        </div>

        <!-- div dialog -->
      </div>
    </div>
    <div id="myModal2" class="modals" @click="closeDialog2()">
      <!-- Modal content -->
      <div class="modals-content">
        <span @click="closeDialog2()" class="close close2" id="closed"
          >&times;</span
        >
        <p>Edit Sequence</p>

        <div class="edit-lesson">
          <div class="form-less">
            <fg-input
              v-model="editSequence.name"
              class="col-sm-12 col-12"
              label="Name"
              placeholder=""
              value=""
              type="text"
            >
            </fg-input>

            <div
              v-if="
                editSequence.bgm_url === null || editSequence.bgm_url === ''
              "
              class="select-font"
            >
              Upload file : <br />
              <input
                id="file-upload"
                ref="file"
                class="custom-file-upload"
                type="file"
                style="display: inline-block; cursor: pointer; margin-top: 10px"
                @change="changeImage3($event)"
              />
            </div>
            <div v-else>
              <div class="select-font mt-4">
                Upload file : <br />
                <audio :src="audioUrl" controls>
                  Your browser does not support the audio element.
                </audio>
                <n-button
                  type="danger"
                  style="width: 200px"
                  block
                  @click.native="editSequence.bgm_url = ''"
                >
                  <i class="fa fa-trash mr-2"></i> Delete File
                </n-button>
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;width:535px;marg">
            <div class="select-font" style="">Select Background :</div>
            <div class="galery-img" style="width: 535px; margin-left: 15px">
              <span
                v-for="(item3, index3) in dataBackground"
                :key="index3"
                @click="editSequence.bg_url = item3"
              >
                <img
                  :src="item3"
                  class="card-gall2"
                  :style="
                    editSequence.bg_url === item3
                      ? ' border: 5px solid red'
                      : ''
                  "
                />
              </span>
            </div>
          </div>
        </div>

        <div class="manage-content">
          <n-button type="info" round @click.native="addDialog2()"
            >Add Dialogue
          </n-button>
          <div
            v-for="(item, index) in editSequence.dialogues"
            :key="index"
            class="card-content2 mb-4"
          >
            <div class="left-side2">
              <div class="img-tag">
                <div class="icon-drag" @click="deleteDialog(item)">
                  <svg
                    fill="#000000"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="44px"
                    height="44px"
                    viewBox="0 0 482.428 482.429"
                    xml:space="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <path
                            d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"
                          ></path>
                          <path
                            d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                          ></path>
                          <path
                            d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                          ></path>
                          <path
                            d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div class="text-tag ml-6">
                <fg-input
                  v-model="editSequence.dialogues[index].character_name"
                  label="Character Name"
                  placeholder="Character Name"
                  value=""
                  style="width: 300px"
                  type="text"
                >
                </fg-input>
                <fg-input
                  v-model="editSequence.dialogues[index].character_dialogue"
                  label="Character Dialogue"
                  placeholder="Character Dialogue"
                  value=""
                  style="width: 300px"
                  type="text"
                >
                </fg-input>
              </div>
            </div>
            <div class="right-side2">
              <div style="display:flex;flex-direction:column;width:500px;marg">
                <div class="select-font" style="margin-left: 0px">
                  Select Character :
                </div>
                <div class="galery-img" style="width: 500px; margin-left: auto">
                  <span
                    v-for="(item2, index2) in dataCharacter"
                    :key="index2"
                    @click="
                      editSequence.dialogues[index].character_thumbnail = item2
                    "
                  >
                    <img
                      :src="item2"
                      class="card-gall2"
                      :style="
                        editSequence.dialogues[index].character_thumbnail ===
                        item2
                          ? ' border: 5px solid red'
                          : ''
                      "
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <n-button
            type="info"
            class="ml-2 mt-4"
            block
            round
            @click.native="editDialog()"
          >
            <i class="fa fa-edit"></i> Update
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { Dropdown, Table, TableColumn } from "element-ui";
import { Button, Pagination, FormGroupInput, Alert } from "@/components";

export default {
  components: {
    draggable,
    [FormGroupInput.name]: FormGroupInput,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,
    [Alert.name]: Alert,
    [Pagination.name]: Pagination,
    Dropdown,
  },
  data() {
    return {
      isPage: "Dialogue",
      host: "https://api-lightspace.primeskills.id/api",
      uuid: "",
      data: {},
      name: "",
      description: "",
      imageData: null,
      imageUrl: null,
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      isLoading4: false,
      message4: null,
      message3: null,
      message2: null,
      message: null,
      sequences: [],
      content_name: "",
      content_desc: "",
      id: "",
      dialog_name: "",
      fileData: null,
      fileData2: null,
      bgData: null,
      bgUrl: null,
      char_name: "",
      char_dialog: "",
      dataCharacter: [],
      selectedCharacter: null,
      dataBackground: [],
      selectedBackground: null,
      activeItem: "",
      activeItem2: "",
      listDialog: [
        {
          char_name: "",
          char_img_url: "",
          char_dialogue: "",
          char_sequence: "",
        },
      ],
      editSequence: {},
    };
  },
  computed: {
    audioUrl() {
      return this.editSequence.bgm_url;
    },
  },
  mounted() {
    this.uuid = this.$route.params.index;
    this.getData();
    this.getDataCharacter();
    this.getDataBackground();
  },
  methods: {
    toPage(data) {
      this.isPage = data;
    },
    addOption() {
      window.alert("Saved, Directing...");
    },
    AddOptionMessage() {
      window.alert("Option Added.");
    },
    openScroll() {
      openScroll = true;
    },
    closeScroll() {},

    async deleteDialog(dialog) {
      await this.$axios
        .delete(`${this.host}/lesson/sequence/dialog/${dialog.id}/delete`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let index = this.editSequence.dialogues.findIndex(
            (x) => x.id === dialog.id
          );
          this.editSequence.dialogues.splice(index, 1);
        });
    },
    async toDeleteLessonDialog(dialog) {
      await this.$axios
        .delete(`${this.host}/lesson/sequence/${dialog.id}/delete`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {
            sequence: dialog.lesson_id,
          },
        })
        .then((res) => {
          this.getData();
          // let index = this.editSequence.dialogues.findIndex(
          //   (x) => x.id === dialog.id
          // );
          // this.editSequence.dialogues.splice(index, 1);
        });
    },
    toEdit(data) {
      console.log(data);
      this.editSequence = data;

      var modal = document.getElementById("myModal2");
      modal.style.display = "block";
    },
    async saveDialog() {
      var audioLink = null;

      if (this.fileData !== null) {
        let data = new FormData();
        data.append("file", this.fileData);

        await this.$axios
          .post(this.host + "/s3/upload/music", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(async (res) => {
            if (res.status === 200) {
              audioLink = res.data.data;
            }
          });
      } else {
        audioLink =
          "https://petralms.s3.ap-southeast-1.amazonaws.com/attachments/beanfeast.mp3";
      }
      for (let i = 0; i < this.listDialog.length; i++) {
        this.listDialog[i].char_sequence = i + 1;
      }
      const data = {
        dialog: {
          name: this.dialog_name,
          bg_url: this.activeItem2,
          bgm_url: audioLink,
        },
        dialog_list: this.listDialog,
      };
      await this.$axios
        .post(this.host + "/lesson/" + this.id + "/dialog", data, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("res : ", res);
          if (res.status === 200 || res.status === 201) {
            this.message3 = "Success !";
            document.getElementById("myModal").click();
            this.getData();
            this.getDataCharacter();
            this.getDataBackground();
          }
        })
        .catch((error) => {
          console.log("error : ", error);
        });
    },
    async editDialog() {
      this.isLoading4 = true;
      this.message4 = "Loading ....";
      if (
        this.editSequence.bgm_url === null ||
        this.editSequence.bgm_url === ""
      ) {
        var data = new FormData();
        data.append("file", this.fileData2);

        await this.$axios
          .post(this.host + "/s3/upload/music", data, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(async (res) => {
            if (res.status === 200) {
              var seq = [];
              this.editSequence.dialogues.forEach((key, index) => {
                seq.push({
                  id: key.id,
                  char_name: key.character_name,
                  char_img_url: key.character_thumbnail,
                  char_dialogue: key.character_dialogue,
                  char_sequence: parseInt(key.sequence),
                });
              });
              const data = {
                dialog: {
                  id: this.editSequence.id,
                  name: this.editSequence.name,
                  bg_url: this.editSequence.bg_url,
                  bgm_url: res.data.data,
                },
                dialog_list: seq,
              };
              await this.$axios
                .put(
                  this.host +
                    "/lesson/" +
                    this.editSequence.lesson_id +
                    "/dialog",
                  data,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  console.log("res : ", res);
                  if (res.status === 200 || res.status === 201) {
                    document.getElementById("myModal2").click();
                    this.getData();
                    this.getDataCharacter();
                    this.getDataBackground();
                  }
                })
                .catch((error) => {
                  const keys = Object.keys(error.response.data.errors);
                  const arr = [];
                  keys.forEach((key, index) => {
                    arr.push(error.response.data.errors[key]);
                  });
                  this.message4 = arr.join();
                });
            }
            console.log(res);
          })
          .catch((error) => {
            const keys = Object.keys(error.response.data.errors);
            const arr = [];
            keys.forEach((key, index) => {
              arr.push(error.response.data.errors[key]);
            });
            this.message4 = arr.join();
          });
      } else {
        var seq = [];
        this.editSequence.dialogues.forEach((key, index) => {
          seq.push({
            id: key.id,
            char_name: key.character_name,
            char_img_url: key.character_thumbnail,
            char_dialogue: key.character_dialogue,
            char_sequence: parseInt(key.sequence),
          });
        });
        const data = {
          dialog: {
            id: this.editSequence.id,
            name: this.editSequence.name,
            bg_url: this.editSequence.bg_url,
            bgm_url: this.editSequence.bgm_url,
          },
          dialog_list: seq,
        };
        await this.$axios
          .put(
            this.host + "/lesson/" + this.editSequence.lesson_id + "/dialog",
            data,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            console.log("res : ", res);
            if (res.status === 200 || res.status === 201) {
              document.getElementById("myModal2").click();
              this.getData();
              this.getDataCharacter();
              this.getDataBackground();
            }
          })
          .catch((error) => {
            const keys = Object.keys(error.response.data.errors);
            const arr = [];
            keys.forEach((key, index) => {
              arr.push(error.response.data.errors[key]);
            });
            this.message4 = arr.join();
          });
      }
    },
    addSequence() {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    hideSequence() {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    },
    showSequenceModal() {
      this.closeDialog();
    },
    addDialog() {
      this.listDialog.push({
        char_name: "",
        char_img_url: "",
        char_dialogue: "",
        char_sequence: "",
      });
    },
    addDialog2() {
      this.editSequence.dialogues.push({
        id: null,
        character_name: "",
        character_thumbnail: "",
        character_dialogue: "",
        sequence: this.editSequence.dialogues.length + 1,
      });
    },
    closeDialog() {
      console.log("close ");
      var modal = document.getElementById("myModal");
      // var modal2 = document.getElementById("btnclose");
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      // modal2.onclick = function() {
      //   modal.style.display = "none";
      // }
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    closeDialog2() {
      var modal = document.getElementById("myModal2");
      var span = document.getElementsByClassName("close2")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
    toDelete() {
      this.imageData = null;
      this.imageUrl = null;
    },
    toDelete3() {
      this.bgData = null;
      this.bgUrl = null;
    },
    changeImage2(file) {
      const { files } = event.target;
      if (files && files[0]) {
        if (files[0].size / 1023.4 > 5000) {
          this.isLoading = true;
          this.message = "Image size can not exceed 5 MB!";
        } else {
          this.fileData = files[0];
        }
      }
    },
    changeImage3(file) {
      const { files } = event.target;
      if (files && files[0]) {
        if (files[0].size / 1023.4 > 5000) {
          this.isLoading = true;
          this.message = "Image size can not exceed 5 MB!";
        } else {
          this.fileData2 = files[0];
        }
      }
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
    async updateLesson() {
      this.isLoading2 = true;
      this.message2 = "Loading ....";
      if (this.imageData !== null || this.imageUrl !== null) {
        var img = "";
        if (this.imageData === null) {
          img = this.imageUrl;
          const data = {
            name: this.name,
            description: this.description,
            thumbnail: img,
          };
          await this.$axios
            .put(this.host + "/lesson/" + this.id + "/update", data, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log("put  :", res);
              this.message2 = "Edit success !";
            })
            .catch((error) => {
              const keys = Object.keys(error.response.data.errors);
              const arr = [];
              keys.forEach((key, index) => {
                arr.push(error.response.data.errors[key]);
              });
              this.message2 = arr.join();
            });
        } else {
          this.message2 = "Uploading ...";
          var data = new FormData();
          data.append("file", this.imageData);

          await this.$axios
            .post(this.host + "/s3/upload/image", data, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then(async (res) => {
              if (res.status === 200) {
                const data = {
                  name: this.name,
                  description: this.description,
                  thumbnail: res.data.data,
                };
                await this.$axios
                  .put(this.host + "/lesson/" + this.id + "/update", data, {
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then((res) => {
                    this.message2 = "Edit success !";
                  })
                  .catch((error) => {
                    const keys = Object.keys(error.response.data.errors);
                    const arr = [];
                    keys.forEach((key, index) => {
                      arr.push(error.response.data.errors[key]);
                    });
                    this.message2 = arr.join();
                  });
              }
            })
            .catch((error) => {
              const keys = Object.keys(error.response.data.errors);
              const arr = [];
              keys.forEach((key, index) => {
                arr.push(error.response.data.errors[key]);
              });
              this.message2 = "Error !" + arr.join();
            });
        }
      } else {
        this.message2 = "Image is required !";
      }
    },
    async getData() {
      await this.$axios
        .get(this.host + "/find-lesson", {
          params: {
            uuid: this.uuid,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("find  :", res);
          const data = res.data.data;
          this.id = data.id;
          this.data = data;
          this.name = data.name;
          this.description = data.description;
          if (data.thumbnail !== "") {
            this.imageUrl = data.thumbnail;
            this.imageData = null;
          }
          this.sequences = data.sequences;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    async getDataCharacter() {
      await this.$axios
        .get(this.host + "/s3/character", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("getDataCharacter  :", res);
          const data = res.data.data;
          this.dataCharacter = data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    async getDataBackground() {
      await this.$axios
        .get(this.host + "/s3/background", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("dataBackground  :", res);
          const data = res.data.data;
          this.dataBackground = data;
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    increaseQuantity(row) {
      row.quantity++;
      this.computeAmount(row);
    },
    decreaseQuantity(row) {
      if (row.quantity > 1) {
        row.quantity--;
        this.computeAmount(row);
      }
    },
    computeAmount(row) {
      row.amount = row.quantity * row.price;
    },
  },
};
</script>
<style scoped>
.edit-lesson {
  display: flex;
  flex-direction: row;
}
.form-less {
  width: 100%;
}
.img-less {
  width: 100%;
}
.select-font {
  color: #2c2c2c;
  font-size: 14px;
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  margin-left: 10px;
  margin-left: 15px;
  margin-bottom: 10px;
}
.list-char {
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
}
.data-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.item-char {
  height: 100px;
  width: 100px;
  border-radius: 10px;
}
.item-char:active {
  border: 3px solid #005af0;
}
.galery-img {
  display: flex;
  flex-direction: row;
  width: 200px;
  flex-wrap: wrap;
  gap: 7px;
}
.card-gall {
  height: 40px;
  width: 40px;
  object-fit: cover;
  border-radius: 0.25rem !important;
}
.card-gall2 {
  cursor: pointer;
  height: 100px;
  width: 100px;
  border: 1px solid grey;
  object-fit: cover;
  border-radius: 0.25rem !important;
}
.card-content2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #d5d7da;
  border-right: 1px solid #d5d7da;
  border-bottom: 1px solid #d5d7da;
  border-left: 7px solid #a5dff8;
  padding: 10px;
  border-radius: 10px;
}
.right-side2 {
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  float: right;
  align-items: center;
}
.img-tag {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.text-tag {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.left-side2 {
  display: flex;
  flex-direction: row;
}
.icon-drag {
  cursor: pointer;
  width: 20px;
  margin-right: 19px;
  margin-left: 5px;
}
.img-drag {
  height: 100px;
  width: 200px;
}
.name2 {
  font-size: 17px;
  font-weight: 700;
  line-height: 24px;
}
.desc2 {
  margin-top: 5px;
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
}
.manage-content {
  margin-bottom: 30px;
}
.card-content {
  display: flex;
  flex-direction: row;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 10px;
}
.right-side {
  width: 100%;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}

.container1 {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 600px;
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

.form input {
  margin: 10px 0;
  width: 100%;
  background-color: #e2e2e2;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 4px;
}

/* The Modal (background) */
.modals {
  display: none;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100vh; /* Full height */
  background: red;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modals-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
