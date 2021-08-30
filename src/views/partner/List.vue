<template>
  <div class="partner-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（名称）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push({ name: 'partner-add' })">
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
import partnerApi from '@/api/partner'

const store = useStore()
const router = useRouter()
const table = ref(null)

const partner = computed(() => store?.state?.auth?.partner)

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 180,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    width: 100,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '联系人',
    dataIndex: 'contact',
    align: 'center',
    width: 100
  },
  {
    title: '联系电话',
    dataIndex: 'contact_num',
    width: 120
  },
  {
    title: '简介',
    dataIndex: 'intro',
    ellipsis: true
  },
  {
    dataIndex: 'id',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return (
        <a-space size='middle'>
          <a-tooltip title='优惠券'>
            <a-button
              shape='circle'
              size='small'
              onClick={() => router.push({ name: 'partner-qrcode', params: { id: record.id } })}
            >
              <ui-icon name='md-qrcode-r' />
            </a-button>
          </a-tooltip>
          <a-button
            type='primary'
            shape='circle'
            size='small'
            onClick={() => router.push({ name: 'partner-edit', params: { id: record.id } })}
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
  return partnerApi.index({
    like: `name:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  partnerApi.destroy(item.id).then(({ data }) => {
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
.partner-list {
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
