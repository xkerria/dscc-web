<template>
  <div class="log-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（来源、类型、事件、值）"
        @search="onSearch"
      />
    </div>

    <div class="table">
      <antd-table ref="table" :search="search" :columns="columns" :request="request" />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { computed, onMounted, reactive, ref } from 'vue'
import AntdTable from '@/components/antd/Table.vue'
import logApi from '@/api/log'
import dayjs from 'dayjs'

const table = ref(null)

const columns = [
  {
    title: '来源',
    dataIndex: 'source',
    sorter: true,
    align: 'center',
    width: 100
  },
  {
    title: '类型',
    dataIndex: 'type',
    sorter: true,
    align: 'center',
    width: 100
  },
  { title: '事件', dataIndex: 'event', align: 'center', width: 150, sorter: true, encoding: 'gbk' },
  { title: '值', dataIndex: 'value', ellipsis: true },
  {
    title: '时间',
    dataIndex: 'created_at',
    align: 'center',
    sorter: true,
    width: 180,
    customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm')
  }
]

const search = ref('')

const request = (params) => {
  return logApi.index({
    like: `source:${search.value}|type:${search.value}|event:${search.value}|value:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onSearch = () => {
  table.value.refresh()
}
</script>

<style lang="less" scoped>
.log-list {
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
  }
}
</style>
