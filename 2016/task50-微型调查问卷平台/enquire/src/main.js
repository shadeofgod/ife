// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import filters from './filters'
import util from './util'

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.prototype.$util = util
Vue.filter('dateFormat', filters.dateFormat)

const router = new VueRouter({
  routes,
  base: '/',
  mode: 'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
