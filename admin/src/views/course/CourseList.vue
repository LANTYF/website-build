<!--  -->
<template>
  <div>
    <h3>课程管理</h3>
    <el-button type="primary" style="margin-bottom: 20px" @click="$router.push('/course/edit')">创建课程</el-button>
    <el-table :data="data" border stripe>
      <el-table-column v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width">
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="$router.push(`/course/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue{
  data = []
  fields = {
    _id: {label: 'ID'},
    title: {label: '课程名称'},
    cover: {label: '封面图'}
  }

  async remove(row: any) {
    await this.$http.delete(`/courses/${row._id}`)
    this.fetch()
  }

  async fetch() {
    const res = await this.$http.get('/courses')
    this.data = res.data
  }

  created() {
    this.fetch()
  }
}

</script>

<style lang='scss'>
</style>