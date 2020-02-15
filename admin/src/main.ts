import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import './plugins/avue'
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_URL
})
Vue.prototype.$http = http
Vue.prototype.$httpajax = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
