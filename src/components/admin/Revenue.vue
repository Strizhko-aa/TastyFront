<template>
    <div>
      <b-container fluid>
        <b-row>
          <b-col>
            <h1>Стоимость</h1>
            <bar-chart :chart-data="graph" :options="chartOptions"></bar-chart>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import BarChart from './chart/BarChart'
import store from '../store/store'

export default {
  name: 'Revenue',
  components: {BarChart},
  data: function () {
    return {
      temp: null,
      graph: null,
      chartOptions: {
        scales: {
          yAxes: [{
            barThickness: 12,
            ticks: {
              // ticks: 80,
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
              labelString: 'Продажи'
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
      let _url = store.getters.host + '/admin/dishWithPrice'
      var jsonLabelsDishPrice = []
      var jsonLabelsDishPriceByIngredients = []
      var jsonDataName = []
      this.$http.get(_url).then(response =>
        response.json()).then(json => {
        console.log(json)
        for (var i = 0; i < json.length; i++) {
          var price = json[i]['price']
          var sebestoimost = json[i]['priceDerivedByIngredients']
          var temp = (price - sebestoimost) > 0 ? json[i]['name'] + ' + ' + (price - sebestoimost) + ' руб.' : json[i]['name'] + ' - ' + (price - sebestoimost) + ' руб.'
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
              label: 'В меню',
              backgroundColor: 'rgba(63, 147, 132, 0.3)',
              borderColor: 'rgba(63, 147, 132, 1)',
              borderWidth: 1,
              data: jsonLabelsDishPrice
            },
            {
              label: 'Себестоимость',
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
  created () {
    this.getInfoFromServer()
  }
}
</script>

<style scoped>

</style>
