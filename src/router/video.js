export default {
  path: 'videos',
  component: () => import('../views/video/index.vue'),
  meta: {
    title: '视频管理',
    icon: 'md-videos-fr'
  },
  children: [
    {
      path: '',
      name: 'video-list',
      meta: {
        title: '视频管理',
        icon: 'md-videos-fr'
      },
      component: () => import('../views/video/List.vue')
    },
    {
      path: 'uploading',
      name: 'video-uploading',
      meta: {
        title: '视频上传',
        icon: 'md-upload-fr'
      },
      component: () => import('../views/video/Uploading.vue')
    }
  ]
}
