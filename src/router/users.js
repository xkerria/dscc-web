export default {
  path: 'users',
  meta: {
    label: '用户管理'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'user-list',
      meta: {
        label: '用户管理',
        icon: 'md-people-fr'
      },
      component: () => import('@/views/user/List.vue')
    },
    {
      path: 'add',
      name: 'user-add',
      meta: {
        hidden: true,
        label: '预添加用户'
      },
      component: () => import('@/views/user/Add.vue')
    },
    {
      path: ':id',
      name: 'user-view',
      props: true,
      meta: {
        label: '用户详情',
        hidden: true
      },
      component: () => import('@/views/user/View.vue')
    }
  ]
}
