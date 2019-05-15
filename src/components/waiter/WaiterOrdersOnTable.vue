<template>
<div>
  <b-container fluid>
    <b-row>
      <b-col style="text-align: left" cols=12 sm=12 md=12 lg=12>
        <b-button @click="goBack()">Назад</b-button>
      </b-col>
    </b-row>
  </b-container>
  <b-container v-if="loading">LOADING ////\\\\</b-container>
  <b-container v-else fluid>
    <p hidden>{{refreshWaiter}}</p>
    <div v-show="false">{{tableNumber}}</div>
    <b-container style="text-align: left" v-for="item in parsedOrders" :key="item.id">
      <b-row>
        <!-- <b-col offset="0" offset-sm="3" offset-md="3" offset-lg="3"></b-col> -->
        <b-col cols sm md lg = "6">
          <p class="order-number">
            Заказ №{{item.id}} | {{item.total}} &#8381;
            <i v-if="item.typePayment.id === 1" class="fas fa-credit-card"></i>
            <i v-if="item.typePayment.id === 2" class="fas fa-money-bill-wave"></i>
          </p>
        </b-col>
      </b-row>
      <i v-if="getCount(1, item) > 0" class="fas fa-clock status"> В ожидании</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 1" :key="'wait' + index">
        <b-col offset=1 offset-sm=1 offset-md=1 offset-lg=1></b-col>
        <b-col cols=11 sm=11 md=11 lg=11>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
        <!-- <b-col cols=12 sm=4 md=4 lg=4> </b-col> -->
        <b-col cols=11 sm=11 md=11 lg=11></b-col>
      </b-row>
      <i v-if="getCount(2, item) > 0" class="fas fa-fire status"> Готовится</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 2" :key="'inProgerss' + index">
        <b-col offset=1 offset-sm=1 offset-md=1 offset-lg=1></b-col>
        <b-col cols=11 sm=11 md=11 lg=11>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
      </b-row>
      <i v-if="getCount(3, item) > 0" class="fas fa-check status"> Готово</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 3" :key="'ready' + index">
        <b-col offset=1 offset-sm=1 offset-md=1 offset-lg=1></b-col>
        <b-col cols=11 sm=11 md=11 lg=11>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
          <img class="status-icon" @click="deliveryDish(dish)" src="../../assets/images/arrow-right.svg" alt="">
        </b-col>
        <!-- <b-col cols=12 sm=4 md=4 lg=4>  </b-col> -->
        <!-- <b-col cols=1 sm=1 md=1 lg=1 ></b-col> -->
      </b-row>
      <i v-if="getCount(4, item) > 0" class="fas fa-check-double status"> Отнесено</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 4" :key="'delivered' + index">
        <b-col offset=1 offset-sm=1 offset-md=1 offset-lg=1></b-col>
        <b-col cols=11 sm=11 md=11 lg=11>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
        <!-- <b-col cols=12 sm=4 md=4 lg=4>  </b-col> -->
        <!-- <b-col cols=1 sm=1 md=1 lg=1 @click="deliveryDish(dish)"><img class="status-icon" src="../../assets/images/arrow-right.svg" alt=""></b-col> -->
      </b-row>
    </b-container>
  </b-container>
</div>
</template>

<script>
// import moment from 'moment'
import store from '../store/store'

export default {
  name: 'WaiterOrdersOnTable',
  props: {},
  data () {
    return {
      elements: [],
      parsedOrders: [],
      loading: false,
      options: [
        {text: 'Столики', value: 'tables'},
        {text: 'Нужно отнести', value: 'ready'},
        {text: 'Проблемки', value: 'warning'}
      ]
    }
  },

  computed: {
    tableNumber () {
      if (this.$route.params.tableNumber !== undefined) {
        this.reqestData()
      }
      return this.$route.params.tableNumber
    },
    refreshWaiter () {
      if (store.getters.value('refreshWaiter') === true) {
        store.dispatch('setValue', {key: 'refreshWaiter', value: false})
        this.reqestData()
      }
      return store.getters.value('refreshWaiter')
    }
  },
  created () {
    this.reqestData()
  },

  methods: {
    goBack () {
      this.$router.push('/waiter')
    },
    getCount (statusId, order) {
      let count = 0
      for (let i in order.parsedDishes) {
        if (order.parsedDishes[i].status.id === statusId) {
          count++
        }
      }
      return count
    },
    reqestData () {
      this.loading = true
      this.$http.get(store.getters.host + '/waiter/orders/' + this.$route.params.tableNumber).then(function (response) {
        this.elements = response.body
        this.parsedOrders = this.parseResponseMix(this.elements)
        this.loading = false
      }).catch(function (err) {
        this.loading = false
        console.log(err)
      })
    },
    deliveryDish (dishFromOrder) {
      if (dishFromOrder.dfoIds.length > 0) {
        // let _url = store.getters.host + '/orders/delivery-dish/' + dishFromOrder.dfoIds.shift()
        let _url = store.getters.host + '/waiter/orders/delivery-dish/' + dishFromOrder.dfoIds.shift()
        this.$http.get(_url).then(response => {
          console.log(response.status)
          this.reqestData()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style scoped>
  @import '../../assets/styles/css/all.min.css';

p {
  font-size: 25px;
  font-family: Times, serif;
}
.status {
  font-size: 16pt;
  margin: 10px 0 0 20px;
}
.dish-name {
  font-size: 14pt;
  font-family: Times, serif;
  width: 320px;
}
.order-number {
  margin-top: 20px;
}
.dishes-in-order {
  padding-left: 30px;
  padding-top: 4px;
}
.status-icon {
  height: 22px;
  float: right;
  cursor: pointer;
  margin: 5px 10% 5px 0;
}
</style>
