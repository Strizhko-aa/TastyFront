<template >
<b-container class="orderBlock">
  <div class="popup" v-if="message" v-on:click="clearMessage()">{{message}}</div>
  <div class="titleBlock"> Оформление заказа </div>
    <b-container class="no-overflow ">
      <b-row v-for="(item, index) in ordered" :key="item.dish.id" class="no-overflow item">
        <b-col cols="1" sm="1" md="1" style="height: 50px" class="no-overflow indexDish">
          <p class="indexDish">{{index + 1}}. </p>
        </b-col>
        <b-col cols="4" sm="8" md="4" style="height: 50px" class="no-overflow nameDish">
          <p class="info-text">{{item.dish.name}}</p>
        </b-col>
        <b-col cols="1" sm="3" md="1" style="height: 50px" class="no-overflow">
          <p class="info-text price">{{item.dish.price}} ₽</p>
        </b-col>
        <b-col cols="5" sm="5" md="5" class="quantity no-overflow">
          <div class="quantity-input">
            <button class="minus btn-Q" @click="changeCount(item, -1)">-</button>
            <input id="text_tribulus_1" :value="item.count" class="input-text qty text" size="3"/>
            <button class="plus btn-Q" @click="changeCount(item, 1)">+</button>
          </div>
          <b-button class="delete"  @click="deleteFromPurshased(item.dish.id)"><img class="delete-icon" src="../../assets/images/delete.png"></b-button>
        </b-col>
        <b-col cols="1" sm="1" md="1" style="height: 50px" class="no-overflow">
          <p class="info-text price">{{item.dish.price * item.count}} ₽</p>
        </b-col>
      </b-row>
      <b-row class="totalSum">
      <b-col>Итого: {{ totalPrice }} ₽</b-col>
    </b-row>
      <b-row class="buttonConfOrder">
        <b-button v-if="ordered.length > 0" variant="success"  @click="beforeConfirmOrder()">Подтвердить заказ</b-button>
      </b-row>
      <b-row class="back">
        <router-link to="/">Вернуться к меню</router-link>
      </b-row>
    </b-container>
    <div class="container confirm-order-block" v-if="confirmOrderFlag" >
      <h3>Подтверждение заказа</h3>
      <b-input-group class="mt-3">
        <b-form-input v-model="tableNumber" placeholder="Введите номер столика"/>
      </b-input-group>
      <div class="table-order">
        <table id="mytable" class="table table-bordred table-striped">
          <thead>
          <th>Название</th>
          <th>Цена, ₽/шт. </th>
          <th>Кол-во</th>
          <th>Общая стоимость</th>
          </thead>
          <tbody>
          <tr v-for="item in ordered" :key="item.dish.id">
            <td class="name">{{item.dish.name}}</td>
            <td class="min-column">{{item.dish.price}} ₽</td>
            <td class="min-column">{{item.count}} шт.</td>
            <td class="min-column">{{item.count * item.dish.price}} ₽</td>
          </tr>
          </tbody>
        </table>
      </div>
      <b-row>
        <b-col class="totalSum">Итоговая стоимость: {{ totalPrice }} ₽</b-col>
      </b-row>
      <b-row>
        <b-col><b-button variant="success" @click="stripeOpen()">Оплата картой онлайн</b-button></b-col>
        <b-col><b-button variant="success" @click="sendOrder(2, null)">Оплата наличными</b-button></b-col>
      </b-row>
      <div  id="payment-form" v-if="stripeFlag">
        <div class="form-row">
          <label for="card-element">
            Заполните карту
          </label>
          <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
          </div>

          <!-- Used to display Element errors. -->
          <div id="card-errors" role="alert"></div>
        </div>

        <b-button class="stripeButton" variant="success" @click="submitForm()" >Оплатить</b-button>
      </div>
      <b-button variant="danger" class="confirm-close-btn" @click="closeConfirm">X</b-button>
    </div>
    <div class="confirm-overflow" v-if="confirmOrderFlag" @click="closeConfirm()"></div>
  </b-container>
</template>

<script>
import menuStore from './menuStore'
// eslint-disable-next-line standard/object-curly-even-spacing
import { sendMessage} from '../../utills/ws'
import store from '../store/store'

export default {
  data () {
    return {
      message: null,
      tableNumber: null,
      confirmOrderFlag: false,
      stripeFlag: false,
      stripe: null,
      elements: null,
      style: null,
      card: null,
      form: null
    }
  },
  created () {
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
    clearMessage () {
      this.message = null
    },
    transition: function (pay) {
      this.$route.params.pay = pay
      window.location.href = '/confirm' + pay
    },
    // удалить по ид из заказа
    deleteFromPurshased (id) {
      let index = this.findOrderedIndex(id)
      menuStore.dispatch('deleteFromPurshased', index)
      let json = {'dishId': id}
      this.$http.post(store.getters.host + '/cancel', JSON.stringify(json)).then(function (response) {
      }).catch(function (error) {
        console.log(error)
      })
    },

    // редактировать количество заказанной позиции
    changeCount (orderedItem, value) {
      let index = this.findOrderedIndex(orderedItem.dish.id)
      if (index !== null) {
        menuStore.dispatch('changeCount', {index: index, value: value})
        let json = {'dishId': orderedItem.dish.id}
        if (value === -1) {
          this.$http.post(store.getters.host + '/delete', JSON.stringify(json)).then(function (response) {
          }).catch(function (error) {
            console.log(error)
          })
        } else if (value === 1) {
          this.$http.post(store.getters.host + '/add', JSON.stringify(json)).then(function (response) {
          }).catch(function (error) {
            console.log(error)
          })
        }
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
    stripeOpen () {
      if (!this.stripeFlag) {
        this.stripeCard()
      }
      this.stripeFlag = !this.stripeFlag
    },
    stripeCard () {
      setTimeout(() => {
        this.stripe = window.Stripe('pk_test_WXdZcci87vt7peUiTW4xGYNV00R7o9Lqeb')
        this.elements = this.stripe.elements()

        // Custom styling can be passed to options when creating an Element.
        var style = {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }

        // Create an instance of the card Element.
        this.card = this.elements.create('card', {style: style})

        // Add an instance of the card Element into the `card-element` <div>.
        this.card.mount('#card-element')

        this.card.addEventListener('change', function (event) {
          var displayError = document.getElementById('card-errors')
          if (event.error) {
            displayError.textContent = event.error.message
          } else {
            displayError.textContent = ''
          }
        })
        this.form = document.getElementById('payment-form')
        this.form.addEventListener('submit', this.submitForm)
      }, 200)
    },
    submitForm () {
      // event.preventDefault()
      this.stripe.createToken(this.card).then((result) => {
        console.log(result)
        if (result.error) {
          // Inform the customer that there was an error.
          var errorElement = document.getElementById('card-errors')
          errorElement.textContent = result.error.message
        } else {
          // Send the token to your server.
          this.stripeTokenHandler(result.token)
        }
      })
    },

    stripeTokenHandler (token) {
      // Insert the token ID into the form so it gets submitted to the serve
      this.form = document.getElementById('payment-form')
      var hiddenInput = document.createElement('input')
      hiddenInput.setAttribute('type', 'hidden')
      hiddenInput.setAttribute('name', 'stripeToken')
      hiddenInput.setAttribute('id', 'stripeToken')
      hiddenInput.setAttribute('value', token.id)
      console.log(hiddenInput)
      this.form.appendChild(hiddenInput)
      // Submit the form
      this.sendOrder(1, token.id)
      // this.form.submit()
    },
    // закрыть подтверждаение заказа
    closeConfirm () {
      this.confirmOrderFlag = false
    },
    // по идее отправить список заказов в БД
    // просто в форе оно не работало пришлось рекурсивно делать
    sendOrder (typePay, token) {
      let json = {'tableNumber': this.$data.tableNumber, 'token': token}
      this.$http.post(store.getters.host + '/confirm/' + typePay, JSON.stringify(json)).then((response) => {
        this.clearCardAndGoToRoot(response.bodyText)
        console.log('success')
        console.log(response)
        console.log(response.bodyText)
        sendMessage()
      }, (error) => {
        this.message = 'Ошибка сервера'
        console.log('error')
        console.log(error)
      }).catch(error => {
        this.message = 'Ошибка сервера'
        console.log('catch')
        console.log(error)
      })
    },
    clearCardAndGoToRoot (message) {
      this.clearCart()
      this.$router.push({path: '/', query: {message: message}})
    },
    // добавить блюдо в козину(с точки зрения БД). С точки зрения клиенты это уже должно быть заказано
    // async, promise только для того, чтобы дождаться пока отправится одно блюдо и только после этого отправить следующее
    sendDish: async function (data) {
      return new Promise((resolve) => {
        this.$http.post(store.getters.host + '/confirm', data).then((response) => {
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
  .popup {
    position: absolute;
    display: inline-block;
    white-space: nowrap;
    padding: 10px;
    border-radius: 5px;
    background-color: #ee6f00;
    color: #ffffff;
  }
.orderBlock {
  border: 1px solid #3F9384;
  padding: 15px;
  position: relative;
}
.titleBlock {
  background: white;
  font-size: 20px;
  position: absolute;
  top: -15px;
}
.no-overflow {
  overflow: hidden!important;
}
.nameDish {
  text-align: left;
}
.item {
  padding: 15px;
  border-bottom: 1px solid #3F9384;
}
.indexDish {
  font-size: 1rem;
  line-height: 50px;
}
.price{
  float: right;
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
  font-size: 1rem;
  margin-top: 12px;
}

.totalSum {
  width: 100%;
  text-align: right;
  margin: 20px 0;
  font-size: 22px;
}
.buttonConfOrder {
  width: 100%;
  display: inline-block;
  text-align: right;
  float: right;
}
.buttonConfOrder button {
  font-size: 22px;
}
.delete {
  padding: 0;
  width: 40px;
  height: 40px;
  margin-left: 5px;
  background: white;
  border: 0;
}
.delete-icon {
  width: 35px;
  height: 35px;
}
.delete:hover .delete-icon{
  width: 37px;
  height: 37px;
}
.back {
  width: 100%;
  display: inline-block;
}
.confirm-order-block {
  position: fixed;
  width: 500px;
  height: auto;
  max-height: 625px;
  top: 4%;
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

.StripeElement {
  box-sizing: border-box;

  height: 40px;
  width: 100%;
  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

  label{
    margin-top: 10px;
  }
  .stripeButton {
    margin-top: 10px;
  }
  .table-order{
    max-height: 250px;
    overflow-y: auto;
  }
  .min-column{
    white-space: nowrap;
  }
</style>
