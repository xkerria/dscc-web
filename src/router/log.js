export default {
  path: 'logs',
  component: () => import('../views/log/index.vue'),
  meta: {
    title: '系统日志',
    icon: 'md-summarize-fr'
  },
  children: [
    {
      path: '',
      name: 'log-list',
      meta: {
        title: '异常日志',
        icon: 'md-report-fr'
      },
      component: () => import('../views/log/List.vue')
    }
  ]
}
