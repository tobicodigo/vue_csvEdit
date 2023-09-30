/* FileUpload component
/* contains html-input, simple loading gif
/* and error when file not valid 

<template>
  <base-error v-if="!isValid">File not valid. Please upload another</base-error>
  <v-switch
    v-model="delimiter"
    hide-details
    
    true-value=";"
    false-value=","
    :label="`Delimiter: ${delimiter}`"
    class="delimiter"
  ></v-switch>
 

  <label class="text-reader">
    <v-file-input label="File input" variant="solo-filled" accept=".csv,.txt" @change="initializeTransfer" class="fileInput"></v-file-input>
    <div v-if="store.state.isLoading"><img src="/assets/loading.gif" /></div>
  </label><br>
  <a @click="loadSampleFile">or load sample file</a>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const csvData = ref('')
const isValid = ref(true)
const delimiter = ref(",")



/* function to start show loading.gif and start file reading */

function initializeTransfer(ev) {
  store.state.isLoading = true

  setTimeout(function () {
    loadTextFromFile(ev)
  }, 2000)
}

async function loadSampleFile() {
	let response = await fetch("./assets/sample.csv");
		
	if(response.status != 200) {
		throw new Error("Server Error");
	}
	let text_data = await response.text();

  csvData.value = text_data
    csvData.value = csvToArray(csvData.value, ';')
    store.dispatch('setCsvData', csvData.value)
}

/* function to read file content and dispatch vuex action */

async function loadTextFromFile(ev) {
  isValid.value = true
  console.log(ev.target.files[0])
  const file = ev.target.files[0]
  const reader = new FileReader()

  console.log(delimiter.value)
  reader.onload = function (e) {
    csvData.value = e.target.result
    csvData.value = csvToArray(csvData.value, delimiter.value)
    store.dispatch('setCsvData', csvData.value)
  }
  await reader.readAsText(file)
}

/* converts csv file content to array */

function csvToArray(str, delimiter) {
  const rows = str.split('\n')
  const result = []
  let index = 0
  let firstLineLength = 0
  for (const row of rows) {
    let values = row.split(delimiter)
    if (index === 0) {
      firstLineLength = values.length
    } else {
      if (values.length < firstLineLength) {

        values = fillRow(values, firstLineLength)
      }
    }
    index++
    result.push(values)
  }
  store.state.isLoading = false

  /* show arrow when array empty (file not loaded or empty or incorrect format) */

  if (result.length === 0) {
    isValid.value = false
  }

  return result
}

  /* fills every row with empty values until columns and row have same count of elements */

function fillRow(values, firstLineLength) {
  while (values.length < firstLineLength) {
    values.push("")
  }

  return values
}
</script>

<style scoped>
img {
  height: 80px;
}

.fileInput  {
  width:40lvw;
  margin-bottom: 0px;
  margin-top: 10px;
  margin-left: 0px;
}

.delimiter{
  color: black;
} 
</style>
