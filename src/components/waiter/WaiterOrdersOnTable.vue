<template>
  <div id="app">
    <div class="container">
      <div class="table mt-5">
        <div class="table_title text-center">
          <span class="table_name">Столик {{$route.params.tableNumber}}</span>
        </div>
        <div class="row align-items-center ml-2 mt-4 mr-2">
          <div class="col-2">
            <img src="../../assets/images/cezar.jpg" class="img-fluid">
          </div>
          <div class="col-4">
            <p>
              <b>Цезарь с курицей</b>
              <br><span class="status-of-dish">Статус: В ожидании</span>
              <i class="far fa-clock"></i>
            </p>
            <div class="form-check bring_dish">
              <input class="form-check-input increase_size" type="checkbox" value=""
                     id="defaultCheck2">
              <label class="form-check-label ml-2" for="defaultCheck2">Отнесено</label>
            </div>
          </div>
          <div class="col-2">
            <img src="../../assets/images/mintaj-v-duhovke.jpg" class="img-fluid">
          </div>
          <div class="col-4">
            <p>
              <b>Минтай в духовке</b>
              <br><span class="status-of-dish">Статус: Готовится</span>
              <i class="far fa-clock"></i>
            </p>
            <div class="form-check bring_dish">
              <input class="form-check-input increase_size" type="checkbox" value="" id="defaultCheck1">
              <label class="form-check-label ml-2" for="defaultCheck1">Отнесено</label>
            </div>
          </div>
        </div>
        <div class="row align-items-center ml-2 mt-4 mr-2">
          <div class="col-2">
            <img src="../../assets/images/buterbrody-s-krasnoj-ikroj-i-syrom.jpg" class="img-fluid">
          </div>
          <div class="col-4">
            <p>
              <b>Бутерброды с красной икрой и сыром</b>
              <br><span class="status-of-dish">Статус: Готовится</span>
              <i class="far fa-clock"></i>
            </p>
            <div class="form-check bring_dish">
              <input class="form-check-input increase_size" type="checkbox" value="" id="defaultCheck">
              <label class="form-check-label ml-2" for="defaultCheck">Отнесено</label>
            </div>
          </div>
        </div>
        <div class="row ml-2 mt-4 mr-2">
          <div class="col">
            <div class="progress time">
              <div class="progress-bar" role="progressbar" style="width: 25%; background: #3F9384;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <b>25%</b>
              </div>
            </div>
          </div>
        </div>
        <div class="row ml-2 mt-4 mr-2">
          <div class="col">
            <span class="order_info">Дата: 20.09.2016</span>
          </div>
          <div class="col">
            <span class="order_info">Время: 13:25</span>
          </div>
          <div class="col">
            <span class="order_info">Итого: 300 ₽</span>
          </div>
          <div class="col">
            <span class="order_info">Оплата: Наличными</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaiterOrdersOnTable'
}
</script>

<style scoped>
  div.table, div.table_title, button.bring_dish
  {
    border: 2px solid #3F9384;
    border-radius: 8px;
  }

  span.table_name
  {
    font-size: 40px;
    font-family: Times, serif;
    color: white;
  }

  div.table_title
  {
    background: #3F9384;
  }

  p
  {
    font-size: 25px;
    font-family: Times, serif;
  }

  div.bring_dish
  {
    font-size: 20px;
    font-family: Times, serif;
  }

  .increase_size
  {
    width: 20px;
    height: 20px;
  }

  span.status-of-dish
  {
    color: #3F9384;
  }

  div.time
  {
    border: 2px solid black;
    height: 25px;
  }

  .order_info
  {
    font-size: 20px;
    font-family: Times, serif;
  }
</style>
