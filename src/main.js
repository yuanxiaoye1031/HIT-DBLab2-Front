import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//引入路由
import router from "@/router";

//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router, //注册路由

}).$mount('#app')
