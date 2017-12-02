// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import store from "./store"
import center from "./common/notificationCenter.js"

import App from './App'

import axios from "axios"




Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
// Vue原型上加属性
Vue.prototype.$event = center;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
