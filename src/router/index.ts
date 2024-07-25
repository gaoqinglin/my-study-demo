import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/homePage',
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: () => import('@/views/homepage/HomePage.vue'),
    },
    {
      path: '/mapIndex',
      name: 'mapIndex',
      component: () => import('@/views/bmap/MapIndex.vue'),
    },
  ]
})

export default router
