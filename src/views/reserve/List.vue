<template>
  <div class="reserve-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 450px"
        enter-button
        placeholder="关键字（服务、用户昵称、用户手机号、称呼、预约手机号）"
        @search="onSearch"
      />
      <a-button type="primary" @click="$router.push({ name: 'reserve-add' })">
        <ui-icon name="md-add-r" />
        <span>添加</span>
      </a-button>
    </div>

    <div class="table">
      <antd-table
        ref="table"
        :search="search"
        :columns="columns"
        :request="request"
        size="small"
        :expandedRowRender="expandedRowRender"
      />
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
import reserveApi from '@/api/reserve'

const store = useStore()
const router = useRouter()
const table = ref(null)

const reserve = computed(() => store?.state?.auth?.reserve)

const expandedRowRender = ({ record }) => {
  return <span></span>
}

const columns = [
  {
    title: '服务',
    dataIndex: 'service_name',
    width: 120,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    width: 100,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk',
    customRender: ({ text }) => text ?? '-'
  },
  {
    title: '用户手机号',
    dataIndex: 'user_phone',
    width: 130
  },
  {
    title: '称呼',
    dataIndex: 'name',
    width: 100,
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '预约手机号',
    dataIndex: 'phone',
    width: 130
  },
  {
    title: '优惠券',
    dataIndex: 'coupon_value',
    align: 'center',
    ellipsis: true,
    sorter: true,
    width: 80,
    customRender: ({ text }) => text ?? '-'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    sorter: true,
    encoding: 'gbk'
  },
  {
    dataIndex: 'id',
    width: 120,
    align: 'right',
    customRender: ({ record }) => {
      return <a-space size='middle'></a-space>
    }
  }
]

const search = ref('')

const request = (params) => {
  return reserveApi.index({
    like: `
      service_name:${search.value}|
      nickname:${search.value}|
      user_phone:${search.value}|
      name:${search.value}|
      phone:${search.value}
    `,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onDeleteConfirm = (item) => {
  reserveApi.destroy(item.id).then(({ data }) => {
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
.reserve-list {
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
