import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import VueMeta from 'vue-meta'

import App from './App.vue'
import router from './router'

import './assets/global.scss'

Vue.use(PiniaVuePlugin)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
