<template>
  <div class="banner-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（类型）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push({ name: 'banner-add' })">
        <ui-icon name="md-add-r" />
        <span>添加</span>
      </a-button>
    </div>

    <div class="table">
      <antd-table ref="table" :search="search" :columns="columns" :request="request" size="small" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import AntdTable from '@/components/antd/Table.vue'
import ImageThumb from '@/components/image/Thumb.vue'
import bannerApi from '@/api/banner'

const store = useStore()
const router = useRouter()
const table = ref(null)

const banner = computed(() => store?.state?.auth?.banner)

const types = {
  guide: '引导页',
  banner: 'Banner'
}

const columns = [
  {
    title: '图片',
    dataIndex: 'image_url',
    customRender: ({ text }) => <ImageThumb height='90' width='160' src={text} mode='contain' />
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    ellipsis: true,
    sorter: true
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    width: 100,
    ellipsis: true,
    sorter: true
  },
  {
    dataIndex: 'id',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return (
        <a-space size='middle'>
          <a-button
            type='primary'
            shape='circle'
            size='small'
            onClick={() => router.push({ name: 'banner-edit', params: { id: record.id } })}
          >
            <ui-icon name='md-edit-fr' />
          </a-button>
          <a-popconfirm title='该操作将无法恢复，确认要删除？' onConfirm={() => onDeleteConfirm(record)}>
            <a-button type='primary' danger shape='circle' size='small'>
              <ui-icon name='md-delete-fr' />
            </a-button>
          </a-popconfirm>
        </a-space>
      )
    }
  }
]

const search = ref('')

const request = (params) => {
  return bannerApi.index({
    like: `title:${search.value}|content:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  bannerApi.destroy(item.id).then(({ data }) => {
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
</script>

<style lang="less" scoped>
.banner-list {
  height: 100%;
  overflow: hidden;
  padding: 16px;
  padding-bottom: 8px;
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
  }
}
</style>
