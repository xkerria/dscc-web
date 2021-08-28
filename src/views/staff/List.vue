<template>
  <div class="staff-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（名称）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push({ name: 'staff-add' })">
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
import staffApi from '@/api/staff'

const store = useStore()
const router = useRouter()
const table = ref(null)

const staff = computed(() => store?.state?.auth?.staff)

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar_url',
    width: 64,
    align: 'center',
    customRender: ({ text }) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImageThumb height='32' width='32' src={text} />
      </div>
    )
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
    width: 100,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    align: 'center',
    width: 60,
    ellipsis: true,
    sorter: true,
    customRender: ({ text }) => <span>{{ 0: '保密', 1: '男', 2: '女' }[text]}</span>
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    width: 100,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true
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
            onClick={() => router.push({ name: 'staff-edit', params: { id: record.id } })}
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
  return staffApi.index({
    like: `name:${search.value}|type:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  staffApi.destroy(item.id).then(({ data }) => {
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
.staff-list {
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
