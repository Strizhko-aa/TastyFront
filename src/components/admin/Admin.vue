<template>
  <div id="app">
    <!-- убрал внешний контейнер. Как я понял, не стоит фигачить контейнер в контейнер. А может это норма. -->
    <b-container fluid>
      <br>
      <h1 class="text-center">Статистика</h1>
      <div>
        <b-row>
          <b-col></b-col>
          <b-col cols="10" class="text-center">
            <b-form-group>
              <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="md" buttons button-variant="success" name="radioTime">
              </b-form-radio-group>
            </b-form-group>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
        <br>
        <b-row>
          <b-col class="text-center bordered">
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

export default {

  name: 'app',
  components: {Rating, Popular, Inform},
  data: function () {
    return {
      selected: 'popular',
      options: [
        {text: 'Популярное блюдо', value: 'popular'},
        {text: 'Информация по блюду', value: 'inform'},
        {text: 'Рейтинг блюд', value: 'rating', disabled: true}
      ]
    }
  }
}
</script>

<style>
  .bordered {
    border-radius: 10px 10px;
    border: 3px solid #3F9384;
    margin-bottom: 10px;
  }

  /* все стили что были остались в App.vue (это полоска сверху и футер), так что не удивляйся их исчезновению.*/
  /* И да, я не подгонял еще твои блоки под моюильны разрешения */
</style>
