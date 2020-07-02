<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">头条后台</div>
        <el-row class="tac">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            :default-active="$route.path"
            >
            <el-menu-item index="/article-list">
              <span slot="title">文章列表</span>
            </el-menu-item>
            <el-menu-item index="/article-publish">
              <span slot="title">发布文章</span>
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL+user.head_img" alt="">
          <div class="nickname">{{user.nickname}}</div>
          <div class="logout" @click="logout">退出</div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async logout () {
      try {
        await this.$confirm('你确定要退出登录吗?', { type: 'warning' })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch (e) {
        this.$message.info('取消退出')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container{
    height: 100%;
      .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img{
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      .nickname{
        margin: 0 10px;
      }
    }
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      .logo{
        height: 60px;
        line-height: 60px;
        background-color: #333;
        color:#fff;
        font-weight: 700;
      }
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
    }
  }
}
</style>
