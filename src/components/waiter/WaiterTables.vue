<template>
  <div id="app">
    <b-container>
        <h1 class="text-center choose_table">Cтолики:</h1>
        <br>
        <b-row class="mb-4" v-for="(value, key) in elements" :key="key">
          <b-col cols="1"></b-col>
          <b-col v-for="(order, index) in value" :key="index" v-if="index === 0" :class="order.statuses.title"
                class="rounded-circle text-center" cols="1" @click="transitionOnOrder(order.tableNumber)">
            <span class="number_of_table">{{order.tableNumber}}</span>
          </b-col>
          <b-col v-else :class="order.statuses.title" class="rounded-circle text-center offset-2" cols="1"
                @click="transitionOnOrder(order.tableNumber)">
            <span class="number_of_table">{{order.tableNumber}}</span>
          </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
// import store from '../store/store'

export default {
  name: 'WaiterTables',
  props: {},
  data () {
    return {
      elements: {}
    }
  },
  methods: {
    transitionOnOrder: function (tableNumber) {
      this.$route.params.tableNumber = tableNumber
      window.location.href = '/waiter/orders/' + tableNumber
    }
  },
  created () {
    this.$http.get('http://localhost:8080/waiter').then(function (response) {
      this.elements = response.body
      console.log(this.elements)
    }).catch(function (err) {
      console.log(err.status)
    })
  }
}
</script>

<style scoped>
  .choose_table, .number_of_table {
    font-family: Times, serif;
  }

  .number_of_table {
    color: white;
    font-size: 55px;
  }

  .no_one_here {
    border: 2px solid #3F9384;
    background: grey;
    cursor: pointer;
  }

  .in_process_of_cooking {
    border: 2px solid #3F9384;
    background: #3F9384;
    cursor: pointer;
  }

  .dish_is_ready {
    border: 2px solid #3F9384;
    background: red;
    cursor: pointer;
  }
</style>
