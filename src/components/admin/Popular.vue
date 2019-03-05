<template>
  <div>
    <b-container fluid>
      <br>
      <b-row>
      <b-col cols="2">
        <b-form-group>
          <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="lg" buttons button-variant="success" stacked name="radioTime"/>
        </b-form-group>
      </b-col>
        <b-col cols="5">
          <img align="left" style="height: 141px; width: 141px; margin-right: 15px" :src="`http://localhost:8080` + dish.img"/>
          <div style="text-align: left; font-size: 22px">
            <label style="margin-bottom: 23px;"><strong>{{dish.type}}</strong></label><br>
            <label style="margin-bottom: 30px">{{dish.name}}</label><br>
            <label>Продано: {{dish.count}} раз</label>
          </div>
        </b-col>
        <b-col cols="5">
          <div style="text-align: left; font-size: 22px">
            <label style="margin-bottom: 23px">Среднее время готовки: {{dish.time}} минут</label><br>
            <label style="margin-bottom: 30px">Выручка составила: {{dish.price}} руб.</label><br>
            <label style="margin-bottom: 15px">Рейтинг посетителей: 5 ★</label>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
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
      let _url = 'http://localhost:8080/admin'
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
