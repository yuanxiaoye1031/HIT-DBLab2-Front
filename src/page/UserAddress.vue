<template>
  <div class="outer">
    <MyHeader/>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>
        <el-row style="margin-bottom: 10px;">
          <span style="font-weight:bold;">地址管理</span>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-input
                v-model="search_name"
                placeholder="请输入用户姓名"
                style="width: 250px"
                clearable
                @keyup.enter.native="handleQuery"
            >
              <i
                  slot="prefix"
                  class="el-input__icon el-icon-search"
                  style="cursor: pointer"
                  @click="handleQuery"
              ></i>
            </el-input>
          </el-col>

          <el-col :span="3" :offset="15">
            <el-button
                type="primary"
                @click="addUserAddress()"
                style="justify-content: flex-end"
            >
              + 新增地址
            </el-button>
          </el-col>

        </el-row>

        <el-row>
          <el-table
              :data="addressList"
              style="width: 100%"
          >
            <el-table-column prop="user_id" label="用户ID"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话号码"></el-table-column>
            <el-table-column prop="detail" label="详细地址"></el-table-column>
          </el-table>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import axios from "axios";

export default {
  name: "UserAddress",
  components: {AsideMenu, MyHeader},
  data(){
    return {
      addressList:[],
      search_name:''
    }
  },
  methods:{
    getAddressList(){
      axios.get("http://localhost:9990/user/getAddressList")
          .then(({data : res})=>{
            console.log(res)
            this.addressList=res.data
          })
    },
    addUserAddress(){
      this.$router.push({
        name:'addAddress'
      })
    },
    handleQuery(){
      axios.get("http://localhost:9990/user/getAddressList?name="+this.search_name)
          .then(({data : res})=>{
            console.log(res)
            this.addressList=res.data
          })
    }
  },
  mounted() {
    this.getAddressList()
  }
}
</script>

<style scoped>

</style>
