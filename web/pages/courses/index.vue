<!--  -->
<template>
  <div>
    <h2 class="ma-3">课程列表</h2>
    <div>{{ courses }}</div>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" span="3">
        <v-card :to="`/courses/${item._id}`" class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="item.cover">
            <v-card-title>{{ item.title }}</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div>{{ item.title }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const courses = await $axios.$get('/courses')
    return {
      courses
    }
  }
}
</script>

<style></style>
