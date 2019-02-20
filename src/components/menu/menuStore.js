
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
    },
    deleteFromPurshased (store, index) {
      console.log('in deleteFromPurshased')
      store.purchased.splice(index, 1)
    },
    changeCount (store, indexValue) {
      if (indexValue.index !== null) {
        store.purchased[indexValue.index].count += indexValue.value
      }
      if (store.purchased[indexValue.index].count === 0) {
        this.deleteFromPurshased(indexValue.index)
      }
    }
  },
  actions: {
    setValue ({commit}, keyValue) {
      commit('setValue', keyValue)
    },
    deleteFromPurshased ({commit}, index) {
      commit('deleteFromPurshased', index)
    },
    changeCount ({commit}, indexValue) {
      commit('changeCount', indexValue)
    }
  },
  getters: {
    value: store => key => {
      return store[key]
    }
  }
})

export default store
