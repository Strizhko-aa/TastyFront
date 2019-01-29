<template>
  <div id="app">
    <div class="container">
    <h1 class="text-center choose_table">Cтолики:</h1>
    <br>
      <b-row class="mb-4" v-for="(value, key) in elements" v-bind:key="key">
        <b-col cols="1"></b-col>
        <b-col v-for="(order, index) in value" v-bind:key="order.id" v-if="index === 0" :class="order.statuses.title" class="rounded-circle text-center" cols="1" v-on:click="window.location.href = '/waiter/orders/{{order.tableNumber}}'">
          <span class="number_of_table">{{order.tableNumber}}</span>
        </b-col>
        <b-col v-else :class="order.statuses.title" class="rounded-circle text-center offset-2" cols="1" v-on:click="window.location.href = '/waiter/orders/{{order.tableNumber}}'">
          <span class="number_of_table">{{order.tableNumber}}</span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaiterTables',
  props: {
  },
  data () {
    return {
      elements: []
    }
  },
  methods: {
  },
  created () {
    this.$http.get('http://localhost:8080/waiter').then(response => {
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
h1.choose_table, span.number_of_table {
  font-family: Times, serif;
}
span.number_of_table {
  color: white;
  font-size: 55px;
}
div.no_one_here
{
  border: 2px solid #3F9384;
  background: grey;
  cursor: pointer;
}

div.in_process_of_cooking
{
  border: 2px solid #3F9384;
  background: #3F9384;
  cursor: pointer;
}

div.dish_is_ready
{
  border: 2px solid #3F9384;
  background: red;
  cursor: pointer;
}
</style>
