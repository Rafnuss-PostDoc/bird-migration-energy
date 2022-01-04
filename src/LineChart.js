import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  mounted () {

    var x = this.chartData.x
    var y = this.chartData.y

    this.renderChart({
        labels: x,
        datasets: [{
            label: "Power Curve",
            data: y,
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
            tension: 0.4
          }],
        },
        {
          responsive: true,
          //interaction: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Airspeed Vd"
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Power"
              },
              suggestedMin: -5,
              //suggestedMax: ,
            }
          }
        })
  }
}