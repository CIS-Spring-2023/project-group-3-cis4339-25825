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
        labels: [
          '77001',
          '77014',
          '77025',
          '77003'
        ],
        datasets: [
          {
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
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas class="p-10" ref="attendanceChart"></canvas>
  </div>
</template>
