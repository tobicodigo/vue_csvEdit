/* Vuex Store for global state-management 
    csvData & statsLabels holds 2-dimensional array */

import { createStore } from 'vuex'

const store = createStore({
  
  /* defining properties */

  state() {
    return {
      csvData: [],
      isLoading: false,
      statsLabels: []
    }
  },

  /* defining mutations */

  mutations: {
    /* filling csvData Array with data from File-Upload */

    setCsvData(state, payload) {
      state.csvData = payload
    },

    /* removing row */

    removeRow(state, payload) {
      state.csvData.splice(payload, 1)
    },

    /* add empty values to csvData Array when adding a new row */

    addRow(state, payload) {
      let counter = 0
      let values = []

      while (counter < state.csvData[0].length) {
        values.push('')
        counter++
      }
      state.csvData.splice(payload, 0, values)
    },
    updateItem(state, payload) {
      state.csvData[payload[0]][payload[1]] = payload[2]
    },

    /* load Label-Array for statistics and count occurences of every value */

    loadStatsLabels(state, column) {
      state.statsLabels = []
      state.csvData.forEach((row, index) => {
        let key = row[column]
        let object = {}
        object['label'] = key
        object['sum'] = 1

        const foundItem = state.statsLabels.findIndex((item) => item.label === key)

        if (foundItem != -1) {
          state.statsLabels[foundItem]['sum']++
        } else {
          if (index !== 0) {
            state.statsLabels.push(object)
          }
        }
      })
    },

    /* sort Label-Array ascending */

    sortLabels(state, property) {
      state.statsLabels.sort(function compare(a, b) {
        let comparison = 0
        if (a[property] > b[property]) {
          comparison = 1
        } else if (a[property] < b[property]) {
          comparison = -1
        }
        return comparison
      })
    }
  },

  /* defining actions with forward to mutations‚ */

  actions: {
    setCsvData(context, payload) {
      context.commit('setCsvData', payload)
    },
    removeRow(context, payload) {
      context.commit('removeRow', payload)
    },
    addRow(context, payload) {
      context.commit('addRow', payload)
    },
    updateItem(context, payload) {
      context.commit('updateItem', payload)
    },
    loadStatsLabels(context, payload) {
      context.commit('loadStatsLabels', payload)
    },
    loadStatsData(context, payload) {
      context.commit('loadStatsData', payload)
    },
    sortLabels(context, property) {
      context.commit('sortLabels', property)
    }
  },

  /* defining getters */

  getters: {
    csvData(state) {
      return state.csvData
    },
    statsLabels(state) {
      return state.statsLabels
    }
  }
})

export default store
