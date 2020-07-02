import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import moment from 'moment'

// 使用插件,完整导入
Vue.use(ElementUI)

// 全局定义过滤器
Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

// 给vue原型添加一个方法,用于图片url的处理
Vue.prototype.$fixUrl = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

Vue.prototype.$axios = axios
// 给axios设置默认的URL,会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
