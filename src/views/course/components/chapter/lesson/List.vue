<template>
  <a-table :data-source="lessons" size="small" :show-header="false" :pagination="false" row-key="id" :loading="loading">
    <a-table-column width="50px">
      <template #default="{ index }">{{ index + 1 }}</template>
    </a-table-column>
    <a-table-column data-index="name">
      <template #default="{ record }">
        <a-typography-text v-model:content="record.name" :editable="{ onEnd: () => onEdit(record) }" />
      </template>
    </a-table-column>
    <a-table-column width="100px" align="right">
      <template #default="{ record }">
        <a-space>
          <a-tooltip title="上移" v-if="record.order !== 1">
            <span class="action primary" @click="onUp(record)">
              <ui-icon name="md-arrow-upward-r" />
            </span>
          </a-tooltip>
          <a-tooltip title="下移" v-if="record.order !== maxOrder">
            <span class="action primary" @click="onDown(record)">
              <ui-icon name="md-arrow-downward-r" />
            </span>
          </a-tooltip>
          <a-tooltip title="播放">
            <span class="action primary" @click="onPlay(record)">
              <ui-icon name="md-play-circle-or" />
            </span>
          </a-tooltip>
          <a-tooltip title="移除">
            <span class="action danger" @click="onDelete(record)">
              <ui-icon name="md-clear-r" />
            </span>
          </a-tooltip>
        </a-space>
      </template>
    </a-table-column>
    <template #footer>
      <div class="footer">
        <a-button type="primary" @click="onAdd">
          <ui-icon name="md-add-r" />
          <span>添加视频</span>
        </a-button>
      </div>
    </template>
  </a-table>

  <video-play ref="video" />
  <video-select v-model:visible="visible" @ok="onVideoSelect" />
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from 'vue'
import chapterApi from '@/api/chapter'
import lessonApi from '@/api/lesson'
import VideoSelect from '@/components/common/video/Select.vue'
import VideoPlay from '@/components/video/Play.vue'
import antdUtils from '@/utils/antd'
import { message } from 'ant-design-vue'
import _ from 'lodash'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const video = ref(null)
const loading = ref(false)
const lessons = ref([])
const maxOrder = ref(0)
const state = reactive({ loading, lessons, maxOrder })
const visible = ref(false)

const load = () => {
  if (!state.loading) state.loading = true
  lessonApi.index({ eq: `chapter_id:${props.id}`, sort: 'order' }).then((res) => {
    state.lessons = res
    state.maxOrder = _.max(res.map((i) => i.order))
    state.loading = false
  })
}

onMounted(() => {
  load()
})

const onEdit = (lesson) => {
  lessonApi.update(lesson.id, lesson).then(() => {
    load()
  })
}
const onPlay = (lesson) => {
  video.value.play({ src: lesson.url, type: 'video/mp4' })
}

const onUp = (lesson) => {
  lessonApi.up(lesson.id).then(() => {
    load()
  })
}
const onDown = (lesson) => {
  lessonApi.down(lesson.id).then(() => {
    load()
  })
}
const onDelete = (lesson) => {
  antdUtils
    .confirm()
    .then(() => {
      lessonApi.destroy(lesson.id).then(() => {
        message.success('删除成功')
        load()
      })
    })
    .catch(() => {})
}

const onAdd = () => {
  visible.value = true
}

const onVideoSelect = (rows) => {
  chapterApi.addLessons(props.id, rows).then(() => {
    visible.value = false
    message.success('课时添加成功')
    load()
  })
}
</script>

<style lang="less" scoped>
.action {
  cursor: pointer;
}
.primary {
  color: #1890ff;
}
.danger {
  color: #f5222d;
}

.footer {
  text-align: center;
}
</style>
