<template>
  <div id="app">
    <!-- убрал внешний контейнер. Как я понял, не стоит фигачить контейнер в контейнер. А может это норма. -->
      <h1 class="text-center">Статистика</h1>
      <br>
      <div>
        <b-row>
          <b-col></b-col>
          <b-col class="text-center">

          <b-button-group size="sm">
            <b-button @click="pressed('popular')" variant="success">Популярное блюдо</b-button>
            <b-button @click="pressed('inform')" variant="success">Информация по блюду</b-button>
            <b-button @click="pressed('rating')" variant="success">Рейтинг блюд</b-button>
          </b-button-group>
          </b-col>
          <b-col></b-col>
        </b-row>
      </div>
      <b-container fluid>
        <br>
        <b-row>
          <b-col cols="12" xl="12" lg="10" md="12" sm="12" class="text-center bordered">

            <!-- если statistic ===  'popular' показываем одну пикчу, если нет смотрим следующее условие и т.д.-->
            <div v-if="statistic === 'popular'">
              <img src="../../assets/images/popular.jpg" alt="график популярного блюда" class="grafic">
            </div>
            <div v-else-if="statistic === 'inform'">
              <img src="../../assets/images/info-po-bludu.jpg" alt="информация по блюду">
            </div>
            <div v-if="statistic === 'rating'">
              <img src="../../assets/images/raiting.jpg" alt="рейтинг">
            </div>
            <!-- меня несколько упороло и я вставил вместо фоток графиков скрины что ты мне скинул,
            и теперь тут сайт в сайте =.=, только телевизора не хватает -->

          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
export default {

  name: 'app',
  data () {
    return {
      statistic: 'popular'
    }
  },
  methods: {
    pressed: function (pressedBtn) {
      this.statistic = pressedBtn
      // alert(this.statistic)
    }
  }
}
</script>

<style>
  .grafic {
    height: 100%;
  }
  /* все стили что были остались в App.vue (это полоска сверху и футер), так что не удивляйся их исчезновению.*/
  /* И да, я не подгонял еще твои блоки под моюильны разрешения */
</style>
