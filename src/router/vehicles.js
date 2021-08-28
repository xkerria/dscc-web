export default {
  path: 'vehicles',
  meta: {
    label: '车辆管理'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'vehicle-list',
      meta: {
        label: '车辆管理',
        icon: 'si-mercedes'
      },
      component: () => import('@/views/vehicle/List.vue')
    },
    {
      path: 'add',
      name: 'vehicle-add',
      meta: {
        hidden: true,
        label: '添加车辆'
      },
      component: () => import('@/views/vehicle/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'vehicle-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑车辆'
      },
      component: () => import('@/views/vehicle/Edit.vue')
    }
  ]
}
