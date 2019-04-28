<template>
  <div id="app">
    <!-- убрал внешний контейнер. Как я понял, не стоит фигачить контейнер в контейнер. А может это норма. -->
    <b-container fluid>
      <div>
        <b-row>
          <b-col></b-col>
          <b-col cols="12" class="text-center">
            <b-form-group>
              <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="md" buttons button-variant="success" name="radioTime">
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
        <b-row>
          <b-col class="text-center bordered" style="vertical-align: ">
            <!-- если statistic ===  'popular' показываем одну пикчу, если нет смотрим следующее условие и т.д.-->
            <div v-if="selected === 'popular'">
              <Popular/>
            </div>
            <div v-else-if="selected === 'inform'">
              <Inform/>
            </div>
            <div v-if="selected === 'rating'">
              <Rating/>
            </div>
            <div v-if="selected === 'addDish'">
              <AddDish/>
            </div>
            <div v-if="selected === 'stock'">
              <Stock/>
            </div>
            <div v-if="selected === 'stopList'">
              <StopList/>
            </div>
            <div v-if="selected === 'revenue'">
              <Revenue/>
            </div>
            <!-- меня несколько упороло и я вставил вместо фоток графиков скрины что ты мне скинул,
            и теперь тут сайт в сайте =.=, только телевизора не хватает -->
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import Popular from './Popular'
import Inform from './Inform'
import Rating from './Rating'
import AddDish from './AddDish'
import Stock from './Stock'
import StopList from './StopList'
import Revenue from './Revenue'

export default {

  name: 'app',
  components: {Rating, Popular, Inform, AddDish, Stock, StopList, Revenue},
  data: function () {
    return {
      selected: 'popular',
      options: [
        {text: 'Популярное блюдо', value: 'popular'},
        {text: 'Информация по блюду', value: 'inform'},
        {text: 'Рейтинг блюд', value: 'rating'},
        {text: 'Добавление блюда в меню', value: 'addDish'},
        {text: 'Запасы ингредиентов', value: 'stock'},
        {text: 'Стоп-лист', value: 'stopList'},
        {text: 'Денежные средства', value: 'revenue'}
      ]
    }
  }
}
</script>

<style>
  .section.container {
    margin-top: 0;
  }
  .b-form-group {
    margin-bottom: 0;
  }
  .bordered {
    border-radius: 10px 10px;
    border: 3px solid #3F9384;
    margin-bottom: 10px;
  }
  .btn-success {
    background-color: #3F9384;
    border: 3px solid #ffffff;
  }
  .active {
    background-color: #387166 !important;
    border: 3px solid #ffffff !important;;
  }
  .btn-success:hover{
    background-color: rgba(71, 143, 132, 0.56) !important;
    border: 3px solid #ffffff !important;;
  }
  /* все стили что были остались в App.vue (это полоска сверху и футер), так что не удивляйся их исчезновению.*/
  /* И да, я не подгонял еще твои блоки под моюильны разрешения */
</style>
