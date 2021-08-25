export default {
  path: 'services',
  meta: {
    label: '服务管理'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'service-list',
      meta: {
        label: '服务管理',
        icon: 'md-support-o'
      },
      component: () => import('@/views/service/List.vue')
    },
    {
      path: 'add',
      name: 'service-add',
      meta: {
        hidden: true,
        label: '添加服务'
      },
      component: () => import('@/views/service/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'service-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑服务'
      },
      component: () => import('@/views/service/Edit.vue')
    }
  ]
}
