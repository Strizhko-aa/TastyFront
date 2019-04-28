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
import userStore from '../src/components/store/userStore'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import VueCookies from 'vue-cookies'

import WaiterMixin from './components/mixin/WaiterMixin'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Notifications)
Vue.use(VueCookies)

Vue.mixin(WaiterMixin)

Vue.config.productionTip = false

function setAuthorized () {
  if (Vue.cookies.get('token') !== '' && Vue.cookies.get('token') !== null && Vue.cookies.get('token') !== undefined) {
    console.log(Vue.cookies.get('token'))
    Vue.http.headers.common['Authorization'] = 'Token' + Vue.cookies.get('token')
    userStore.state.authorized = true
  } else {
    Vue.http.headers.common['Authorization'] = ''
    userStore.state.authorized = false
  }
}

function checkToken () {
  if (Vue.cookies.get('token') !== '' && Vue.cookies.get('token') !== null && Vue.cookies.get('token') !== undefined) {
    // также не забыть добавить проверку валидности токена на сервере(пока нет апи)
    return true
  } else {
    return false
  }
}

function initApp () {
  setAuthorized()
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}

router.afterEach((to, from) => {
  console.log(to.meta.title)
  store.dispatch('setValue', {key: 'whereIsUser', value: to.meta.title})
})

router.beforeEach((to, from, next) => {
  if (checkToken()) {
    next()
  } else {
    store.state.authorized = false
    next({path: '/login'})
  }
})

initApp()
