export default {
  path: 'vips',
  meta: {
    label: '会员等级'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'vip-list',
      meta: {
        label: '会员等级',
        icon: 'md-medal-r'
      },
      component: () => import('@/views/vip/List.vue')
    },
    {
      path: 'add',
      name: 'vip-add',
      meta: {
        hidden: true,
        label: '添加会员等级'
      },
      component: () => import('@/views/vip/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'vip-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑会员等级'
      },
      component: () => import('@/views/vip/Edit.vue')
    }
  ]
}
