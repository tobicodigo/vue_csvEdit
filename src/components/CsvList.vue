/* CsvList component to show the csv data /* Including resetData Button and error nessage

<template>
  <div class="container">
    
    <!-- Error message shown if user tries to write non allowed delimiter ; in the input fields -->

    <base-error v-if="!isValid"
      >Data not valid. ";" are not allowed and were removed automatically</base-error
    >

    <table class="table">
      <thead>

        <!-- thead shows column headings from first line of csv
          first two columns are sticky to improve usability on bigger tables -->

        <tr>
          <th class="sticky-col first-head-col">
            <base-button @click="edit(0)"></base-button><br />
          </th>
          <th class="sticky-col second-head-col"></th>
          <th v-for="(item, entry_index) in tableHeader" :key="'header' + entry_index">
            <textarea
              type="text"
              :value="item"
              :id="entry_index"
              class="thead readonly"
              readonly
              @blur="updateItem($event, 0, entry_index)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- tbody shows content starting at second line of csv
          first two columns are sticky to improve usability on bigger tables -->

        <tr v-for="(item, row_index) in tableData" :key="'body' + row_index">
          <td class="sticky-col first-col">

            <!-- buttons with actions & parameter, index+1 to skip first line (headings) -->
            <base-button @click="edit(row_index + 1)"></base-button><br />
            <base-button @click="addItem(row_index + 1)" class="blue">+</base-button>
            <base-button @click="removeItem(row_index + 1)" class="red">-</base-button>
          </td>
          <td class="sticky-col second-col">{{ row_index + 1 }}</td>

          <!-- show input field for every item in row, default readonly, checkInput() on every change, updateItem() when losing focus -->

          <td v-for="(entry, entry_index) in item" :key="entry_index">
            <textarea
              type="text"
              :value="entry"
              class="readonly"
              readonly
              @blur="updateItem($event, row_index + 1, entry_index)"
              @input="checkInput"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isValid = ref(true)

/* computed property to show column header, first line of csvData */

const tableHeader = computed(() => {
  return store.getters.csvData[0]
})

/* computed property to show all csvData content except first line */

const tableData = computed(() => {
  return store.getters.csvData.slice(1)
})

/* checks input on every change, if user wrote delimiter ; display error */

function checkInput(event) {
  let newValue = event.target.value
  if (newValue.includes(';')) {
    event.target.classList.add('error')
    isValid.value = false
  } else {
    isValid.value = true
    event.target.classList.remove('error')
  }
}

/* saves item in csvData Array when user losing focus on input */

function updateItem(event, row_index, entry_index) {
  if (!event.target.value.includes(';')) {
    isValid.value = true
    event.target.classList.remove('error')

    store.dispatch('updateItem', [row_index, entry_index, event.target.value])
  } else {
    isValid.value = false
  }
}

/* edit function removes readonly from all inputs in entire row */

function edit(row_index) {
  let row = document.getElementsByTagName('tr')[row_index]
  let editButton = row.getElementsByTagName('button')[0]

  /* changing button to point to save function */
  editButton.className = 'save'
  editButton.onclick = function () {
    save(row_index)
  }
  let inputs = row.getElementsByTagName('textarea')
  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index]

    element.className = ''
    element.readOnly = false
  }
}

/* save function adds readonly to all inputs in entire row */

function save(row_index) {
  let row = document.getElementsByTagName('tr')[row_index]
  let editButton = row.getElementsByTagName('button')[0]

    /* changing button to point to edit function again */

  editButton.className = ''
  let inputs = row.getElementsByTagName('textarea')
  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index]

    element.className = 'readonly'
    element.readOnly = true

    if (row_index === 0) {
      element.className = 'readonly_head'
    }
  }
}

/* dispatch removeRow in vuex */

function removeItem(row_index) {
  store.dispatch('removeRow', row_index)
}

/* dispatch addRow in vuex */

function addItem(row_index) {
  store.dispatch('addRow', row_index)
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 78vh;
  overflow: scroll;
}
.table {
  border: solid 1px #ddeeee;
  border-collapse: separate;
  border-spacing: 0;
  font:
    normal 13px Arial,
    sans-serif;
}
.table thead th {
  background-color: #ddeeee;
  border: solid 1px #ddeeee;
  color: #336b6b;
  padding: 10px;
  text-align: left;
  text-shadow: 1px 1px 1px #fff;
  width: 50px;
}

th {
  position: sticky;
  top: 0;
}

.thead {
  background-color: #ddeeee;
  border: solid 1px #ddeeee;
  color: #336b6b;
}

.table tbody td {
  border: solid 1px #ddeeee;
  color: #333;
  padding: 10px;
  text-shadow: 1px 1px 1px #fff;
  width: 50px;
}

.sticky-col {
  position: -webkit-sticky;
  position: sticky;
  background-color: #ddeeee;
  text-align: center;
  z-index: 2;
}
.first-col {
  background-color: #eeeeee;
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  left: 0px;
}

.second-col {
  background-color: #f4f4f4;
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  left: 100px;
}

.first-head-col {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  left: 0px;
  z-index: 3;
}

.second-head-col {
  width: 30px;
  min-width: 30px;
  max-width: 30px;
  z-index: 3;
  left: 100px;
}

span {
  display: none;
}
.error {
  color: red;
  display: block;
}

.readonly {
  border: none;
}

.readonly_head {
  border: none;
  background-color: #ddeeee;
}

textarea {
  border: 1px solid black;
}
</style>
