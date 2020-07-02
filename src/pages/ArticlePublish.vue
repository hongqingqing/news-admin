<template>
  <div class="article-publish">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单,用于收集表单数据 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="form.content"></vue-editor>
      </el-form-item>
      <el-form-item label="栏目">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox v-for="item in categoryList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          :action="$axios.defaults.baseURL+'/upload'"
          list-type="picture-card"
          :headers="headers"
          :on-success="handleSuccess"
          :file-list="form.cover"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      articleId: '',
      categoryList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    async getCategoryList () {
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { data } = res.data
      // 过滤掉头条,因文章发布时,分类中不能有头条
      this.categoryList = data.filter(item => item.id !== 999)
      // console.log(this.categoryList)
    },
    async getArticleDetails () {
      const res = await this.$axios.get(`/post/${this.articleId}`)
      // console.log(res)
      const { data } = res.data
      // console.log(data)
      data.categories = data.categories.map(item => { return item.id })
      // 上传图片回显,给fileList添加图片url属性
      // cover中的每一张图片都是需要回显的
      data.cover.forEach(item => {
        item.url = this.$fixUrl(item.url)
      })

      // 原始旧文章中包含了大量的div标签,但vue2Editor不支持div,所以需要将所有div标签替换成p标签即可
      data.content = data.content.replace(/<div/g, '<p')
      data.content = data.content.replace(/<\/div>/g, '</p>')
      this.form = data
    },
    async publish () {
      // 需要对栏目进行处理
      // this.form.categories = this.form.categories.map(item => {
      //   return {
      //     id: item
      //   }
      // })
      // console.log(this.form)
      const data = { ...this.form }
      data.categories = this.form.categories.map(item => {
        return {
          id: item
        }
      })
      // console.log(data)
      let url
      if (this.articleId) {
        url = `/post_update/${this.articleId}`
      } else {
        url = '/post'
      }
      const res = await this.$axios.post(url, data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      console.log(res)
      this.$router.push('/article-list')
      this.$message.success('文章发布成功')
    },
    handleSuccess (res) {
      // console.log(res)
      const { data } = res
      // console.log(data)
      this.form.cover.push({
        id: data.id,
        url: this.$axios.defaults.baseURL + data.url
      })
    },
    handleRemove (file) {
      // console.log(file)
      this.form.cover = this.form.cover.filter(item => item.id !== file.id)
    }
  },
  created () {
    this.getCategoryList()
    this.articleId = this.$route.params.id
    // console.log(this.articleId)
    // 如果是点击编辑跳转过来
    if (this.articleId) {
      this.getArticleDetails()
    }
  }
}
</script>

<style lang="scss" scoped>
.article-publish{
  .el-form{
    margin-top: 20px;
    .el-form-item:first-child{
      width: 800px;
    }
  }
}
</style>
