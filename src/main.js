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
import Notifications from 'vue-notification'

import WaiterMixin from './components/mixin/WaiterMixin'
import {connect} from './utills/ws'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Notifications)

Vue.mixin(WaiterMixin)

Vue.config.productionTip = false
connect()
router.afterEach((to, from) => {
  if (to.name !== 'Стол') {
    store.dispatch('setValue', {key: 'whereIsUser', value: to.name})
  } else {
    store.dispatch('setValue', {key: 'whereIsUser', value: to.name + ' №' + to.params.tableNumber})
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
