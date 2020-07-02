<template>
  <div class="article-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 展示列表 -->
      <el-table
        :data="articleList"
         border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="400">
        </el-table-column>
        <el-table-column
          prop="user.nickname"
          label="作者"
          width="180">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template v-slot="{row}">
            {{row.create_date|time}}
          </template>
        </el-table-column>
        <el-table-column
          label="封面">
          <template slot-scope="scope">
             <img class="avatar" :src="$fixUrl(scope.row.cover[0].url)" alt="">
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot="{row}">
            <el-button @click="edit(row.id)">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页功能 -->
      <el-pagination
        layout="sizes, prev, pager, next, total, jumper"
        :total="total"
        background
        :page-size="pageSize"
        :current-page="pageIndex"
        :page-sizes="[3, 5, 8, 10]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articleList: [],
      pageSize: 5,
      pageIndex: 1,
      total: 0
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    async getArticleList () {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { data, total } = res.data
      this.articleList = data
      this.total = total
      console.log(this.articleList)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getArticleList()
    },
    handleSizeChange (val) {
      this.pageIndex = 1
      this.pageSize = val
      this.getArticleList()
    },
    indexMethod (index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    edit (id) {
      // console.log(id)
      this.$router.push({ name: 'article-publish', params: { id: id } })
    }
  }

}
</script>

<style lang="scss" scoped>
.article-list{
  .el-table{
    margin-top: 20px;
    .avatar{
      width: 100px;
      height: 70px;
      object-fit: cover;
    }
  }
}
</style>
