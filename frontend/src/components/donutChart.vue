<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  props: {
    label: {
      type: Array
      //How to populate this? In the later section?
    },
    chartData: {
      type: Array
      //How to populate this? In the later section?
    },
    loaded: false
  },
  async mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const borderColor = backgroundColor.map((e) =>
      e.replace(/[\d\.]+\)$/g, '1)')
    )
    await new Chart(this.$refs.AttendanceChart, { //Was "AttendanceChart2"; if issues, revert and test again
      type: 'doughnut',
      data: {
        labels: [ //replace with data from the API; need to know which zips will be measured
        //An array? IF the zip code retrieved is not already in the array, THEN add it?
        //After array is filled, use it to define how many labels we'll need
        //See the props section above
        //Replace hard-coded data below with what comes back from the try-catch block
        //To-Do: fill in the API path in the try-catch block
          '77001',
          '77014',
          '77025',
          '77003',
          /* try {
            const zipList = await fetch('API call')
            this.label = zipList
          } catch(e){
            console.error(e)
          } */
        ],
        datasets: [
          { //Change colors to be random? any new label gets assigned a random color?
            //Data from the same API as the labels, but this time we just read pass it to the chart
            borderWidth: 1,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: [12,17,8,10]
            //Replace hard-coded data below with what comes back from the try-catch block
            //To-Do: fill in the API path in the try-catch block
            
            /* try {
              const dataList = await fetch('API call')
              this.chartData = dataList
              this.loaded = true
            } catch(e){
              console.error(e)
            } */
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
