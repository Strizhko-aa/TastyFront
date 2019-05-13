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
    <div v-show="false">{{tableNumber}}</div>
    <b-container style="text-align: left" v-for="item in parsedOrders" :key="item.id">
      <b-row>
        <b-col cols sm md lg = "12">
          <p class="order-number">
            Заказ №{{item.id}} | {{item.total}} &#8381;
            <i v-if="item.typePayment.id === 1" class="fas fa-credit-card"></i>
            <i v-if="item.typePayment.id === 2" class="fas fa-money-bill-wave"></i>
          </p>
        </b-col>
      </b-row>
      <i v-if="getCount(1, item) > 0" class="fas fa-clock status"> В ожидании</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 1" :key="'wait' + index">
        <b-col cols=12 sm=6 md=6 lg=6>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
        <!-- <b-col cols=12 sm=4 md=4 lg=4> </b-col> -->
        <b-col cols=12 sm=2 md=2 lg=2></b-col>
      </b-row>
      <i v-if="getCount(2, item) > 0" class="fas fa-fire status"> Готовится</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 2" :key="'inProgerss' + index">
        <b-col cols=12 sm=6 md=6 lg=6>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
        <!-- <b-col style="color:red" cols=12 sm=4 md=4 lg=4>  </b-col> -->
        <b-col cols=12 sm=2 md=2 lg=2><img class="status-icon" src="../../assets/images/warning.svg" alt=""></b-col>
      </b-row>
      <i v-if="getCount(3, item) > 0" class="fas fa-check status"> Готово</i>
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 3" :key="'ready' + index">
        <b-col cols=12 sm=6 md=6 lg=6>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}}</span>
        </b-col>
        <!-- <b-col cols=12 sm=4 md=4 lg=4>  </b-col> -->
        <b-col cols=12 sm=2 md=2 lg=2 @click="deliveryDish(dish)"><img class="status-icon" src="../../assets/images/arrow-right.svg" alt=""></b-col>
      </b-row>
    </b-container>
  </b-container>
</div>
</template>

<script>
// import moment from 'moment'
// import store from '../store/store'

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
    }
  },

  created () {
    this.reqestData()
  },

  filters: {
    // formatToDate (date) {
    //   if (date) {
    //     return moment(String(date)).format('DD.MM.YYYY')
    //   }
    // },
    // formatToTime (date) {
    //   if (date) {
    //     return moment(String(date)).format('hh:mm')
    //   }
    // }
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
      this.$http.get('http://localhost:8080/waiter/orders/' + this.$route.params.tableNumber).then(function (response) {
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
        let _url = 'http://localhost:8080/waiter/orders/delivery-dish/' + dishFromOrder.dfoIds.shift()
        this.$http.get(_url).then(response => {
          console.log(response.status)
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
}
.order-number {
  margin-top: 20px;
}
.dishes-in-order {
  padding-left: 30px;
}
.status-icon {
  height: 20px;
  float: left;
}
</style>
