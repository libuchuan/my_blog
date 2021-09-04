import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import(/* webpackChunkName: "Home_Types_Tag_Crawler" */ '../views/Home.vue')
Vue.use(VueRouter)

const routes = [
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
