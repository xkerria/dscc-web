export default {
  path: 'partners',
  meta: {
    label: '合作单位'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'partner-list',
      meta: {
        label: '合作单位',
        icon: 'md-building-car'
      },
      component: () => import('@/views/partner/List.vue')
    },
    {
      path: 'add',
      name: 'partner-add',
      meta: {
        hidden: true,
        label: '添加合作单位'
      },
      component: () => import('@/views/partner/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'partner-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑合作单位'
      },
      component: () => import('@/views/partner/Edit.vue')
    }
  ]
}
