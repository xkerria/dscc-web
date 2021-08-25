import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import users from './users'
import categories from './categories'
import services from './services'

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
      categories,
      services,
      users,
      {
        path: 'settings',
        meta: {
          label: '系统设置',
          icon: 'md-tune-r'
        },
        component: () => import('../views/setting/index.vue'),
        children: [
          {
            path: '',
            name: 'setting-list',
            meta: {
              label: '参数设置',
              icon: 'md-setting-fr'
            },
            component: () => import('../views/setting/List.vue')
          },
          {
            path: 'admins',
            name: 'admin-list',
            meta: {
              label: '管理员',
              icon: 'md-admin-fr'
            },
            component: () => import('../views/admin/List.vue')
          },
          {
            path: 'admins/add',
            name: 'admin-add',
            meta: {
              label: '添加管理员',
              hidden: true
            },
            component: () => import('../views/admin/Add.vue')
          },
          {
            path: 'admins/:id/edit',
            name: 'admin-edit',
            props: true,
            meta: {
              label: '编辑管理员',
              hidden: true
            },
            component: () => import('../views/admin/Edit.vue')
          },
          {
            path: 'logs',
            name: 'log-list',
            meta: {
              label: '日志查询',
              icon: 'md-summarize-fr'
            },
            component: () => import('../views/log/List.vue')
          }
        ]
      }
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
