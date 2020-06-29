import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'

// 使用插件,完整导入
Vue.use(ElementUI)

Vue.prototype.$axios = axios
// 给axios设置默认的URL,会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
