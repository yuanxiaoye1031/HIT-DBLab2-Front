<template>
  <el-aside width="150px" style="background-color:#eeeeee;">
    <el-menu>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item @click="gotoUser">
            <el-icon class="el-icon-user"></el-icon>
            用户信息
          </el-menu-item>
          <el-menu-item @click="gotoAddress">
            <el-icon class="el-icon-location-outline"></el-icon>
            地址管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item @click="gotoDish">
        <el-icon class="el-icon-dish"></el-icon>
        菜品管理
      </el-menu-item>
      <el-menu-item @click="gotoSetmeal">
        <el-icon class="el-icon-fork-spoon"></el-icon>
        套餐管理
      </el-menu-item>
      <el-menu-item @click="gotoOrder">
        <el-icon class="el-icon-tickets"></el-icon>
        订单管理
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "AsideMenu",
  methods:{
    gotoUser(){
      this.$router.push({
        name:'user'
      })
    },
    gotoDish(){
      this.$router.push({
        name:'dish'
      })
    },
    gotoSetmeal(){
      this.$router.push({
        name:'setmeal'
      })
    },
    gotoOrder(){
      this.$router.push({
        name:'order'
      })
    },
    gotoAddress(){
      this.$router.push({
        name:'address'
      })
    }
  }
}
</script>

<style scoped>

</style>
