<template>
  <div class="header-wrapper" >
    <el-header class="header" style="background-color: rgba(230, 247, 255, 0.7)" >
      <h1 class="title" @click="gotoIndex" style="cursor: pointer">外卖管理系统</h1>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  methods:{
    gotoIndex(){
      this.$router.push({
        name:'index'
      })
    }
  }
}
</script>

<style scoped>
.header-wrapper {
  position: relative;
  z-index: 999;
}
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
}
.title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
</style>
