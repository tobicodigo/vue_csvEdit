/* Content of "Export" tab
/* Contains File-Write component


<template>
  <div>

    <!-- Check if a csv file is already loaded, if yes file-write component will be rendered -->

  <div v-if="dataAvailable">
   <h2>
   Please download your .csv file
</h2>
<div class="filedownload">

   <file-write></file-write>
   </div>
 </div>

 <!-- Check if a csv file is already loaded, if not user will see a hint -->


 <div v-else>
   <h2>No data to download available</h2>
   <h3>Please import file first</h3>
   <h1 class="centered">CSV Edit</h1>

 </div>
</div>
</template>

<script setup>
import FileWrite from '../components/Filewrite.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()

const dataAvailable = ref(false)

/* function directly at the beginning of rendering component
check if data available (file already upload) */

if (store.getters.csvData.length > 0) {
  dataAvailable.value = true
}
</script>

<style scoped>
.filedownload {
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>
