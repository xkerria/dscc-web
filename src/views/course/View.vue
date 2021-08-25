<template>
  <div class="course-view">
    <a-page-header :title="course?.name" :back-icon="false">
      <template #extra>
        <a-space size="large">
          <router-link :to="`/courses/${id}/edit`">
            <a-button>编辑</a-button>
          </router-link>
          <a-button danger @click="onDelete">删除</a-button>
        </a-space>
      </template>
    </a-page-header>
    <div class="main">
      <a-tabs v-model:activeKey="active">
        <a-tab-pane key="base" tab="课程信息">
          <course-detail />
        </a-tab-pane>
        <a-tab-pane key="chapters" tab="课时目录">
          <chapter-list v-if="course" />
        </a-tab-pane>
        <a-tab-pane key="attachments" tab="附件">
          <attachment-list v-if="course" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, provide, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import numeral from 'numeral'
import courseApi from '@/api/course'
import antdUtils from '@/utils/antd'
import ImageThumb from '@/components/image/Thumb.vue'
import CourseDetail from './components/Detail.vue'
import ChapterList from './components/chapter/List.vue'
import AttachmentList from './components/attachment/List.vue'

const route = useRoute()
const router = useRouter()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const course = ref(null)
const active = ref('base')
const state = reactive({ course, active })

provide('course', course)

onMounted(() => {
  courseApi.show(props.id).then((res) => {
    route.meta.label = res.name
    state.course = res
  })
})

const onDelete = () => {
  antdUtils
    .confirm()
    .then(() => {
      courseApi.destroy(props.id).then(() => {
        message.success('删除成功')
        router.replace('/courses')
      })
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped>
.course-view {
  background-color: #fff;
  .main {
    padding: 0 16px;
  }
}
</style>
