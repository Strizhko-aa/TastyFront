<template>
  <div id="app">
    <b-container>
      <div class="text-center">
        <span class="table_name_black">Столик {{elements[0].id}}</span>
      </div>
      <b-row class="align-items-center ml-2 mt-4 mr-2" v-for="(order, key2) in elements[0].ordersList" :key="key2">
        <div class="table mt-5" :key="key2">
          <div class="table_title text-center">
            <span class="table_name">Заказ {{order.id}}</span>
          </div>
          <template v-for="(value, index) in elements[1][key2]">
            <b-row class="align-items-center ml-2 mt-4 mr-2" :key="index">
              <template v-for="(dishFromOrder, key) in value">
                <b-col cols="2" :key="key">
                  <img :src="'http://localhost:8080' + dishFromOrder.dish.imgUrl" class="img-fluid"
                       alt="Изображение блюда">
                </b-col>
                <b-col cols="4" :key="key">
                  <p>
                    <b>{{dishFromOrder.dish.name}}</b>
                    <br><span class="status-of-dish">Статус: {{dishFromOrder.dishStatus.title}}</span>
                    <i v-if="dishFromOrder.dishStatus.title === 'В ожидании'" class="far fa-clock"></i>
                    <i v-if="dishFromOrder.dishStatus.title === 'Готовится'" class="fab fa-gripfire"></i>
                    <i v-if="dishFromOrder.dishStatus.title === 'Готово'" class="fas fa-check"></i>
                  </p>
                  <div class="form-check bring_dish">
                    <input class="form-check-input increase_size" type="checkbox" value="" :id="index + key + key2">
                    <label class="form-check-label ml-2" :for="index + key + key2">Отнесено</label>
                  </div>
                </b-col>
              </template>
            </b-row>
          </template>
          <b-row class="ml-2 mt-4 mr-2">
            <b-col>
              <div class="progress time">
                <div class="progress-bar progress-color" role="progressbar" :style="{width: elements[2][key2] + '%'}"
                     :aria-valuenow="elements[2][key2]" aria-valuemin="0" aria-valuemax="100">
                  <b>{{elements[2][key2]}}%</b>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="ml-2 mt-4 mr-2">
            <b-col>
              <span class="order_info">Дата: {{formatToDate(order.dateOrders)}}</span>
            </b-col>
            <b-col>
              <span class="order_info">Время: {{formatToTime(order.dateOrders)}}</span>
            </b-col>
            <b-col>
              <span class="order_info">Итого: {{elements[3][key2]}} ₽</span>
            </b-col>
            <b-col>
              <span class="order_info">Оплата: {{order.typePayment.title}}</span>
            </b-col>
          </b-row>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'WaiterOrdersOnTable',
  props: {},
  data () {
    return {
      elements: []
    }
  },
  methods: {
    formatToDate (date) {
      if (date) {
        return moment(String(date)).format('DD.MM.YYYY')
      }
    },
    formatToTime (date) {
      if (date) {
        return moment(String(date)).format('hh:mm')
      }
    }
  },
  created () {
    this.$http.get('http://localhost:8080/waiter/orders/' + this.$route.params.tableNumber).then(function (response) {
      this.elements = response.body
      console.log(this.elements)
    }).catch(function (err) {
      console.log(err.status)
    })
  }
}
</script>

<style scoped>
  @import '../../assets/styles/css/all.min.css';

  div.progress-color {
    background: #3F9384;
  }

  div.table, div.table_title, button.bring_dish {
    border: 2px solid #3F9384;
    border-radius: 8px;
  }

  span.table_name {
    font-size: 40px;
    font-family: Times, serif;
    color: white;
  }

  span.table_name_black {
    font-size: 40px;
    font-family: Times, serif;
    color: black;
  }

  div.table_title {
    background: #3F9384;
  }

  p {
    font-size: 25px;
    font-family: Times, serif;
  }

  .increase_size {
    width: 20px;
    height: 20px;
  }

  span.status-of-dish {
    color: #3F9384;
  }

  div.time {
    border: 2px solid black;
    height: 25px;
  }

  .order_info, div.bring_dish {
    font-size: 20px;
    font-family: Times, serif;
  }
</style>
