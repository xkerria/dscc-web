export default {
  path: 'categories',
  component: () => import('@/views/base.vue'),
  children: [
    {
      path: '',
      name: 'category-list',
      meta: {
        title: '分类管理',
        icon: 'md-category-fr'
      },
      component: () => import('@/views/category/List.vue')
    },
    {
      path: 'add',
      name: 'category-add',
      meta: {
        hidden: true,
        title: '添加分类'
      },
      component: () => import('@/views/category/Add.vue')
    },
    {
      path: ':id/edit',
      name: 'category-edit',
      props: true,
      meta: {
        hidden: true,
        title: '编辑分类'
      },
      component: () => import('@/views/category/Edit.vue')
    }
  ]
}
