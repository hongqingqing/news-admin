import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import ArticleList from '../pages/ArticleList.vue'
import ArticlePublish from '../pages/ArticlePublish.vue'

// 使用vue的插件
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/',
      component: Home,
      name: 'home',
      children: [
        { path: 'article-list', component: ArticleList, name: 'article-list' },
        { path: 'article-publish', component: ArticlePublish, name: 'article-publish' }
      ]
    }
  ]
})

// 配置导航守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
