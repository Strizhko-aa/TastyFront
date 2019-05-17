<template>
  <div>
    <b-container fluid>
      <br>
      <p hidden>{{refreshAdmin}}</p>

      <b-row>
        <b-col>
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
import store from '../store/store'

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
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: true,
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
    startRenderPage: function () {
      var jsonLabelsDishPrice = []
      var jsonLabelsDishPriceByIngredients = []
      var jsonDataName = []
      console.log(encodeURI(this.selected))
      let _url = store.getters.host + '/admin/revenue/get_dishes/' + encodeURI(this.selected)
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
              label: 'Выручка',
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
      }, 700)
    }
  },
  watch: {
    selected: function (val) {
      this.startRenderPage()
    }
  },
  computed: {
    refreshAdmin () {
      if (store.getters.value('refreshAdmin') === true) {
        store.dispatch('setValue', {key: 'refreshAdmin', value: false})
        this.startRenderPage()
      }
      return store.getters.value('refreshAdmin')
    }
  },
  created () {
    this.startRenderPage()
  }
}
</script>

<style scoped>

</style>
