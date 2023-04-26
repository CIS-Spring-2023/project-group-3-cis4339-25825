<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.AttendanceChart2, {
      type: 'doughnut',
      data: {
        labels: [ //replace with data from the API; need to know which zips will be measured
        //An array? IF the zip code retrieved is not already in the array, THEN add it?
        //After array is filled, use it to define how many labels we'll need
        //Endpoints?
          '77001',
          '77014',
          '77025',
          '77003'
        ],
        datasets: [
          { //Change colors to be random? any new label gets assigned a random color?
            //Data from the same API as the labels, but this time we just read pass it to the chart
            //Endpoints?
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: [12,17,8,10]
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: true
      }
    })
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
<template>
  <div class="container">
    <!-- Meant to prevent the chart loading before data is successfully retrieved -->
    <Doughnut v-if="loaded" :data="chartData"/>
  </div>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
