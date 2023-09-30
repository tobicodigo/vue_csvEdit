/* Content of "Import" tab /* Contains File-Upload component & ResetData Button


<template>
  <div>
        <!-- Check if a csv file is already loaded, if no file-upload component will be rendered -->

  <div v-if="store.getters.csvData.length === 0">
    <h2>Please upload your .csv file</h2>
    
    <div class="fileupload">
      <file-upload></file-upload>
    </div>
    <h1 class="centered">CSV Edit</h1>
  </div>

   <!-- Check if a csv file is already loaded, if yes user will see csv-list component and reset Button -->

  <div class="otherFile" v-else>
    <base-button class="load" @click="resetData">load another file</base-button>
 
  <csv-list></csv-list>
</div>
</div>
</template>

<script setup>
import FileUpload from '../components/FileUpload.vue'
import CsvList from '../components/CsvList.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const dataAvailable = ref(false)

/* function directly at the beginning of rendering component
check if data available (file already upload) */

if (store.getters.csvData.length > 0) {
  dataAvailable.value = true
}

/* function to set csvData to empty via button click, */

function resetData() {
  store.dispatch('setCsvData', '')
}
</script>

<style scoped>
.otherFile {
  text-align: right;
}
.fileupload {
  margin-top: 20px;
}
</style>
