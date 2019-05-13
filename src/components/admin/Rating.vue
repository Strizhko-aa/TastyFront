<template>
  <div>
    <br>
    <p hidden>{{refreshAdmin}}</p>
    <b-container fluid>
      <p hidden>{{refreshAdmin}}</p>
      <h1>Продажи</h1>
      <h3>За неделю</h3>
      <bar-chart :chart-data="graphOneWeek" :options="chartOptions"></bar-chart>
      <h3>За месяц</h3>
      <bar-chart :chart-data="graphOneMonth" :options="chartOptions"></bar-chart>
      <h3>За 3 месяца</h3>
      <bar-chart :chart-data="graphThreeMonths" :options="chartOptions"></bar-chart>
    </b-container>
  </div>
</template>

<script>
/* eslint-disable */
import BarChart from './chart/BarChart'
import store from '../store/store'


export default {
  name: 'Rating',
  components: {BarChart},
  data () {
    return {
      temp: null,
      graphOneMonth: null,
      graphOneWeek: null,
      graphThreeMonths: null,
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              // ticks: 8,
              beginAtZero: true,
              fontSize: 16
            },
            labelFontSize: 20,
            gridLines: {
              display: false
            }
          }],
          xAxes: [{
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
    getInformationFromServerOneWeek: function () {
      let _url = 'http://localhost:8080/admin/rating?need_period=oneWeek'
      var jsonLabels = []
      var jsonData = []
      this.$http.get(_url).then(response =>
        response.json()).then(json => {
        console.log(json)
        Object.keys(json).forEach(function (key) {
          jsonData.push(key)
          jsonLabels.push(json[key])
        })
      }).catch(error => {
        console.log(error)
      })
      setTimeout(() => {
        this.graphOneWeek = {
          labels: jsonData,
          datasets: [
            {
              label: 'Продажи за неделю',
              backgroundColor: 'rgba(63, 147, 132, 0.3)',
              borderColor: 'rgba(63, 147, 132, 1)',
              borderWidth: 1,
              data: jsonLabels
            }
          ]
        }
      }, 700)
    },
    getInformationFromServerThreeMonths: function () {
      let _url = 'http://localhost:8080/admin/rating?need_period=threeMonths'
      var jsonLabels = []
      var jsonData = []
      this.$http.get(_url).then(response =>
        response.json()).then(json => {
        console.log(json)
        Object.keys(json).forEach(function (key) {
          jsonData.push(key)
          jsonLabels.push(json[key])
        })
      }).catch(error => {
        console.log(error)
      })
      setTimeout(() => {
        this.graphThreeMonths = {
          labels: jsonData,
          datasets: [
            {
              label: 'Продажи за 3 месяца',
              backgroundColor: 'rgba(63, 147, 132, 0.3)',
              borderColor: 'rgba(63, 147, 132, 1)',
              borderWidth: 1,
              data: jsonLabels
            }
          ]
        }
      }, 700)
    },
    getInformationFromServerOneMonth: function () {
      let _url = 'http://localhost:8080/admin/rating?need_period=oneMonth'
      var jsonLabels = []
      var jsonData = []
      this.$http.get(_url).then(response =>
        response.json()).then(json => {
        console.log(json)
        Object.keys(json).forEach(function (key) {
          jsonData.push(key)
          jsonLabels.push(json[key])
        })
      }).catch(error => {
        console.log(error)
      })
      setTimeout(() => {
        this.graphOneMonth = {
          labels: jsonData,
          datasets: [
            {
              label: 'Продажи за месяц',
              backgroundColor: 'rgba(63, 147, 132, 0.3)',
              borderColor: 'rgba(63, 147, 132, 1)',
              borderWidth: 1,
              data: jsonLabels
            }
          ]
        }
      }, 700)
    },
    startRenderPage: function () {
      this.getInformationFromServerOneMonth()
      this.getInformationFromServerOneWeek()
      this.getInformationFromServerThreeMonths()
    }
  },
  created: function () {
    this.startRenderPage()
  },
  computed: {
    refreshAdmin () {
      console.log('in refresher RATING')
      if (store.getters.value('refreshAdmin') === true) {
        console.log('refresher is true Rating')
        store.dispatch('setValue', {key: 'refreshAdmin', value: false})
        this.startRenderPage()
      } else {
        console.log('refresher is false!')
      }
      return store.getters.value('refreshAdmin')
    }
  }
}
</script>

<style scoped>

</style>
