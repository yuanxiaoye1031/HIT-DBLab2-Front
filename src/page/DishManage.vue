<template>
  <div class="outer">
    <MyHeader/>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>
        <el-row style="margin-bottom: 10px;">
          <span style="font-weight:bold;">菜品管理</span>
        </el-row>
        <el-table
            :data="dishTableData"
            stripe
            class="tableBox"
        >
          <el-table-column
              prop="dish_name"
              label="菜品名称"
              width="200px"
          ></el-table-column>

          <el-table-column
              prop="category_name"
              label="菜品分类"
              width="200px"
          ></el-table-column>
          <el-table-column label="售价" width="200px">
            <template slot-scope="scope">
              <span style="margin-right: 10px;">￥{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">
              <span style="margin-right: 10px;">{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="售卖状态" width="200px">
            <template slot-scope="scope">
              <span style="margin-right: 10px;">{{ scope.row.status == '0' ? '启售' : '停售' }}</span>
            </template>
          </el-table-column>

          <el-table-column
              label="操作"
              width="160"
              align="center"
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  class="blueBug"
                  @click="modifyDish(scope.row.id)"
              >
                修改
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  class="blueBug"
                  @click="statusHandle(scope.row)"
              >
                {{ scope.row.status === 0 ? '停售' : '启售' }}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  class="delBut non"
                  @click="deleteHandle( scope.row.id)"
                  style="color: red"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-divider></el-divider>

        <el-table
          :data="categoryWithNum"
          stripe
          class="tableBox">

          <el-table-column
            label="分类名"
            prop="category_name">
          </el-table-column>

          <el-table-column
            label="数量"
            prop="num"></el-table-column>

        </el-table>
      </el-main>
    </el-container>


    <el-dialog title="修改菜品信息" :visible.sync="dialogFormVisible">
      <el-form :model="dialogFormData">
        <el-form-item label="菜品名称" label-width="120px">
          <el-input aria-required="true" v-model="dialogFormData.dish_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="120px">
          <el-select v-model="dialogFormData.category_id" placeholder="请选择菜品分类">
            <el-option v-for="category in this.categoryList" :key="category.id" :label="category.category_name" :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input type="number" v-model="dialogFormData.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="120px">
          <el-input type="textarea" autosize
                    v-model="dialogFormData.description"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import axios from "axios";

export default {
  name: "DishManage",
  components: {AsideMenu, MyHeader},
  data(){
    return {
      dishTableData:[],
      dialogFormVisible:false,
      dialogFormData: {
        id:'',
        dish_name:'',
        category_id:'',
        price:'',
        description:''
      },
      categoryList:[],
      categoryWithNum:[]
    }
  },
  methods:{
    getDishList(){
      axios.get("http://localhost:9990/dish/getDishList")
          .then(({data:res})=>{
            this.dishTableData=res.data
          })
    },
    modifyDish(id){
      console.log(id)
      this.dishTableData.forEach(dish=>{
        if(dish.id===id){
          // 找到该菜品的信息
          console.log(dish)
          this.dialogFormData={...dish}
          this.dialogFormVisible=true
        }
      })
    },
    statusHandle(dishDto){
      console.log(dishDto)
      axios.post("http://localhost:9990/dish/changeStatus",dishDto)
          .then(({data:res})=>{
            if(res.code===1) {
              this.getDishList();
              this.$message.success(res.data)
            }
          })
    },
    deleteHandle(id){
      console.log(id)
      this.$confirm("确认要删除该菜品吗？","提示",{
        iconClass: "el-icon-question",//自定义图标样式
        confirmButtonText: "确认",//确认按钮文字更换
        cancelButtonText: "取消",//取消按钮文字更换
        showClose: true,//是否显示右上角关闭按钮
        type: "warning",//提示类型  success/info/warning/error
      }).then(function(){
          //确认操作
        }).then(() => {
          //取消操作
          console.log("删除操作")
          axios.delete("http://localhost:9990/dish/logicDel?id="+id)
              .then(({data:res})=>{
                console.log(res.data)
                if(res.code===1) this.$message.success(res.data)
                else this.$message.error(res.msg)
                this.getDishList()
              })
              .catch(err=>console.log(err))
        })
        .catch(function (err) {
          //捕获异常
          console.log("错误信息:",err)
        });
    },
    getCategoryList(){
      axios.get("http://localhost:9990/category/dishList")
          .then(({data:res})=>{
            this.categoryList=res.data
          })
    },
    handleModify(){
      console.log("修改后",this.dialogFormData)
      this.dialogFormVisible=false
      if(this.dialogFormData.dish_name==='' || this.dialogFormData.category_id==='' || this.dialogFormData.price==='' || this.dialogFormData.description===''){
        this.$message.info("内容不能为空")
      }
      else{
        axios.post("http://localhost:9990/dish/update",this.dialogFormData)
            .then(({data:res})=>{
              console.log(res.data)
              if(res.code===1) this.$message.success(res.data)
              else this.$message.error(res.msg)
              this.dialogFormData={}
              this.getDishList()
            })
            .catch(err=>console.log(err.message))
      }
    },
    getCategoryWithNum(){
      axios.get("http://localhost:9990/category/categoryWithNum")
          .then(({data:res})=>{
            this.categoryWithNum=res.data
          })
          .catch(err=>console.log(err.message))
    }

  },
  mounted() {
    this.getDishList();
    this.getCategoryList();
    this.getCategoryWithNum()
  }
}
</script>

<style scoped>

</style>
