<template>
  <div class="course-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（名称、简介）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push('/courses/add')">
        <ui-icon name="md-add-r" />
        <span>添加</span>
      </a-button>
    </div>

    <div class="table">
      <antd-table ref="table" :search="search" :columns="columns" :request="request" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import courseApi from '@/api/course'
import AntdTable from '@/components/antd/Table.vue'
import ImageThumb from '@/components/image/Thumb.vue'
import dayjs from 'dayjs'

const store = useStore()
const router = useRouter()
const table = ref(null)
const search = ref('')
const course = computed(() => store?.state?.auth?.course)

const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    width: 180,
    align: 'center',
    customRender: ({ text }) => <ImageThumb height='90' width='160' src={text} mode='cover' />
  },
  {
    title: '名称',
    dataIndex: 'name',
    sorter: true,
    encoding: 'gbk',
    width: 200,
    customRender: ({ text }) => <ATypographyParagraph ellipsis={{ rows: 4 }} content={text} />
  },
  { title: '单价', dataIndex: 'price', width: 150, align: 'center', sorter: true },
  {
    title: '简介',
    dataIndex: 'desc',
    customRender: ({ text }) => <ATypographyParagraph ellipsis={{ rows: 4 }} content={text} />
  },
  {
    title: '最后修改',
    dataIndex: 'updated_at',
    width: 120,
    align: 'center',
    sorter: true,
    customRender: ({ text }) => <span>{dayjs(text).format('YYYY-MM-DD HH:mm')}</span>
  },
  {
    dataIndex: 'id',
    width: 80,
    customRender: ({ record }) => (
      <a type='link' size='small' onClick={() => onMoreClick(record)}>
        more
      </a>
    )
  }
]

const request = (params) => {
  return courseApi.index({
    like: `name:${search.value}|desc:${search.value}`,
    ...params
  })
}

const onDeleteConfirm = (item) => {
  courseApi.destroy(item.id).then(({ data }) => {
    if (data === 1) {
      table.value.refresh()
      message.success('删除成功')
    } else {
      message.success('删除失败')
    }
  })
}

const onSearch = () => {
  table.value.refresh()
}

const onMoreClick = (course) => {
  store.dispatch('current/setCourse', course)
  router.push(`/courses/${course.id}`)
}
</script>

<style lang="less" scoped>
.course-list {
  height: 100%;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .tbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .table {
    flex: 1;
    overflow: hidden;

    .item {
      display: flex;
      align-items: center;
      width: 100%;

      .wrapper {
        flex: 1;
        padding: 0 16px;

        .bbar {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
