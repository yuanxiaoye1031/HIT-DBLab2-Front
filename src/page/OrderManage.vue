<template>
  <div class="outer">
    <MyHeader/>
    <el-container>
      <AsideMenu></AsideMenu>
      <el-main>
        这是订单管理页
      </el-main>
    </el-container>
  </div>

</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import AsideMenu from "@/components/AsideMenu.vue";

export default {
  name: "OrderManage",
  components: {AsideMenu, MyHeader}
}
</script>

<style scoped>

</style>
