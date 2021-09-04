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
// 如果前端配置了这个withCredentials=true，后段设置Access-Control-Allow-Origin不能为 " * ",必须是你的源地址
// cookie的samesite是为了防止黑客的
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
