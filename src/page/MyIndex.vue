<template>
  <div class="outer">
    <MyHeader/>
    <el-container style="height: 900px">
      <AsideMenu></AsideMenu>
      <el-main>
        <el-card>
          欢迎使用外卖管理系统
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";

export default {
  name: "MyIndex",
  components: {AsideMenu, MyHeader}
}
</script>

<style scoped>

</style>
