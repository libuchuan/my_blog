import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/Home.vue')
// const PostBlogs = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/PostBlogs.vue')
const Blogs = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Blogs.vue')
// const Types2 = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Types2.vue')
// const Tags2 = () => import(/* webpackChunkName: "admin" */ '../views/admin/blogs/Tags2.vue')

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'home'},
  {path:'/login',component:Login},
  {
    path:'/home',
    name:'Home',
    component:Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
