<template>
  <div>
    <b-container fluid>
      <br>
      <b-row>
        <b-col>
          <h1>Цена блюд</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <b-form-radio-group style="width: 100%" v-model="selected" :options="options" size="lg" buttons
                                button-variant="success" name="radioTime"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="11">
          <bar-chart :chart-data="graph" :options="chartOptions"></bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BarChart from './chart/BarChart'

export default {
  name: 'Revenue',
  components: {BarChart},
  data: function () {
    return {
      selected: 'day',
      options: [
        {text: 'День', value: 'day'},
        {text: 'Неделя', value: 'week'},
        {text: 'Месяц', value: 'oneMonth'},
        {text: '3 месяца', value: 'threeMonths'}

      ],
      temp: null,
      graph: null,
      chartOptions: {
        scales: {
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true,
              fontSize: 16
            },
            labelFontSize: 20,
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
            barPercentage: 1,
            categoryPercentage: 0.6,
            barThickness: 200,
            gridLines: {
              display: true
            },
            ticks: {
              fontSize: 16
            },
            scaleLabel: {
              display: true,
              labelString: 'Рубли'
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    getInfoFromServer: function () {
      var jsonLabelsDishPrice = []
      var jsonLabelsDishPriceByIngredients = []
      var jsonDataName = []
      console.log(encodeURI(this.selected))
      let _url = 'http://localhost:8080/admin/revenue/get_dishes/' + encodeURI(this.selected)
      this.$http.get(_url).then(response =>
        response.json()).then(json => {
        console.log(json)
        for (var i = 0; i < json.length; i++) {
          // var price = json[i]['price']
          // var sebestoimost = json[i]['priceDerivedByIngredients']
          // var temp = (price - sebestoimost) > 0 ? json[i]['name'] + ' (наценка: ' + (price - sebestoimost) + ' руб.)' : json[i]['name'] + ' (наценка -' + (price - sebestoimost) + ' руб.)'
          var temp = json[i]['name']
          jsonDataName.push(temp)
          jsonLabelsDishPrice.push(json[i]['price'])
          jsonLabelsDishPriceByIngredients.push(json[i]['priceDerivedByIngredients'])
        }
      }).catch(error => {
        console.log(error)
      })
      setTimeout(() => {
        this.graph = {
          labels: jsonDataName,
          titleSpacing: 100,
          bodySpacing: 10,
          datasets: [
            {
              label: 'Прибыль',
              backgroundColor: 'rgba(63, 147, 132, 0.3)',
              borderColor: 'rgba(63, 147, 132, 1)',
              borderWidth: 1,
              data: jsonLabelsDishPrice
            },
            {
              label: 'Затраты на блюдо',
              backgroundColor: 'rgba(147,4,135,0.3)',
              borderColor: 'rgb(147,39,134)',
              borderWidth: 1,
              data: jsonLabelsDishPriceByIngredients
            }
          ]
        }
      }, 500)
      console.log(jsonDataName)
      console.log(jsonLabelsDishPrice)
      console.log(jsonLabelsDishPriceByIngredients)
    }
  },
  watch: {
    selected: function (val) {
      this.getInfoFromServer()
    }
  },
  created () {
    this.getInfoFromServer()
  }
}
</script>

<style scoped>

</style>
