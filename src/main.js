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
import LoginMixin from './components/mixin/LoginMixin'

Vue.use(BootstrapVue)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(Notifications)
Vue.use(VueCookies)

Vue.mixin(WaiterMixin)
Vue.mixin(LoginMixin)

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  // console.log(request)
  // return function (response) {
  //   console.log(response)
  // }
  next()
})

async function setAuthorized () {
  if (Vue.cookies.get('JSESSIONID') !== '' && Vue.cookies.get('JSESSIONID') !== null && Vue.cookies.get('JSESSIONID') !== undefined) {
    console.log(Vue.cookies.get('JSESSIONID'))
    await setUserInfo()
  } else {
    userStore.state.authorized = false
  }
}

function setUserInfo () {
  return new Promise(resolve => {
    let _url = store.getters.host + '/get_user_data'
    Vue.http.get(_url).then((response) => {
      // console.log(response.body)
      setUserData(response.body)
      userStore.dispatch('setValue', {key: 'authorized', value: true})
      resolve(true)
    }).catch(err => {
      console.log(err)
      userStore.dispatch('setValue', {key: 'authorized', value: false})
      resolve(false)
    })
  })
}

function setUserData (data) {
  userStore.dispatch('setValue', {key: 'userName', value: data.username})
  userStore.dispatch('setValue', {key: 'roleStaff', value: data.authorities[0].authority})
  userStore.dispatch('setUserPermission', data.authorities[0].authority)
  console.log(userStore.state)
}

function clearData () {
  store.dispatch('clearStore')
  userStore.dispatch('clearStore')
  Vue.cookies.remove('JSESSIONID')
}

function initApp () {
  /* eslint-disable no-new */
  setAuthorized()
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
  console.log(to.name)
  next()
  switch (to.name) {
    case 'login':
      clearData()
      next()
      break

    case 'waiter': {
      if (userStore.getters.permission('waiter')) {
        next()
      } else {
        next({name: 'login'})
      }
      break
    }

    case 'admin': {
      if (userStore.getters.permission('admin')) {
        next()
      } else {
        next({name: 'login'})
      }
      break
    }

    case 'kitchen': {
      if (userStore.getters.permission('kitchen')) {
        next()
      } else {
        next({name: 'login'})
      }
      break
    }

    default:
      next()
      break
  }
})

initApp()
