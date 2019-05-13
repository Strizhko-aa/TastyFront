
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authorized: false,
    email: 'Loading...',
    userName: '',
    phone: '',
    roleStaff: '',
    permissions: {
      admin: false,
      waiter: false,
      kitchen: false,
      menu: true
    }
  },
  mutations: {
    setValue (store, keyValue) {
      store[keyValue.key] = keyValue.value
    },
    clearStore (store) {
      store.authorized = false
      store.email = 'Loading...'
      store.userName = ''
      store.phone = ''
      store.roleStaff = ''
      store.permissions.admin = false
      store.permissions.waiter = false
      store.permissions.kitchen = false
      store.permissions.menu = true
    },
    setUserPermission (store, roleName) {
      switch (roleName) {
        case 'WAITER':
          store.permissions.admin = false
          store.permissions.waiter = true
          store.permissions.kitchen = false
          store.permissions.menu = true
          break

        case 'COOK': {
          store.permissions.admin = false
          store.permissions.waiter = false
          store.permissions.kitchen = true
          store.permissions.menu = true
          break
        }

        case 'ADMIN': {
          store.permissions.admin = true
          store.permissions.waiter = true
          store.permissions.kitchen = true
          store.permissions.menu = true
          break
        }

        case 'GUEST': {
          store.permissions.admin = false
          store.permissions.waiter = false
          store.permissions.kitchen = false
          store.permissions.menu = true
          break
        }

        default: {
          store.permissions.admin = false
          store.permissions.waiter = false
          store.permissions.kitchen = false
          store.permissions.menu = false
          break
        }
      }
    }
  },
  actions: {
    setValue ({commit}, keyValue) {
      commit('setValue', keyValue)
    },
    clearStore ({commit}) {
      commit('clearStore')
    },
    setUserPermission ({commit}, roleName) {
      commit('setUserPermission', roleName)
    }
  },
  getters: {
    // store.getters.value('имя_поля')
    value: store => key => {
      return store[key]
    },
    permission: store => permissName => {
      return store.permissions[permissName]
    }
  }
})

export default store
