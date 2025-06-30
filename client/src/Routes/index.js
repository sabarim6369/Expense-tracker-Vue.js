import { createRouter,createWebHistory } from "vue-router";
import DashboardPage from "../components/Dashboard/DashboardPage.vue"
import LoginPage from "../components/Login/LoginPage.vue"
import SignupPage from "../components/Signup/SignupPage.vue"
const routes=[
    {
        path:"/",
        redirect:"/login"
    },
    {
    path:"/login",
    component:LoginPage
    },
    {
        path:"/signup",
        component:SignupPage
    },
    {
        path:"/dashboard",
        component:DashboardPage
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})
router.beforeEach((to,from,next)=>{
    const unprotectedroutes=["/login","/signup"];
    const isauthenticated=localStorage.getItem("token");
    if(!isauthenticated&&!unprotectedroutes.includes(to.path)){
        next('/login')
    }
       else if (isauthenticated && unprotectedroutes.includes(to.path)) {
    next("/dashboard")
  }
  else{
    next();

  }
})
export default router