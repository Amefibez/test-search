import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'TestPage',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
