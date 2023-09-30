/* Content of "statistics" tab
   Contains HTML-Select to select data source
   that will be shown in Chart.js Bar */

<template>
<div>
<!-- Check if a csv file is already loaded, if yes Html-Select and Bar will be rendered -->

  <div v-if="dataAvailable">
    <h2>Stats</h2>

    <select v-model="selectedValue" @change="loadData">
      <option v-for="(item, index) of tableHeader" :key="index" :value="index">{{ item }}</option>
    </select>
    <div id="chart-wrapper">
    <Bar :data="data" :options="options" ref="bar" v-if="selectedText" />
  </div>
  </div>

<!-- Check if a csv file is already loaded, if not user will see a hint -->

  <div v-else>
    <h2>No data to view available</h2>
    <h3>Please import file first</h3>
    <h1 class="centered">CSV Edit</h1>
  </div>
</div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, computed,onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useStore()
const dataAvailable = ref(false)
const selectedValue = ref('')
const selectedText = ref('')

/* function directly at the beginning of rendering component
check if data available (file already upload) */

if (store.getters.csvData.length > 0) {
  dataAvailable.value = true
  selectedValue.value = '0';
  loadData()
}

/* computed property to load options for HTML-Select */

const tableHeader = computed(() => {
  return store.getters.csvData[0]
})

/* function to load & sort data (asc) depending on selectedValue in HTML-Select */

function loadData() {
  selectedText.value = store.getters.csvData[0][selectedValue.value];
  store.dispatch('loadStatsLabels', selectedValue.value)
  store.dispatch('sortLabels', "label")

}

/* computed data property to get List of labels and sums for bar chart */

const data = computed(() => {

  const labels:any[] = [];
  const sums:any[] = [];
  store.getters.statsLabels.forEach((element) => {
    labels.push(element['label']);
    sums.push(element['sum'])
  })

  let data = {
    labels: labels,
    datasets: [{
      label: selectedText.value,
      backgroundColor: '#DDEEEE',
      data: sums
    }]
  }
  return data
})


// required options object to initialize bar chart

const options = {
  responsive: true,
  maintainAspectRatio: true

}

</script>

<style scoped>

#chart-wrapper {
    display: block;
    position: relative;
    height: 80dvh;
  }
</style>
