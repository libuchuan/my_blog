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
import nProgress from 'nprogress'

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

Vue.prototype.$encrypTion=function(obj){
  const encrypt=new JsEncrypt()
  encrypt.setPublicKey('MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzSJK+Pc1IdFWz83FWvKH' +
  'kTLmHq87J+5ndEdlH86c9AcSlaj4hyTWyaQOP8WPuvDfxL93TbYUEQ8bidHwyVAI' +
  'THoDABDQqBr0mDTfTqogHxWaqjEUh+g+y96KfshmD312lZD3cMxSrgA1NUlTBMpT' +
  'JQ+GQ1Rn0qVaVAi6OziAct9HEeFupJiw09sLzQTt5zY5s/KOgjQ7wPck4pGxO3tl' +
  'p/Iwws7WyabOjPm1z7XxcHWsetO9H6nKeJ8WaZ6P6baFasiNuhiBOvnGslRJ0Dgd' +
  'xsz7+feK3JbIwHr6vVfhJ9Bn2rnSYqpydg3odMyU54/lV0kdWup7SbJILAtaS8kv' +
  'EwIDAQAB')
  return encrypt.encrypt(obj)
  // 设置公钥进行加密  这里只有加密功能 解密需要私钥吧
}
axios.interceptors.request.use(config=>{
    NProgress.start()
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
})

axios.interceptors.response.use(config=>{
    NProgress.done()
    return config
})
Vue.config.productionTip=false
// 阻止启动生产消息，常用作指令。优化性能 true的话会在生产模式的时候显示消息 但无用 我们在开发环境下可以提供这些警告帮助我们但是生产环境下没用
//  还会增加应用体积 在生产环境下 还会有一些运行时候开销 不好不好
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// rsa是非对称加密 我们项目中用的就是rsa加密算法的一种
// 对称加密就是加密和揭秘都是同一个密钥的算法 非对称加密就是加密和解密需要不同密钥
// rsa：乙方生成公钥和私钥，私钥是保密的 甲方获取乙的公钥用它对信息加密 乙方得到加密后信息用私钥解密
// 因为公钥加密的信息只用私钥才能解的开，所以只要私钥不泄露，通信就是安全的。
// 甲方也有私钥公钥 乙方也有 所以不只是甲方向乙方传信息安全
// 私钥用来解密 公钥用来加密 私钥负责签名，公钥负责验证。
// 在签名算法中，私钥用于对数据进行签名，公钥用于对签名进行验证。
// rsa的加密和数字认证是结合起来的 rsa签名体制和加密算法 