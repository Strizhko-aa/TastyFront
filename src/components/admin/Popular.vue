<template>
  <div>
    <b-container fluid>
      <br>
      <b-row>
      <b-col cols="col-sm-3 col-md-2">
        <b-form-group>
          <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="lg" buttons button-variant="success" stacked name="radioTime"/>
        </b-form-group>
      </b-col>
        <b-col cols="col-sm-5 col-md-2">
          <img class="imgDish" align="right"  :src="`store.getters.host` + dish.img"/>
        </b-col>
        <b-col cols="col-sm-4 col-md-8">
          <div class="inform nameDish"><span><strong>{{dish.name}}</strong></span></div>
          <div class="inform"><span>Тип блюда: {{dish.type}}</span></div>
          <div class="inform"><span>Среднее время готовки: {{dish.time}}</span></div>
          <div class="inform"><span>Продано: {{dish.count}} раз</span></div>
          <div class="inform"><span>Выручка: {{dish.price}} ₽</span></div>
          <div class="inform"><span>Рейтинг посетителей: 5 ★</span></div>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '../store/store'
export default {
  name: 'Popular',
  data: function () {
    return {
      selected: 'day',
      options: [
        {text: 'За день', value: 'day'},
        {text: 'За месяц', value: 'month'},
        {text: 'За год', value: 'year'}
      ],
      elements: {
        type: null,
        name: null,
        img: null,
        time: null,
        price: null,
        count: null
      }
    }
  },
  methods: {
    postToServer: function () {
      let _url = store.getters.host + '/admin'
      var _type = {'statistic_type': this.selected}
      this.qtype = this.selected
      this.$http.post(_url, JSON.stringify(_type)).then(response =>
        response.json()).then(json => {
        this.elements.type = json['type_dish']
        this.elements.name = json['name']
        this.elements.img = json['img_url']
        this.elements.time = json['time']
        this.elements.price = json['price']
        this.elements.count = json['count']
        console.log(this.elements)
      }).catch(error => {
        console.log(_type + ' ' + error)
      })
    }
  },
  watch: {
    selected: function (val) {
      this.postToServer()
    }
  },
  computed: {
    dish () {
      return this.elements
    }
  },
  beforeMount: function () {
    this.postToServer()
  }
  // mounted () {
  //   this.postToServer()
  // }
}
</script>
<style>
  .imgDish {
    position: relative;
    padding: 0;
    height: 150px;
    max-width: 150px;
    border-radius: 10px 0;
    box-shadow: inset 1px 1px 10px 0 rgba(255, 255, 255, .5),
    inset -1px -1px 10px 0 rgba(0, 0, 0, .5),
    2px 2px 5px 0 rgba(0, 0, 0, .5);
  }
  .inform {
    width: 100%;
    font-size: 18px;
    text-align: left;
  }
  .nameDish {
    font-size: 22px;
  }
</style>
