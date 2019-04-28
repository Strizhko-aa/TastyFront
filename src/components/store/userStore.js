
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
    }
  },
  mutations: {
    setValue (store, keyValue) {
      store[keyValue.key] = keyValue.value
    }
  },
  actions: {
    setValue ({commit}, keyValue) {
      commit('setValue', keyValue)
    }
  },
  getters: {
    // store.getters.value('имя_поля')
    value: store => key => {
      return store[key]
    }
  }
})

export default store
