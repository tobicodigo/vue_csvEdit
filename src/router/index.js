/* Defining router */
/* Display RouterView-Content depending on URL  */

import { createRouter, createWebHistory } from 'vue-router'
import FileUploadView from '../views/FileUploadView.vue'
import FileWriteView from '../views/FileWriteView.vue'
import StatsView from '../views/StatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FileUploadView,
      redirect: '/import'
    },
    {
      path: '/import',
      name: 'import',
      component: FileUploadView,
    },
    {
      path: '/export',
      name: 'export',
      component: FileWriteView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatsView
    },
    
  ]
})

export default router
