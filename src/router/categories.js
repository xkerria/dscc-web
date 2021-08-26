export default {
  path: 'categories',
  meta: {
    label: '服务分类'
  },
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'category-list',
      meta: {
        label: '服务分类',
        icon: 'md-category-fr'
      },
      component: () => import('@/views/category/List.vue')
    },
    {
      path: 'add',
      name: 'category-add',
      meta: {
        hidden: true,
        label: '添加分类'
      },
      component: () => import('@/views/category/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'category-edit',
      props: true,
      meta: {
        hidden: true,
        label: '编辑分类'
      },
      component: () => import('@/views/category/Edit.vue')
    }
  ]
}
