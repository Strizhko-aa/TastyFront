<template>
  <div id="app">
    <div class="container">
    <h1 class="text-center choose_table">Cтолики:</h1>
    <br>
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col class="rounded-circle text-center in_process_of_cooking" cols="1" onclick="window.location.href = '/waiter/orders/1'">
          <span class="number_of_table">1</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 dish_is_ready" cols="1" onclick="window.location.href = '/waiter/orders/2'">
          <span class="number_of_table">2</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 dish_is_ready" cols="1" onclick="window.location.href = '/waiter/orders/3'">
          <span class="number_of_table">3</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/4'">
          <span class="number_of_table">4</span>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col class="rounded-circle text-center no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/5'">
          <span class="number_of_table">5</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/6'">
          <span class="number_of_table">6</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/7'">
          <span class="number_of_table">7</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/8'">
          <span class="number_of_table">8</span>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col class="rounded-circle text-center no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/9'">
          <span class="number_of_table">9</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/10'">
          <span class="number_of_table">10</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/11'">
          <span class="number_of_table">11</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/12'">
          <span class="number_of_table">12</span>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col class="rounded-circle text-center no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/13'">
          <span class="number_of_table">13</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/14'">
          <span class="number_of_table">14</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/15'">
          <span class="number_of_table">15</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/16'">
          <span class="number_of_table">16</span>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col class="rounded-circle text-center no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/17'">
          <span class="number_of_table">17</span>
        </b-col>
        <b-col class="rounded-circle text-center offset-2 no_one_here" cols="1" onclick="window.location.href = '/waiter/orders/18'">
          <span class="number_of_table">18</span>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaiterTables'
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
