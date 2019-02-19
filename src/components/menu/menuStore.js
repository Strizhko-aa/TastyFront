
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    purchased: []
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
    value: store => key => {
      return store[key]
    }
  }
})

export default store
