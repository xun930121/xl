// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'

import '../static/css/base.css'
import '../static/css/checkout.css'
import '../static/css/login.css'
import '../static/css/product.css'
Vue.config.productionTip = false

Vue.use(VueInfiniteScroll)
Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
	loading: '../static/loading/loading-spinning-bubbles.svg'
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
