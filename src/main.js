// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import store from '../src/components/store/store'
// import menuStore from '../src/components/menu/menuStore'
import VueResource from 'vue-resource'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueResource)

Vue.config.productionTip = false

router.afterEach((to, from) => {
  store.dispatch('setValue', {key: 'whereIsUser', value: to.name})
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
