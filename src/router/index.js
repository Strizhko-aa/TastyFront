import Vue from 'vue'
import Router from 'vue-router'
import MenuComponent from '@/components/menu/Menu'
import CartComponent from '@/components/menu/cart'
import AdminComponent from '@/components/admin/Admin'
import Kitchen from '@/components/kitchen/Kitchen'
import WaiterTables from '@/components/waiter/WaiterTables'
import WaiterOrdersOnTable from '@/components/waiter/WaiterOrdersOnTable'
import Login from '@/components/login/Login'
import Registration from '@/components/login/Registration'
import GetPassword from '@/components/login/getpassword'

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
      path: '/cart',
      name: 'Корзина',
      component: CartComponent
    },
    {
      path: '/login',
      name: 'Аутентификация',
      component: Login
    },
    {
      path: '/registration',
      name: 'Авторизация',
      component: Registration
    },
    {
      path: '/getpassword',
      name: 'Получить пароль',
      component: GetPassword
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
