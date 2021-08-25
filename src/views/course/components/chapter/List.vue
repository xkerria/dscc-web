<template>
  <div class="chapter-list">
    <div class="list">
      <div class="loading" v-if="loading">
        <a-spin tip="正在加载..." size="large" />
      </div>

      <a-collapse v-model:activeKey="active">
        <a-collapse-panel v-for="(chapter, index) of chapters" :key="chapter.id">
          <template #header>
            <div class="header">
              <div>
                <a-typography-text>{{ `第${index + 1}章` }}</a-typography-text>
              </div>
              <div class="name" @click.stop>
                <a-typography-text v-model:content="chapter.name" :editable="{ onEnd: () => onEdit(chapter) }" />
              </div>
              <div>
                <a-space>
                  <a-tooltip title="上移" v-if="chapter.order !== 1">
                    <span class="action primary" @click.stop="onUp(chapter)">
                      <ui-icon name="md-arrow-upward-r" />
                    </span>
                  </a-tooltip>
                  <a-tooltip title="下移" v-if="chapter.order !== maxOrder">
                    <span class="action primary" @click.stop="onDown(chapter)">
                      <ui-icon name="md-arrow-downward-r" />
                    </span>
                  </a-tooltip>
                  <a-tooltip title="删除">
                    <span class="action error" @click.stop="onDelete(chapter)">
                      <ui-icon name="md-clear-r" />
                    </span>
                  </a-tooltip>
                </a-space>
              </div>
            </div>
          </template>

          <div class="desc">
            <a-typography-text v-model:content="chapter.desc" :editable="{ onEnd: () => onEdit(chapter) }" />
          </div>

          <div class="lessons">
            <lesson-list :id="chapter.id" />
          </div>
        </a-collapse-panel>
      </a-collapse>

      <div class="bbar">
        <a-button type="primary" size="large" @click="onAdd">
          <ui-icon name="md-add-r" />
          <span>添加章节</span>
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import chapterApi from '@/api/chapter'
import antdUtils from '@/utils/antd'
import { message } from 'ant-design-vue'
import _ from 'lodash'
import LessonList from './lesson/List.vue'

const course = inject('course')

const loading = ref(false)
const chapters = ref([])
const maxOrder = ref(0)
const active = ref([])
const state = reactive({ loading, chapters, maxOrder, active })

const load = () => {
  if (!state.loading) state.loading = true
  chapterApi.index({ eq: `course_id:${course.value.id}`, with: 'lessons', sort: 'order' }).then((res) => {
    // state.active = res.map((i) => i.id)
    state.chapters = res
    state.maxOrder = _.max(res.map((i) => i.order))
    state.loading = false
  })
}

load()

const onUp = (chapter) => {
  state.loading = true
  chapterApi.up(chapter.id).then(() => {
    load()
  })
}
const onDown = (chapter) => {
  state.loading = true
  chapterApi.down(chapter.id).then(() => {
    load()
  })
}

const onEdit = (chapter) => {
  state.loading = true
  chapterApi.update(chapter.id, chapter).then(() => {
    load()
  })
}

const onDelete = (chapter) => {
  antdUtils
    .confirm()
    .then(() => {
      state.loading = true
      chapterApi.destroy(chapter.id).then(() => {
        message.success('删除成功')
        load()
      })
    })
    .catch(() => {})
}

const onAdd = () => {
  state.loading = true
  chapterApi.store({ course_id: props.id, name: '新章节', desc: '章节描述' }).then((res) => {
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
.error {
  color: #ff4d4f;
}

.chapter-list {
  padding: 16px;
  background-color: #fff;

  .list {
    position: relative;
    .loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.8);
      z-index: 10;
    }
    .header {
      display: flex;
      align-items: center;

      .name {
        flex: 1;
        margin-left: 24px;
      }
    }

    .lessons {
      margin-top: 24px;
    }
  }
}

.bbar {
  padding: 24px;
  text-align: center;
}
</style>
