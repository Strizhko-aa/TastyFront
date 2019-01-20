
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

// это vueX - хранилище чтобы перебрасывать значения между любыми компонентами прокта
const store = new Vuex.Store({
  state: {
    whereIsUser: '' //  выводми сверху где юзер. Меняется в main.js при переходе
  },
  mutations: {
    setValue (store, keyValue) {
      store[keyValue.key] = keyValue.value
    }
  },
  actions: {
    // установка значения в хранилице store.dispatch('setValue', {key: 'имя_поля', value: 'Значение'})
    // чтобы использовать храилище его надо импортировать
    setValue ({commit}, keyValue) {
      commit('setValue', keyValue)
    }
  },
  getters: {
    // получить значение из хранилища
    // store.getters.value('имя_поля')
    value: store => key => {
      return store[key]
    }
  }
})

export default store
