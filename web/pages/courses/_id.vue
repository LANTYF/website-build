<!--  -->
<template>
  <div>
    <h3>课程详情</h3>
    <div>{{ detail }}</div>
    <div>{{ detail.title }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const detail = await $axios.$get(`/courses/${params.id}`)
    return {
      detail
    }
  }
}
</script>

<style></style>
