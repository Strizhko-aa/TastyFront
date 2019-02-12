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
          <img align="left" style="height: 141px; width: 141px; margin-right: 15px" src="../../assets/images/cezar.jpg"/>
          <div style="text-align: left; font-size: 22px">
            <label style="margin-bottom: 23px;"><strong>Салат</strong></label><br>
            <label style="margin-bottom: 30px">Цезарь с курицей</label><br>
            <label>Продано: 155 раз</label>
          </div>
        </b-col>
        <b-col cols="5">
          <div style="text-align: left; font-size: 22px">
            <label style="margin-bottom: 23px">Среднее время готовки: 16 минут</label><br>
            <label style="margin-bottom: 30px">Выручка составила: 1 руб.</label><br>
            <label style="margin-bottom: 15px">Рейтинг посетителей: 5 ★</label>
            <p>{{selected}}</p>
            <p>{{elements}}</p>
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
      qtype: 'as',
      selected: 'day',
      options: [
        {text: 'За день', value: 'day'},
        {text: 'За месяц', value: 'month'},
        {text: 'За год', value: 'year'}
      ],
      elements: []
    }
  },
  methods: {},
  watch: {
    selected: function (val) {
      let _url = 'http://localhost:8080/admin'
      var _type = {'statistic_type': this.selected}
      this.qtype = this.selected
      this.$http.post(_url, JSON.stringify(_type)).then(response =>
        response.json()).then(json => {
        this.elements = json
      }).catch(error => {
        console.log(_type + ' ' + error)
      })
    }
  }
  // created () {
  //   let resource = this.$resource('http://localhost:8080/admin')
  //   resource.get().then(result => {
  //     result.json().then(data => {
  //       console.log(data)
  //       this.elements = data
  //     })
  //   }, error => {
  //     console.log(error)
  //   })
  // }
}
</script>
