export default {
  path: 'reserves',
  meta: {
    label: '预订查询'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'reserve-list',
      meta: {
        label: '预订查询',
        icon: 'si-bugatti'
      },
      component: () => import('@/views/reserve/List.vue')
    }
  ]
}
