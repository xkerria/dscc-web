import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import categories from './categories'
import services from './services'
import partners from './partners'
import staffs from './staffs'
import vehicles from './vehicles'
import sales from './sales'
import coupons from './coupons'
import users from './users'
import settings from './settings'

export const routes = [
  {
    path: '/',
    meta: {
      label: '首页'
    },
    component: () => import('../views/layout/Layout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        meta: {
          label: '首页',
          icon: 'md-dashboard-fr'
        },
        component: () => import('../views/dashboard/Dashboard.vue')
      },
      users,
      categories,
      services,
      partners,
      coupons,
      staffs,
      vehicles,
      sales,
      settings
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      public: true
    },
    component: () => import('../views/auth/Login.vue')
  }
]

const base = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(base),
  routes
})

router.beforeEach((to, from, next) => {
  const token = store.getters['auth/accessToken']
  if (!to.meta.public && !token) next({ name: 'login' })
  else next()
})

export default router
