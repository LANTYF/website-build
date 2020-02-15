<!--  -->
<template>
  <div>
    <h3>{{id ? '编辑' : '创建'}}课程</h3>
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-input v-model="form.cover"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="!id">立即创建</el-button>
        <el-button type="primary" @click="modify" v-else>提交修改</el-button>
        <el-button type="primary" @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component({})
export default class CourseEdit extends Vue{
  form = {}
  @Prop() id!: string
  async onSubmit() {
    try {
      await this.$confirm('确定提交?')
    } catch(e) {
      return
    }
    await this.$http.post('/courses', this.form)
    await this.$message({
      type: "success",
      message: '提交成功'
    })
    this.$router.push('/course/list')
  }

  async modify() {
     try {
      await this.$confirm('确定提交?')
    } catch(e) {
      return
    }
    await this.$http.put(`/courses/${this.id}`, this.form)
    await this.$message({
      type: "success",
      message: '提交成功'
    })
    this.$router.push('/course/list')
  }

  async fetch() {
    const res = await this.$http.get(`/courses/${this.id}`)
    this.form = res.data
  }

  created() {
    this.id && this.fetch()
  }
}

</script>

<style lang='scss'>
</style>