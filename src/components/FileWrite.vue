/* FileWrite component to give user download function
/* contains download Button

<template>
   <v-switch
    v-model="delimiter"
    hide-details
    true-value=";"
    false-value=","
    :label="`Delimiter: ${delimiter}`"
    class="delimiter"
  ></v-switch>
  <base-button @click="prepareDownload" class="download">download</base-button>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const delimiter = ref(",")
/* prepare Download after click on download Button */

function prepareDownload() {
  let data = ''
  let indexRow = 0;

    // reading csvData line by line and add delimiter ; and line breaks \n to get a typical csv fornat

  store.getters.csvData.forEach((line) => {
    line.forEach((element, index) => {
      if (index !== line.length - 1 && line !== '') {
        data += element + delimiter.value
      } else {
        data += element
      }
    })

    if (indexRow !== store.getters.csvData.length-1) {
      data += '\n'
      indexRow++
    }
  })
  download(data)
}



function download(data) {
  
  // Creating Blob for having a csv file format and passing the data
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)

  // Creating a html anchor
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', 'download.csv')
  a.click()
}
</script>


<style scoped>
.delimiter{
  color: black;
} 
</style>