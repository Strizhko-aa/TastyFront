<template>
  <div>
    <br>
    <b-container fluid>
      <b-row>
        <b-col>
          <bar-chart chart-data="graph"></bar-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BarChart from './chart/BarChart'
export default {
  name: 'Rating',
  components: {BarChart},
  data () {
    return {
      temp: null,
      graph: null
    }
  },
  created: function () {
    let _url = 'http://localhost:8080/admin/rating'
    this.$http.get(_url).then(response =>
      response.json()).then(json => {
      this.graph = {
        labels: ['привет', 'Сук', 'qw', 'q', 'qw', 'q', 'qw', 'q', 'qw', 'q'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70]
          }
        ]
      }
      // this.elements.type = json['type_dish']
      // this.elements.name = json['name']
      // this.elements.img = json['img_url']
      // this.elements.time = json['time']
      // this.elements.price = json['price']
      // this.elements.count = json['count']
      console.log(this.elements)
    }).catch(error => {
      // console.log(_type + ' ' + error)
      console.log(error.status)
    })
  }
}
</script>

<style scoped>

</style>
