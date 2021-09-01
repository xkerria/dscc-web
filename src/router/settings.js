export default {
  path: 'settings',
  meta: {
    label: '系统设置',
    icon: 'md-tune-r'
  },
  component: () => import('@/views/setting/index.vue'),
  children: [
    {
      path: '',
      name: 'setting-list',
      meta: {
        label: '参数设置',
        icon: 'md-setting-fr'
      },
      component: () => import('@/views/setting/List.vue')
    },
    {
      path: 'vips',
      name: 'vip-list',
      meta: {
        label: '会员等级',
        icon: 'md-medal-r'
      },
      component: () => import('@/views/vip/List.vue')
    },
    {
      path: 'vips/add',
      name: 'vip-add',
      meta: {
        hidden: true,
        label: '添加会员等级'
      },
      component: () => import('@/views/vip/Add.vue')
    },
    {
      path: 'vips/:id/edit',
      name: 'vip-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑会员等级'
      },
      component: () => import('@/views/vip/Edit.vue')
    },
    {
      path: 'admins',
      name: 'admin-list',
      meta: {
        label: '管理员',
        icon: 'md-admin-fr'
      },
      component: () => import('@/views/admin/List.vue')
    },
    {
      path: 'admins/add',
      name: 'admin-add',
      meta: {
        label: '添加管理员',
        hidden: true
      },
      component: () => import('@/views/admin/Add.vue')
    },
    {
      path: 'admins/:id/edit',
      name: 'admin-edit',
      props: true,
      meta: {
        label: '编辑管理员',
        hidden: true
      },
      component: () => import('@/views/admin/Edit.vue')
    },
    {
      path: 'logs',
      name: 'log-list',
      meta: {
        label: '日志查询',
        icon: 'md-summarize-fr'
      },
      component: () => import('@/views/log/List.vue')
    },
    {
      path: 'banners',
      name: 'banner-list',
      meta: {
        label: '广告管理',
        icon: 'md-images-fr'
      },
      component: () => import('@/views/banner/List.vue')
    },
    {
      path: 'banners/add',
      name: 'banner-add',
      meta: {
        label: '添加广告',
        hidden: true
      },
      component: () => import('@/views/banner/Add.vue')
    },
    {
      path: 'banners/:id/edit',
      name: 'banner-edit',
      props: true,
      meta: {
        label: '编辑广告',
        hidden: true
      },
      component: () => import('@/views/banner/Edit.vue')
    }
  ]
}
