import Vue from 'vue'
import Router from 'vue-router'
import MenuComponent from '@/components/menu/Menu'
import AdminComponent from '@/components/admin/Admin'
import Kitchen from '@/components/kitchen/Kitchen'

Vue.use(Router)

// Это vue-royter. Тут прописаны пути по которым можно ходить и какой будет результат при переходе.
// Результат это компонент App.vue (верхняя полоска и футер) а по середине компонент (в App.vue это тег <router-view/>)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Меню',
      component: MenuComponent
    },
    {
      path: '/admin',
      name: 'Администрирование',
      component: AdminComponent
    },
    {
      path: '/kitchen',
      name: 'Кухня',
      component: Kitchen
    }
  ]
})
