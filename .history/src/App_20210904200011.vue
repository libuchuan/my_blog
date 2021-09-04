<template>
  <div id="app">
    <TopNavBar v-show="( path==='/home' || path==='/types'||
    )"></TopNavBar>
    <AdminTopNavBar v-show="false" ></AdminTopNavBar>
    <router-view/>
  </div>
</template>
<script>
import Vue from 'vue'
import TopNavBar from './components/layout/TopNavBar'
import AdminTopNavBar from './components/layout/AdminTopNavBar'

export default{
  data(){
    return {
      path:'',
      myApp:new Vue()
    }
  },
  components:{
    TopNavBar,
    AdminTopNavBar
  },
  mounted(){
    this.path=this.$route.path
  },
  watch:{
    $route(to,from){
      this.path=to.path
    }
  }
}

</script>

<style lang="less">

</style>
