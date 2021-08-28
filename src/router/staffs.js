export default {
  path: 'staffs',
  meta: {
    label: '职员管理'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'staff-list',
      meta: {
        label: '职员管理',
        icon: 'md-support-o'
      },
      component: () => import('@/views/staff/List.vue')
    },
    {
      path: 'add',
      name: 'staff-add',
      meta: {
        hidden: true,
        label: '添加职员'
      },
      component: () => import('@/views/staff/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'staff-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑职员'
      },
      component: () => import('@/views/staff/Edit.vue')
    }
  ]
}
