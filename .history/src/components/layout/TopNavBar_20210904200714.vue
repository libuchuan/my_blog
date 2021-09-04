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
        <div class="menus-item">
          <router-link to="">
            <i class="el-icon-headset" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">音乐盒</span>
          </router-link>
        </div>
        <div class="menus-item" @click="openRoom">
          <router-link to="">
            <i class="el-icon-chat-line-round" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">聊天室</span>
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
          <router-link to="">
            <i class="iconfont2 iconguidang" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">归档</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="">
            <i class="iconfont2 iconlianjie" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">友链</span>
          </router-link>
        </div>
        <div class="menus-item">
          <router-link to="/message">
            <i class="iconfont2 iconpinglunzu" style="color: whitesmoke"/> <span style="color: whitesmoke;margin-right: 10px">留言</span>
          </router-link>
        </div>
        <div class="user-btn">
          <a>
            <i class="el-icon-sugar" style="color: whitesmoke"/><span style="color: whitesmoke;margin-right: 10px">后花园</span>
            <ul class="user-submenu">
              <li>
                <router-link to="">
                  <i class="el-icon-magic-stick"/> 爬虫
                </router-link>
              </li>
              <li>
                <router-link to="">
                  <i class="user secret icon"/> AI
                </router-link>
              </li>
              <li>
                <router-link to="/about">
                  <i class="iconfont2 iconzhifeiji"/> 关于我
                </router-link>
              </li>
            </ul>
          </a>
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
    <Room ref="room"></Room>
  </div>
</template>

<script>
import SearchModel from '../model/SearchModel'
import Room from '../../views/backyard/Room'
export default {
  components: {
    Room,
    SearchModel
  },
  created () {
    this.getUser()
  },
  mounted () {
    window.addEventListener('scroll', this.scroll)
  },
  // data: function () {
  //   return {
  //
  //   }
  // },
  data () {
    return {
      navClass: '',
      avatar: '',
      user: {},
      queryString: '',
      searchFlag: false
    }
  },
  methods: {
    toLogin () {
      const tokenStr = window.sessionStorage.getItem('token')
      // 后端指定接口验证了token的正确性
      if (!tokenStr) {
        this.$confirm('登录后才能开启聊天室，请问是否先登录？', '提示', { // 确认框
          type: 'info'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你选择不登录'
          })
          return false
        })
      }
      return !!tokenStr
    },
    openRoom () {
      if (this.toLogin()) { this.$refs.room.openFrame() }
    },
    closeSearch () {
      this.searchFlag = false
    },
    search () {
      this.$refs.searchModel.setDialogVisible()
      // this.searchFlag = true
      // if (this.queryString !== '') {
      //   sessionStorage.setItem('queryString', this.queryString)
      //   this.queryString = ''
      //   this.searchFlag = false
      //   if (this.$route.path === '/home') { window.location.reload() } else {
      //     this.$router.push('/home')
      //   }
      // }
    },
    scroll () {
      const that = this
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.navClass = 'nav-fixed'
      } else {
        that.navClass = 'nav'
      }
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/home')
      // 刷新页面，删除vuex数据
      window.location.reload()
    },
    getUser () {
      this.user = window.sessionStorage.getItem('user')
      if (this.user != null) {
        this.nickname = JSON.parse(this.user).nickname
        this.avatar = JSON.parse(this.user).avatar
      }
    }
  },
  computed: {
    // avatar () {
    //   return this.avatar
    // }
  }
}
</script>

<style scoped>

</style>
