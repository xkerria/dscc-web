export default {
  path: 'sales',
  meta: {
    label: '车辆待售库'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'sale-list',
      meta: {
        label: '车辆待售库',
        icon: 'si-ferrari'
      },
      component: () => import('@/views/sale/List.vue')
    },
    {
      path: 'add',
      name: 'sale-add',
      meta: {
        hidden: true,
        label: '添加车辆'
      },
      component: () => import('@/views/sale/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'sale-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑车辆'
      },
      component: () => import('@/views/sale/Edit.vue')
    }
  ]
}
