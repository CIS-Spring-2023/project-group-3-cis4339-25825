<script setup lang="ts">
import { Chart } from 'chart.js';
import { onMounted } from 'vue';
const labels = ['77003', '77303', '77009', '77056'];

const data = {
  labels: labels,
  datasets: [{
    data: [20, 12, 12, 9],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'doughnut',
  data: data,
};
onMounted(() => {
  const attendanceChart2 = new Chart(
    document.getElementById('attendanceChart2'),
    config
);
});



</script>
<template>
  <div class="shadow-lg rounded-lg overflow-hidden">
    <canvas id="attendanceChart2"></canvas>
  </div>
</template>
