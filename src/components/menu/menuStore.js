
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    purchased: []
  },
  mutations: {
    // установить значение переменной из хранилища
    setValue (store, keyValue) {
      store[keyValue.key] = keyValue.value
    },
    // удалить из списка купленных
    deleteFromPurshased (store, index) {
      store.purchased.splice(index, 1)
    },
    // изменить кол-во купленных
    changeCount (store, indexValue) {
      if (indexValue.index !== null) {
        store.purchased[indexValue.index].count += indexValue.value
      }
      if (store.purchased[indexValue.index].count === 0) { // если кол-во упало до нуля удалить
        store.purchased.splice(indexValue.index, 1)
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
