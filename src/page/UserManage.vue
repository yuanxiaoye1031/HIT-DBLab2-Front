<template>
  <div class="outer">
    <MyHeader/>
    <el-container style="height: 900px">
      <AsideMenu></AsideMenu>
      <el-main>
        <el-row style="margin-bottom: 10px;">
          <span style="font-weight:bold;">用户管理</span>
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
                @click="addMemberHandle('add')"
                style="justify-content: flex-end"
            >
              + 添加用户
            </el-button>
          </el-col>

        </el-row>

        <el-row>
          <el-table
              :data="userDataList"
              style="width: 100%"
          >
            <el-table-column prop="id" label="ID" width="80px"></el-table-column>
            <el-table-column prop="cardno" label="身份证号"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="phone" label="电话号码"></el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="scope">
                {{ String(scope.row.sex) === '0' ? '女' : '男' }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="用户状态">
              <template slot-scope="scope">
                {{ String(scope.row.status) === '0' ? '正常' : '已禁用' }}
              </template>
            </el-table-column>
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
  name: "UserManage",
  components: { AsideMenu, MyHeader},
  data(){
    return {
      search_name:"",
      userDataList:[]
    }
  },
  methods:{
    handleQuery(){
      if(this.search_name===''){
        this.getUserList()
        return
      }
      axios.get("http://localhost:9990/user?name="+this.search_name)
          .then(({data : res})=>{
            console.log(res)
            this.userDataList=res.data
          })
          .catch(err=>console.log(err.message))
    },
    addMemberHandle(){
      this.$router.push('/user/adduser')
    },
    getUserList(){
      axios.get("http://localhost:9990/user/userList")
          .then(({data:res})=>{
            console.log(res)
            // res.data.forEach(item=>{this.userDataList.push(item)})
            this.userDataList=res.data
      })
          .catch(err=>{console.log(err.message)})
    }
  },
  mounted() {
    this.getUserList();
  }
}
</script>

<style scoped>

</style>
