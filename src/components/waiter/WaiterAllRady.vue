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
    <b-container>
      <b-row style="margin-bottom: 20px;">
        <b-col cols=6 sm=6 md=6 lg=6> <p>Блюдо</p></b-col>
        <b-col cols=6 sm=6 md=6 lg=6><p>Столик №</p></b-col>
      </b-row>
    </b-container>
    <!-- <div v-show="false">{{tableNumber}}</div> -->
    <div v-for="(table, i) in parsedOrders" :key="i">
    <b-container style="text-align: left" v-for="item in table" :key="item.id">
      <b-row class="dishes-in-order" v-for="(dish, index) in item.parsedDishes" v-show="dish.status.id === 3" :key="'ready' + index">
        <b-col cols=12 sm=6 md=6 lg=6>
          <span class="dish-name">{{dish.dish.name}} x {{dish.count}} </span>
        </b-col>
        <b-col cols=6 sm=2 md=2 lg=2> <img class="status-icon" src="../../assets/images/arrow-right.svg" alt=""> </b-col>
        <b-col style="text-align: center" cols=6 sm=2 md=2 lg=2>{{item.tableNumber}}</b-col>
        <b-col offset=0 offset-sm=2 offset-md=2 offset-lg=2></b-col>
      </b-row>
    </b-container>
    </div>
  </b-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      elements: [],
      parsedOrders: [],
      loading: false
    }
  },
  created () {
    this.reqestAllReady()
  },
  methods: {
    reqestAllReady: async function () {
      this.loading = true
      let tables = await this.getTables()
      for (let i in tables[0]) {
        if (tables[0][i][0].id !== undefined && tables[0][i][0].id !== null) {
          // console.log('id ' + tables[i][0].id)
          let ordersFromTable = await this.getTableOrders(tables[0][i][0].id)
          console.log(ordersFromTable)
          this.parsedOrders.push(ordersFromTable)
        }
      }
      this.loading = false
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
    getTables () {
      return new Promise(resolve => {
        this.$http.get('http://localhost:8080/waiter').then(response => {
          console.log(response.body)
          resolve(response.body)
        }).catch(err => {
          console.log(err.status)
          resolve(null)
        })
      })
    },
    getTableOrders (tableNumber) {
      return new Promise(resolve => {
        this.$http.get('http://localhost:8080/waiter/orders/' + tableNumber).then(function (response) {
          // this.elements.push(response.body)
          resolve(this.parseResponseMix(response.body))
        }).catch(function (err) {
          console.log(err)
          // resolve(null)
        })
      })
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
  margin-bottom: 10px;
}
.status-icon {
  height: 20px;
  float: left;
}
</style>
