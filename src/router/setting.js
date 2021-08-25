export default {
  path: 'settings',
  name: 'settings',
  component: () => import('../views/setting/index.vue'),
  meta: {
    title: '系统设置',
    icon: 'md-tune-r'
  },
  children: [
    {
      path: '',
      name: 'setting-list',
      meta: {
        title: '基本配置',
        icon: 'md-setting-fr'
      },
      component: () => import('../views/setting/List.vue')
    },
    {
      path: 'admins',
      name: 'admin-list',
      meta: {
        title: '管理员',
        icon: 'md-admin-fr'
      },
      component: () => import('../views/admin/List.vue')
    },
    {
      path: 'admins/add',
      name: 'admin-add',
      meta: {
        title: '添加管理员',
        hidden: true
      },
      component: () => import('../views/admin/Add.vue')
    },
    {
      path: 'admins/:id/edit',
      name: 'admin-edit',
      props: true,
      meta: {
        title: '编辑管理员',
        hidden: true
      },
      component: () => import('../views/admin/Edit.vue')
    },
    {
      path: 'logs',
      name: 'log-list',
      meta: {
        title: '日志查询',
        icon: 'md-summarize-fr'
      },
      component: () => import('../views/log/List.vue')
    }
  ]
}
