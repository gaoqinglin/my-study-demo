import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/mapIndex',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/homepage/HomePage.vue'),
      // children: [
      //   {
      //     path: 'mapIndex',
      //     name: 'mapIndex',
      //     component: () => import('@/views/bmap/MapIndex.vue'),
      //   },
      // ]
    },
    {
      path: '/mapIndex',
      name: 'mapIndex',
      component: () => import('@/views/bmap/MapIndex.vue'),
      redirect: '/mapIndex/mapPage',
      children: [
        {
          path: 'mapPage',
          name: 'mapPage',
          component: () => import('@/views/bmap/subdemo/MapPage.vue'),
        },
        {
          path: 'homeTown',
          name: 'homeTown',
          component: () => import('@/views/bmap/subdemo/HomeTown.vue'),
        },
      ]
    },
  ]
})

export default router
