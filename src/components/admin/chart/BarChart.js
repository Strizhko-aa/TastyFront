import {Bar, HorizontalBar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['options'],
  options: {
    responsive: true,
    maintainAspectRatio: false
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
