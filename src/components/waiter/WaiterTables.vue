<template>
  <div class="main-waiter-tables">
    {{elements}}
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
      this.$router.push({path: '/waiter/orders/' + tableNumber})
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
