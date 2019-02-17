<template>
  <div id="app">
    <b-container>
      <div class="table mt-5">
        <div class="table_title text-center">
          <span class="table_name">Столик {{elements[1].tableNumber}}</span>
        </div>
        <b-row class="align-items-center ml-2 mt-4 mr-2" v-for="(value, index) in elements[0]" :key="index">
          <template v-for="(dish, key) in value">
            <b-col cols="2" :key="key">
              <img :src="'http://localhost:8080' + dish.imgUrl" class="img-fluid" alt="Изображение блюда">
            </b-col>
            <b-col cols="4" :key="key">
              <p>
                <b>{{dish.name}}</b>
                <br><span class="status-of-dish">Статус: {{elements[4][key].status}}</span>
                <i v-if="elements[4][key].status === 'В ожидании'" class="far fa-clock"></i>
                <i v-if="elements[4][key].status === 'Готовится'" class="fab fa-gripfire"></i>
                <i v-if="elements[4][key].status === 'Готово'" class="fas fa-check"></i>
              </p>
              <div class="form-check bring_dish">
                <input class="form-check-input increase_size" type="checkbox" value="" :id="index + key">
                <label class="form-check-label ml-2" :for="index + key">Отнесено</label>
              </div>
            </b-col>
          </template>
        </b-row>
        <b-row class="ml-2 mt-4 mr-2">
          <b-col>
            <div class="progress time">
              <div class="progress-bar progress-color" role="progressbar" :style="{width: elements[2] + '%'}"
                   :aria-valuenow="elements[2]" aria-valuemin="0" aria-valuemax="100">
                <b>{{elements[2]}}%</b>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row class="ml-2 mt-4 mr-2">
          <b-col>
            <span class="order_info">Дата: {{formatToDate(elements[1].dateOrders)}}</span>
          </b-col>
          <b-col>
            <span class="order_info">Время: {{formatToTime(elements[1].dateOrders)}}</span>
          </b-col>
          <b-col>
            <span class="order_info">Итого: {{elements[3]}} ₽</span>
          </b-col>
          <b-col>
            <span class="order_info">Оплата: {{elements[1].typePayment.title}}</span>
          </b-col>
        </b-row>
      </div>
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
