export default {
  path: 'users',
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'user-list',
      meta: {
        title: '用户列表',
        icon: 'md-users-fr'
      },
      component: () => import('@/views/user/List.vue')
    },
    {
      path: ':id',
      name: 'user-view',
      props: true,
      meta: {
        title: '用户详情',
        hidden: true
      },
      component: () => import('@/views/user/View.vue')
    }
  ]
}
