
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authorized: false,
    email: 'Loading...',
    firstName: '',
    secondName: '',
    phone: '',
    roleStaff: {
      id: null,
      title: ''
    },
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
      store.firstName = ''
      store.secondName = ''
      store.phone = ''
      store.roleStaff.id = null
      store.roleStaff.title = ''
      store.permissions.admin = false
      store.permissions.waiter = false
      store.permissions.kitchen = false
      store.permissions.menu = true
    },
    setUserPermission (store, roleId) {
      switch (roleId) {
        case 1:
          store.permissions.admin = false
          store.permissions.waiter = true
          store.permissions.kitchen = false
          store.permissions.menu = true
          break

        case 2: {
          store.permissions.admin = false
          store.permissions.waiter = false
          store.permissions.kitchen = true
          store.permissions.menu = true
          break
        }

        case 3: {
          store.permissions.admin = true
          store.permissions.waiter = true
          store.permissions.kitchen = true
          store.permissions.menu = true
          break
        }

        case 4: {
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
    setUserPermission ({commit}, roleId) {
      commit('setUserPermission', roleId)
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
