export default {
  path: 'coupons',
  meta: {
    label: '优惠券管理'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'coupon-list',
      meta: {
        label: '优惠券管理',
        icon: 'md-coupon-fr'
      },
      component: () => import('@/views/coupon/List.vue')
    },
    {
      path: 'add',
      name: 'coupon-add',
      meta: {
        hidden: true,
        label: '添加优惠券'
      },
      component: () => import('@/views/coupon/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'coupon-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑优惠券'
      },
      component: () => import('@/views/coupon/Edit.vue')
    }
  ]
}
