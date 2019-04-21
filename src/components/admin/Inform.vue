<template>
  <div>
    <br>
      <b-container fluid>
        <b-row>
          <b-col cols="5">
            <b-form-select v-model="selected" :options="options" class="mb-3" :select-size="15">
              <optgroup v-for="(group, name) in optionGroups" v-bind:key="name" :label="name">
                <option v-for="option in group" v-bind:key="option.value" :value="option.value">
                  {{ option.text }}
                </option>
              </optgroup>
            </b-form-select>
          </b-col>
          <b-col>
            <div class="upper-block">
              <label><strong>{{information.type}}</strong></label><br>
              <label>{{information.name}}</label><br>
              <img align="left" class="leftimg"
                   style="height: 200px; width: 200px; margin-right: 15px; margin-top: 20px;"
                   :src="`http://localhost:8080` + information.img"/>
              <!--<label>Описание: {{information.description}}</label><br>-->

              <label style="margin-top: 10px"><strong>Цена: </strong>{{information.price}} рублей</label><br>
              <!--<label v-html="information.ingredient">{{information.ingredient}}</label>-->
              <label style="margin-top: 50px;"><strong>Масса: </strong>{{information.mass}}</label>
              <label style="margin-top: 50px;"><strong>Время готовки:</strong> {{information.time}} минут</label>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div style="text-align: center;">
              <label>График продаж за последние 3 месяца</label><br>
              <label>По дням недели</label>
              <line-chart :height="200" :chart-data="forGraph" :options="chartOptions"></line-chart>
            </div>
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import LineChart from './chart/LineChart'

export default {
  components: {
    LineChart
  },
  data () {
    return {
      selected: 7,
      optionGroups: ['empty'],
      options: [],
      information: {
        name: null,
        img: null,
        mass: null,
        time: null,
        type: null,
        price: null,
        inday: null,
        inweek: null,
        inyear: null,
        dayOfWeek: null
      },

      chartOptions: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 80,
            fontColor: 'black'
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              color: 'black'
            },
            ticks: {
              beginAtZero: true,
              fontSize: 14
            },
            scaleLabel: {
              display: true,
              labelString: 'Дни недели',
              fontColor: 'black'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Количество продаж',
              fontColor: 'black'
            },
            ticks: {
              beginAtZero: true,
              stacked: true,
              stepSize: 5,
              fontSize: 14

            }
          }]
        }
      },

      forGraph: null
    }
  },
  methods: {
    postToServer: function () {
      let _url = 'http://localhost:8080/admin/inform'
      const req = {'needDish': this.selected}
      this.$http.post(_url, JSON.stringify(req)).then(response =>
        response.json()).then(json => {
        this.information.mass = json['mass']
        this.information.name = json['name']
        this.information.img = json['img']
        this.information.time = json['time']
        this.information.type = json['type']
        this.information.price = json['price']
        this.information.dayOfWeek = json['day_of_week']
        this.information.inday = json['in_day']
        this.information.inweek = json['in_week']
        this.information.inyear = json['in_year']

        this.forGraph = {
          labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
          datasets: [
            {
              label: 'Продажи',
              backgroundColor: 'transparent',
              data: [parseInt(json['Понедельник']), parseInt(json['Вторник']),
                parseInt(json['Среда']), parseInt(json['Четверг']), parseInt(json['Пятница']),
                parseInt(json['Суббота']), parseInt(json['Воскресенье'])],
              fill: false,
              lineTension: 0.2,
              borderColor: 'rgba(63, 147, 132, 1)',
              pointBorderColor: 'rgba(63, 147, 132, 1)',
              pointBackgroundColor: 'rgba(63, 147, 132, 0.5)',
              pointRadius: 5,
              pointHoverRadius: 10,
              pointHitRadius: 30,
              pointBorderWidth: 2,
              pointStyle: 'rectRounded'
            }
          ]}
        console.log(this.forGraph)
        console.log(this.information)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created: function () {
    let _url = 'http://localhost:8080/admin/inform'
    this.$http.get(_url).then(response => {
      this.optionGroups = response.body
    })
    this.postToServer()
  },
  watch: {
    selected: function (val) {
      this.postToServer()
    }
  }
}
</script>

<style scoped>
.upper-block {
  text-align: left;
  font-size: 22px;
  height: auto;
  position: relative;
  border-bottom: 1px dotted #3F9384;
}
.ingred-block {
  text-align: left;
  font-size: 22px;
  height: auto;
  position: relative;
  border-right: 1px dotted #3F9384;
}
</style>
