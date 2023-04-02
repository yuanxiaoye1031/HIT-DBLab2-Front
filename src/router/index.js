//配置路由的文件

//引入Vue和VueRouter
import Vue from "vue";
import VueRouter from "vue-router";
import MyIndex from "@/page/MyIndex.vue";
import UserManage from "@/page/UserManage.vue";
import DishManage from "@/page/DishManage.vue";
import SetMealManage from "@/page/SetMealManage.vue";
import OrderManage from "@/page/OrderManage.vue";
import AddUser from "@/page/AddUser.vue";
import UserAddress from "@/page/UserAddress.vue";
import AddAddress from "@/page/AddAddress.vue";

//使用插件
Vue.use(VueRouter)

//先把VueRouter原型对象上的push方法保存一份
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

//重写push|replace
VueRouter.prototype.push=function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }
    else {
        originPush.call(this,location,()=>{},()=>{})
    }
}


//重写replace
VueRouter.prototype.replace=function (location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }
    else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
export default new VueRouter({
    //配置路由
    routes:[
        {
            //添加重定向：启动项目的时候自动重定向到首页
            path:'*',
            redirect:'/index'
        },
        {
            name:'index',
            path:'/index',
            component:MyIndex,
            meta:{
            }
        },
        {
            name:'user',
            path:'/user',
            component:UserManage
        },
        {
            name:'dish',
            path:'/dish',
            component:DishManage
        },
        {
            name:'setmeal',
            path:'/setmeal',
            component:SetMealManage
        },
        {
            name:'order',
            path:'/order',
            component:OrderManage
        },
        {
            name:'adduser',
            path:'/user/adduser',
            component:AddUser
        },
        {
            name:'address',
            path:'/user/address',
            component:UserAddress
        },
        {
            name:'addAddress',
            path:'/user/addAddress',
            component:AddAddress
        }
    ]
})
