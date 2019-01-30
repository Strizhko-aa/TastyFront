<template>
  <div id="app">
    <div class="container">
      <div class="table mt-5">
        <div class="table_title text-center">
          <span class="table_name">Столик {{$route.params.tableNumber}}</span>
        </div>
        <div class="row align-items-center ml-2 mt-4 mr-2" v-for="(value, key) in elements[0]" v-bind:key="key">
          <div v-for="(dish, index) in value" v-bind:key="dish.id">
            <div class="col-2">
              <img :src="`http://localhost:8080/` + dish.imgUrl" class="img-fluid">
            </div>
            <div class="col-4">
              <p>
                <b>{{dish.name}}</b>
                <br><span class="status-of-dish">Статус: {{elements[1].dishesFromOrder[index].status}}</span>
                <i class="far fa-clock"></i>
              </p>
              <div class="form-check bring_dish">
                <input class="form-check-input increase_size" type="checkbox" value=""
                       :id="index + key + 1">
                <label class="form-check-label ml-2" :for="index + key + 1">Отнесено</label>
              </div>
            </div>
          </div>
        </div>
        <div class="row ml-2 mt-4 mr-2">
          <div class="col">
            <div class="progress time">
              <div class="progress-bar" role="progressbar" style="width: 25%; background: #3F9384;"
                   :aria-valuenow="elements[2]" aria-valuemin="0" aria-valuemax="100">
                <b>{{elements[2]}}%</b>
              </div>
            </div>
          </div>
        </div>
        <div class="row ml-2 mt-4 mr-2">
          <div class="col">
            <span class="order_info">Дата: </span>
          </div>
          <div class="col">
            <span class="order_info">Время: </span>
          </div>
          <div class="col">
            <span class="order_info">Итого: {{elements[3]}} ₽</span>
          </div>
          <div class="col">
            <span class="order_info">Оплата: </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: 'WaiterOrdersOnTable',
  props: {},
  data () {
    return {
      elements: []
    }
  },
  methods: {},
  created () {
    this.$http.get('http://localhost:8080/waiter/orders/' + store.state.tableNumber).then(response => {
      this.elements = response.body
      console.log(response.body)
    }).catch(err => {
      console.log(err.status)
      this.elements = []
    })
  }
}
</script>

<style scoped>
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

  div.bring_dish {
    font-size: 20px;
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

  .order_info {
    font-size: 20px;
    font-family: Times, serif;
  }
</style>
