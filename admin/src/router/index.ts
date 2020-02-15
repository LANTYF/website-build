import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import ResourceCrud from '../views/ResourceCrud.vue'
import CourseEdit from '../views/course/CourseEdit.vue'
import CourseList from '../views/course/CourseList.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {path: '/', name: 'home', component: Home},
      {path: '/:resource/list', name: 'resource-crud', component: ResourceCrud, props:true}
      // {path: '/course/list', name: 'course-list', component: CourseList},
      // {path: '/course/edit', name: 'course-edit', component: CourseEdit, props:true},
      // {path: '/course/edit/:id', name: 'course-edit', component: CourseEdit, props:true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
