<template>
  <div class="outer">
    <MyHeader/>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>

        <el-row style="margin-bottom: 10px;">
          <span style="font-weight:bold;">套餐管理</span>
        </el-row>


        <el-table
            :data="setMealTableData"
            stripe
            class="tableBox"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.dishList"
              >
                <el-table-column
                  prop="dish_name"
                  label="菜名"
                ></el-table-column>

                <el-table-column
                    prop="number"
                    label="数量"
                ></el-table-column>

                <el-table-column

                    label="菜品原价"
                >
                  <template slot-scope="scope">
                    <span style="margin-right: 10px;text-decoration: line-through;">￥{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>

          </el-table-column>

          <el-table-column
              prop="setmeal_name"
              label="套餐名称"
              width="200px"
          ></el-table-column>

          <el-table-column
              prop="category_name"
              label="套餐分类"
              width="200px"
          ></el-table-column>
          <el-table-column label="售价" width="200px">
            <template slot-scope="scope">
              <span style="margin-right: 10px;">￥{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column label="描述" >
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";
import axios from "axios";

export default {
  name: "SetMealManage",
  components: {AsideMenu, MyHeader},
  data(){
    return {
      setMealTableData:[]
    }
  },
  methods:{
    getSetMealList(){
      axios.get("http://localhost:9990/setmeal/list")
          .then(({data:res})=>{
            if(res.code===1){
              this.setMealTableData=res.data
              console.log(res.data)
            }
          })
          .catch(err=>console.log(err))
    },
    modifyDish(){

    },
    statusHandle(){

    },
    deleteHandle(id){
      console.log(id)
    }
  },
  mounted() {
    this.getSetMealList()
  }
}
</script>

<style scoped>

</style>
