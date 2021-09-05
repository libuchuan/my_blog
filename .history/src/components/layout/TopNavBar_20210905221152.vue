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
import SearchModel from '../../model/SearchModel.vue'
// ../表示上一级 ./表示本
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
            let tokenStr=window.sessionStorage.getItem('token')
            if(!tokenStr){
                this.$confirm('登录才可以开启，请问是否先登录呀',
                '提示',{
                    type:'info'
                }).then(()=>{
                    this.$router.push('/login')
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'你选择了不登录哦'
                    })
                    return false
                })
            }
            return !!tokenStr
            // 那个转换规则 ==比较是什么来？搜搜
        },
        openRoom(){
            if(this.toLogin()){
                // this.$refs.room.openFrame()
            }
        },
        closeSearch(){
            this.searchFlag=false
        },
        search(){
            this.$refs.searchModel.setDialogVisible()

        },
        scroll(){
            const that=this
            const scrollTop=
               window.pageYOffset||
               document.documentElement.scrollTop||
               document.body.scrollTop
            that.scrolltop=scrollTop
            if(that.scrollTop>60){
                that.navClass='nav-fixed'
            }else{
                that.navClass='nav'
            }

        },
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/home')
            window.location.reload()
        },
        getUser(){
            this.user=window.sessionStorage.getItem('user')
            if(this.user!==null){
                this.nickname=JSON.parse(this.user).nickname
                thi.avatar=JSON.parse(this.user).avatar
            }
        }
    }
}
</script>

<style scoped>
 .navClass{
    /*position:fixed; !* 绝对定位，fixed是相对于浏览器窗口定位。 *!*/
    position: relative;
    top:15px; /* 距离窗口顶部距离 */
    right: 22px;
    height:10px; /* 高度 */
    float: right;
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
  i {
    margin-right: 4px;
  }
  ul {
    list-style: none;
  }
  .nav {
    background: rgba(0, 0, 0, 0) !important;
  }
  .nav a {
    color: #eee !important;
  }
  .nav .menus-item a {
    text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
  }
  .nav .blog-title a {
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  }
  .theme--light.nav-fixed {
    background: rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 5px 6px -5px rgba(133, 133, 133, 0.6);
  }
  .theme--dark.nav-fixed {
    background: rgba(18, 18, 18, 0.8) !important;
  }
  .theme--dark.nav-fixed a {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  .theme--light.nav-fixed a {
    color: #4c4948 !important;
  }
  .nav-fixed .menus-item a,
  .nav-fixed .menus-btn a,
  .nav-fixed .blog-title a {
    text-shadow: none;
  }
  .nav-container {
    font-size: 14px;
    width: 100%;
    height: 100%;
  }
  .nav-mobile-container {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .blog-title,
  .nav-title {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .blog-title a {
    font-size: 18px;
    font-weight: bold;
  }
  .user-btn,
  .menus-btn,
  .menus-item {
    position: relative;
    display: inline-block;
    margin: 0 0 0 0.875rem;
  }
  .menus-btn a,
  .menus-item a {
    transition: all 0.2s;
  }
  .nav-fixed .menus-btn a:hover,
  .nav-fixed .menus-item a:hover {
    color: #49b1f5 !important;
  }
  .menus-item a:hover:after {
    width: 100%;
  }
  .menus-item a:after {
    position: absolute;
    bottom: -5px;
    left: 0;
    z-index: -1;
    width: 0;
    height: 3px;
    background-color: #80c8f8;
    content: "";
    transition: all 0.3s ease-in-out;
  }
  .user-btn a {
    transition: all 0.2s;
  }
  .user-avatar {
    cursor: pointer;
    border-radius: 50%;
  }
  .user-btn:hover .user-submenu {
    display: block;
  }
  .user-submenu {
    position: absolute;
    display: none;
    right: 0;
    width: max-content;
    margin-top: 8px;
    box-shadow: 0 5px 20px -4px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    animation: submenu 0.3s 0.1s ease both;
    /* 动画名称 动画所需时间 延迟时间 ease表示运动效果  
      both 规定动画在播放之前或之后，其动画效果可见 */
  }
  .user-submenu:before {
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 20px;
    content: "";
  }
  .user-submenu a {
    line-height: 2;
    color: #4c4948 !important;
    text-shadow: none;
    display: block;
    padding: 6px 14px;
  }
  .user-submenu a:hover {
    background: #4ab1f4;
  }
  @keyframes submenu {
    0% {
      opacity: 0;
      /* css3特性  */
      filter: alpha(opacity=0);
      /* filter是ie特有的 兼容ie的 透明度为0 */
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      filter: none;
      transform: translateY(0);
      /* 沿着y轴方向平移10px 会覆盖在其他div上面但不会影响别的div位置*/
    }
  }
  /* 
   transition需要触发一个事件才会随着时间改变其css属性 从0到设置的属性
      all指的是所有可以改变的属性 从无到有需要0.2s
      设置过渡时的变化方式，默认是 ease，即速度由慢到快再到慢，常用的还有 linear，线性变化速度均匀
   animation就是设置关键帧 @keyframes后面跟的是自定义的动画名称

  */
</style>
