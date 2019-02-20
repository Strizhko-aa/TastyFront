<template>
<div>
    <b-container fluid class="no-overflow">
      <b-row v-for="item in ordered" :key="item.dish.id" class="no-overflow">
        <b-col cols="6" sm="6" md="6" style="height: 50px" class="no-overflow">
          <p class="info-text">{{item.dish.name}}: {{item.count}}</p>
        </b-col>
        <b-col cols="6" sm="6" md="6" class="quantity no-overflow">
          <div class="quantity-input">
            <button class="minus btn-Q" @click="changeCount(item, -1)">-</button>
            <input id="text_tribulus_1" :value="item.count" class="input-text qty text" size="3"/>
            <button class="plus btn-Q" @click="changeCount(item, 1)">+</button>
          </div>
          <b-button variant="danger" @click="deleteFromPurshased(item.dish.id)">[x]</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>Итого: {{ totalPrice }}</b-col>
      </b-row>
      <b-button variant="success" @click="beforeConfirmOrder()">Подтвердить заказ</b-button>
    </b-container>
    <b-container v-if="confirmOrderFlag" class="confirm-order-block">
      <h3>Подтверждание заказа</h3>
      <b-input-group class="mt-3">
        <b-form-input v-model="tableNumber" placeholder="Введите номер столика"/>
      </b-input-group>
      <b-row v-for="item in ordered" :key="item.dish.id">
        <b-col><p class="info-text">{{item.dish.name}}: {{item.count}}</p></b-col>
      </b-row>
      <b-row>
        <b-col>Итого: {{ totalPrice }}</b-col>
      </b-row>
      <b-row>
        <b-col><b-button variant="success" @click="sendOrder()">Оплатить</b-button></b-col>
      </b-row>
      <b-button variant="danger" class="confirm-close-btn">X</b-button>
    </b-container>
    <div class="confirm-overflow" v-if="confirmOrderFlag" @click="closeConfirm()"></div>
  </div>
</template>

<script>
import menuStore from './menuStore'

export default {
  data () {
    return {
      tableNumber: null,
      confirmOrderFlag: false
    }
  },

  computed: {
    ordered () {
      return menuStore.getters.value('purchased')
    },
    totalPrice () {
      let price = 0
      for (let i = 0; i < this.ordered.length; i++) {
        price += (parseInt(this.ordered[i].dish.price) * this.ordered[i].count)
      }
      return price
    }
  },

  methods: {
    // удалить по ид из заказа
    deleteFromPurshased (id) {
      let index = this.findOrderedIndex(id)
      menuStore.dispatch('deleteFromPurshased', index)
    },

    // редактировать количество заказанной позиции
    changeCount (orderedItem, value) {
      let index = this.findOrderedIndex(orderedItem.dish.id)
      if (index !== null) {
        menuStore.dispatch('changeCount', {index: index, value: value})
      }
    },

    // ищет индекс по ид в заказынных
    findOrderedIndex (searchId) {
      console.log(searchId)
      for (let i = 0; i < this.ordered.length; i++) {
        if (this.ordered[i].dish.id === searchId) {
          return i
        }
      }
      return null
    },

    // открыть подтверждение заказа
    beforeConfirmOrder () {
      this.confirmOrderFlag = true
    },

    // закрыть подтверждаение заказа
    closeConfirm () {
      this.confirmOrderFlag = false
    },

    // по идее отправить список заказов в БД
    // просто в форе оно не работало пришлось рекурсивно делать
    sendOrder: async function (i = 0) {
      if (i < this.ordered.length) {
        console.log(await this.sendDish(this.ordered[i].dish.id)) // подождать результат
        i++
        this.sendOrder(i) // добавить след элемент
      } else { // когда заказы кончились
        this.clearCart()
        this.$router.push('/')
      }
    },

    // добавить блюдо в козину(с точки зрения БД). С точки зрения клиенты это уже должно быть заказано
    // async, promise только для того, чтобы дождаться пока отправится одно блюдо и только после этого отправить следующее
    sendDish: async function (id) {
      let data = {
        'dishId': id
      }
      return new Promise((resolve) => {
        this.$http.post('http://localhost:8080/add', JSON.stringify(data)).then((response) => {
          console.log(response.status)
          resolve('send success')
        }).catch(error => {
          console.log(error)
          resolve('send fail')
        })
      })
    },

    // очистка корзины
    clearCart () {
      menuStore.dispatch('setValue', {key: 'purchased', value: []})
    }
  }
}
</script>

<style scoped>
.no-overflow {
  overflow: hidden!important;
}
.quantity-input {
  overflow: hidden;
  border-radius: 0.25rem;
  display: inline-flex;
  /* flex-direction: row; */
  /* margin-top: 10px; */
}
.btn-Q {
  background: #3F9384;
  color: white;
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
}
.input-text {
  height: 40px;
  outline: none;
  text-align: center;
}
.info-text {
  margin-top: 12px;
}
.confirm-order-block {
  position: fixed;
  width: 500px;
  top: 20%;
  left: 50%;
  margin-left: -250px;
  background-color: whitesmoke;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 30px;
  z-index: 10;
}
.confirm-overflow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.confirm-close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
