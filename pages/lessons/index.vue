<template>
    <div class="section">
        <div class="container">
            <div class="col-md-12">
                <h2 class="title text-center">My Lessons</h2>
                
                <alert v-if="isLoading" type="success" dismissible style="margin-top:30px;">
                  {{  message }}
                </alert>
        <n-button type="info" @click.native="toCreate()">
          <i class="fab fa-plus"></i> Create New Lessons
        </n-button>
                <br/>
                <el-table class="table-striped" :data="myLesson" style="width: 100%">
                    <el-table-column header-align="center" label="Last Updated" prop="updated_at"></el-table-column>
                    <el-table-column header-align="center" align="center" label="Image">
                        <div slot-scope="{row}" class="img-container"><img :src="row.thumbnail" style="height:100px;width:140px;margin-left:auto;margin-right:auto" alt="Agenda"></div>
                      </el-table-column>
                    <el-table-column header-align="center" label="Lesson Name" prop="name"></el-table-column>
                    <el-table-column header-align="center" label="Lesson ID" prop="uuid"></el-table-column>
                    <el-table-column header-align="center" label="Action">
                      <div slot-scope="{row}">
                        <n-button type="default" icon round @click.native="toEdit(row)">
                          <i class="fa fa-edit"></i>
                        </n-button>
                        <n-button type="info" icon round @click.native="toCopy(row.uuid)">
                          <i class="fa fa-copy"></i>
                        </n-button>
                        <n-button type="success" icon round @click.native="toGame(row.uuid)">
                          <i class="fa fa-eye"></i>
                        </n-button>
                        <n-button type="danger" icon round @click.native="toDelete(row)">
                          <i class="fa fa-trash"></i>
                        </n-button>
                      </div>
                    </el-table-column>
                  </el-table>
                  <n-pagination v-if="myLesson.length > 10" :page-count="10" v-model="defaultPagination" style="margin-top:20px;margin-left:auto;margin-right:auto;width:100%"></n-pagination>

            </div>
        </div>
    </div>
</template>
<script>
import {Table, TableColumn} from 'element-ui'
import {Button, Pagination, Alert} from '@/components'


  export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Button.name]: Button,
        [Pagination.name]: Pagination,
        [Alert.name]: Alert
    },
    data() {
      return {
      host: "https://api-lightspace.primeskills.id/api",
        defaultPagination: 1,
        productsTable: [
            {
            image: 'http://vuejs.creative-tim.com/vue-now-ui-dashboard-pro/documentation/img/saint-laurent.jpg',
            title: 'Suede Biker Jacket ',
            description: 'by Saint Laurent',
            color: 'Black',
            size: 'M',
            price: 3390,
            quantity: 1,
            amount: 3390
            }
        ],
        myLesson: [],
        isLoading: false,
        message: ''
      }
    },
    mounted() {
      this.getMyLesson()
    },
    methods: {
      async toCopy (x) {

        // this.$router.push({
        //     path: `lessons/join/${x}`,
        //   });
        this.isLoading = true
        try {
          await navigator.clipboard.writeText(`${window.location.host}/lessons/join/${x}`)
          this.message = 'Link copied to clipboard.'
        } catch ($e) {
          this.message = 'Failed.'
        }
      },

      toGame (x) {


  this.$router.push({
            path: `lessons/join/${x}`,
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
        })
        .catch((error) => {
          console.log("err : ", error);
        });
    },
        toEdit (row) {
          this.$router.push({
            path: `/lessons/edit/${row.uuid}`,
          });
        },
        toCreate () {
            this.$router.push('/lessons/create')
        },
        async toDelete (row) {
          await this.$axios
            .delete(this.host + "/lesson/" + row.id + "/delete", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              this.getMyLesson()
            })
            .catch((error) => {
              console.log("err : ", error);
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
    }
  }
</script>