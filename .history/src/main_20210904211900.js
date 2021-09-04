import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入后台管理全局样式表
import './assets/css/global.css'
import './assets/css/me.css'
import './assets/css/iconfont.css'
import './assets/css/index.css'
// vue-baberrage的bug导致这里element ui只能npm引入
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 富文本编辑器

import prismCss from './assets/lib/prism/prism.css'
import prismjs from './assets/lib/prism/prism'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import JsEncrypt from 'jsencrypt'

// 使用Prism.js 实现漂亮的代码语法高亮 
Vue.config.productionTip = false
Vue.use(prismCss)
Vue.use(prismjs)
Vue.use(mavonEditor)
Vue.prototype.$http=axios
axios.withCredentials=true
// 当前请求为跨域类型时在请求中协带cookie
// 如果前端配置了这个withCredentials=true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你前端的源地址 办证安全避免cors
// cookie的samesite是为了防止黑客的第三方 黑客作为第三方是不可能得到用户cookie的
// 当浏览器发现不是目标和自己域名相同的地址请求的 那就不会带上自己的cookie

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// rsa是非对称加密 我们项目中用的就是irsa加密算法的一种
// 对称加密就是加密和揭秘都是同一个密钥的算法 非对称加密就是