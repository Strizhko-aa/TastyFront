import Vue from 'vue'
import Router from 'vue-router'
import MenuComponent from '@/components/menu/Menu'
import CartComponent from '@/components/menu/cart'
import AdminComponent from '@/components/admin/Admin'
import Kitchen from '@/components/kitchen/Kitchen'
import WaiterContainer from '@/components/waiter/WaiterContainer'
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
      name: 'menu',
      meta: {
        title: 'Меню'
      },
      component: MenuComponent
    },
    {
      path: '/cart',
      name: 'cart',
      meta: {
        title: 'Корзина'
      },
      component: CartComponent
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Вход'
      },
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      meta: {
        title: 'Регистрация'
      },
      component: Registration
    },
    {
      path: '/getpassword',
      name: 'get-password',
      meta: {
        title: 'Восстановление пароля'
      },
      component: GetPassword
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        title: 'Администратор'
      },
      component: AdminComponent
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      meta: {
        title: 'Кухня'
      },
      component: Kitchen
    },
    {
      path: '/waiter',
      name: 'waiter',
      meta: {
        title: 'Официант'
      },
      component: WaiterContainer
    },
    {
      path: '/waiter/orders/:tableNumber',
      name: 'table',
      meta: {
        title: 'Столик'
      },
      component: WaiterOrdersOnTable
    }
  ]
})
