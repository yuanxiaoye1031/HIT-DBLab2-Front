<template>
  <div class="outer">
    <MyHeader/>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            :inline="false"
            label-width="200px"
            style="width: 500px"
            :rules="rule"
        >

          <el-form-item
              label="身份证号:"
              prop="cardno"
          >
            <el-input
                v-model="ruleForm.cardno"
                placeholder="请输入身份证号"
                maxlength="18"
            />
          </el-form-item>

          <el-form-item
              label="员工姓名:"
              prop="name"
          >
            <el-input
                v-model="ruleForm.name"
                placeholder="请输入员工姓名"
                maxlength="20"
            />
          </el-form-item>

          <el-form-item
              label="手机号:"
              prop="phone"
          >
            <el-input
                v-model="ruleForm.phone"
                placeholder="请输入手机号"
                maxlength="11"
            />
          </el-form-item>

          <el-form-item
              label="性别:"
              prop="sex"
          >
            <el-radio-group v-model="ruleForm.sex">
              <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
              <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="subBox address">
            <el-form-item>
              <el-button  @click="goBack()">
                取消
              </el-button>
              <el-button
                  type="primary"
                  @click="submitForm"
              >
                保存
              </el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import axios from "axios";

export default {
  name: "AddUser",
  components: {AsideMenu, MyHeader},
  data(){
    return {
      ruleForm:{
        name:'',
        phone:'',
        sex:'',
        cardno:''
      },
      rule:{
        name: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 2,  message: '姓名长度应大于2', trigger: 'change' }
        ],
        phone:[
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          { pattern: /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/, message: '请输入正确的电话号码', trigger: 'change' },
        ],
        cardno: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {pattern: /^\d{17}[0-9X]$/,message: '请输入正确的身份证号', trigger: 'blur'}
        ],
        sex:[
          {required:true,message:'请选择性别',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    submitForm(){
      this.$refs.ruleForm.validate(valid=>{
        if(!valid){
          this.$message.error("请检查输入格式!")
          return false
        }

        // 校验合格则开始像后端发送数据

        // 提取出Form中的数据
        const params = {
          ...this.ruleForm,
          // sex: this.ruleForm.sex === '女' ? 0 : 1
        }
        console.log(params)

        axios.post("http://localhost:9990/user/addUser",params)
            .then(({data : res})=>{
              console.log(res)
              if(res.code===1) {
                this.$message.success(res.data)
                this.$router.back()
              }
              else this.$message.error(res.msg)
            })
            .catch(err=>console.log(err.message))
      })
    },
    goBack(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
