<template>
  <div id="navClass" class="navClass" hide-on-scroll flat height="58">
    <!-- 电脑导航栏 -->
    <div class="d-md-block d-none nav-container">
      <div class="float-left blog-title">
<!--        <router-link to="/">-->
<!--        </router-link>-->
      </div>
      <div class="float-right nav-title">
        <el-input v-model="queryString" v-if="searchFlag" style="float: top;width: 100px" placeholder="请输入内容"></el-input><i class="el-icon-circle-close" v-if="searchFlag" @click="closeSearch"></i>
        <div class="menus-item">
          <a @click="search"><i class="iconfont2 iconsousuo" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 15px">搜索</span></a>
        </div>
        <div class="menus-item">
          <router-link to="/home">
            <i class="iconfont2 iconzhuye" style="color: whitesmoke" /><span style="color: whitesmoke;margin-right: 10px">首页</span>
          </router-link>
        </div>
        <div class="user-btn">
          <a>
            <i class="el-icon-s-operation" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">类别</span>
            <ul class="user-submenu">
              <li>
                <router-link to="/types">
                  <i class="iconfont2 iconfenlei"/> 分类
                </router-link>
              </li>
              <li>
                <router-link to="/tags">
                  <i class="iconfont2 iconbiaoqian"/> 标签
                </router-link>
              </li>
            </ul>
          </a>
        </div>
        <div class="menus-item">
          <router-link to="/message">
            <i class="iconfont2 iconpinglunzu" style="color: whitesmoke"/> <span style="color: whitesmoke;margin-right: 10px">留言</span>
          </router-link>
        </div>
        <div class="user-btn">
          <a v-if="avatar===''">
            <router-link to="/login">
            <i class="iconfont2 icondenglu" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">登录</span>
            </router-link>
          </a>
          <template v-else>
            <img
              class="user-avatar"
              v-bind:src=this.avatar
              height="30"
              width="30"
            />
            <ul class="user-submenu">
              <li>
                <router-link to="/adminHome">
                  <i class="iconfont2 icongerenzhongxin" /> 个人中心
                </router-link>
              </li>
              <li>
                <router-link to="/postblogs">
                  <i class="el-icon-edit" /> 发布博客
                </router-link>
              </li>
              <li>
                <a @click="logout"><i class="iconfont2 icontuichu" /> 退出</a>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
    <SearchModel ref="searchModel"></SearchModel>
    
  </div>
</template>

<script>
import SearchModel from '../model/SearchModel'
export default{
    components:{
        SearchModel
    },
    created(){
        this.getUser()
    },
    mounted(){
        window.addEventListener('scroll',this.scroll)
    },
    data(){
        return {
            navClass:'',
            avatar:'',
            user:{},
            queryString:'',
            searchFlag:false
        }
    },
    methods:{
        toLogin(){
            let tokenStr=window.sessionStorage
        }
    }
}
</script>

<style scoped>

</style>
