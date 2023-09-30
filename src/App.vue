/* Entry point of the Single Page Application
/* Contains Tabs Container, RouterView and Transition
/* Display RouterView-Content depending on URL

<template>
  <main>
    <div id="tabs" class="container">
      <div class="tabs">
        <router-link to="/import" v-bind:class="[route.name === 'import' ? 'active' : '']">{{
          tabTitle
        }}</router-link>
        <router-link to="/export" v-bind:class="[route.name === 'export' ? 'active' : '']"
          >Export</router-link
        >
        <router-link to="/statistics" v-bind:class="[route.name === 'statistics' ? 'active' : '']"
          >Statstics</router-link
        >
      </div>

      <div class="content">
        <div class="tabcontent">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const route = useRoute()

/* computed property to change Tab-Title reactive, depending on file loaded or not */

const tabTitle = computed(() => {
  if (store.getters.csvData.length > 0) {
    return 'Editor'
  } else {
    return 'Import'
  }
})
</script>

<style scoped>
main {
  padding: 20px;
}

.container {
  font-family: 'Nunito Sans', Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  color: #888;
}

.tabs {
  overflow: hidden;
  margin-bottom: -2px; /* hide bottom border */
  margin-left: 24px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

.tabcontent {
  padding: 30px 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 4px 4px 8px #e1e1e1;
}

.tabcontent td {
  padding: 0.3em 0.4em;
  color: #484848;
}
.tabcontent td.legend {
  color: #888;
  font-weight: bold;
  text-align: right;
}
.tabcontent .map {
  height: 173px;
  width: 220px;
  background: #d3eafb;
  margin-left: 60px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.data {
  width: 120px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
