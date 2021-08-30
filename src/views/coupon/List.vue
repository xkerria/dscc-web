<template>
  <div class="coupon-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（标题）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push({ name: 'coupon-add' })">
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
import couponApi from '@/api/coupon'

const store = useStore()
const router = useRouter()
const table = ref(null)

const coupon = computed(() => store?.state?.auth?.coupon)

const units = {
  minute: '分钟',
  hour: '小时',
  day: '天',
  week: '周',
  month: '月',
  quarter: '季度',
  year: '年'
}

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: 300,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    width: 120,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '面值',
    dataIndex: 'value',
    width: 100,
    sorter: true
  },
  {
    title: '有效时间',
    dataIndex: 'expire',
    width: 120,
    customRender: ({ record }) => <span>{record.expire + ' ' + units[record.expire_unit]}</span>
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true
  },
  {
    dataIndex: 'id',
    width: 80,
    align: 'right',
    customRender: ({ record }) => {
      return (
        <a-space size='middle'>
          <a-button
            type='primary'
            shape='circle'
            size='small'
            onClick={() => router.push({ name: 'coupon-edit', params: { id: record.id } })}
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
  return couponApi.index({
    like: `title:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  couponApi.destroy(item.id).then(({ data }) => {
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
.coupon-list {
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
