import Vue from 'vue'
import Router from 'vue-router'
import MenuComponent from '@/components/menu/Menu'
import AdminComponent from '@/components/admin/Admin'
import Kitchen from '@/components/kitchen/Kitchen'
import WaiterTables from '@/components/waiter/WaiterTables'
import WaiterOrdersOnTable from '@/components/waiter/WaiterOrdersOnTable'
import Login from '@/components/login/Login'

Vue.use(Router)

// Это vue-router. Тут прописаны пути по которым можно ходить и какой будет результат при переходе.
// Результат это компонент App.vue (верхняя полоска и футер) а по середине компонент (в App.vue это тег <router-view/>)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Меню',
      component: MenuComponent
    },
    {
      path: '/login',
      name: 'Авторизация',
      component: Login
    },
    {
      path: '/admin',
      name: 'Администратор',
      component: AdminComponent
    },
    {
      path: '/kitchen',
      name: 'Кухня',
      component: Kitchen
    },
    {
      path: '/waiter',
      name: 'Официант',
      component: WaiterTables
    },
    {
      path: '/waiter/orders/:tableNumber',
      name: 'Стол',
      component: WaiterOrdersOnTable
    }
  ]
})
