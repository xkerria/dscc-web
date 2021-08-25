<template>
  <div class="user-list">
    <div class="tbar">
      <a-input-search
        v-model:value="search"
        style="width: 400px"
        enter-button
        placeholder="关键字（昵称、地区）"
        @search="onSearch"
      />
      <span></span>
    </div>

    <div class="table">
      <antd-table ref="table" row-key="openid" :search="search" :columns="columns" :request="request" />
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
import userApi from '@/api/user'

const store = useStore()
const router = useRouter()
const table = ref(null)

const user = computed(() => store?.state?.auth?.user)

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 64,
    align: 'center',
    customRender: ({ text }) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ImageThumb height='32' width='32' src={text} mode='contain' />
      </div>
    )
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 150,
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    align: 'center',
    sorter: true,
    customRender: ({ text }) => <span>{text ? '男' : '女'}</span>
  },
  {
    title: '国家',
    dataIndex: 'country',
    align: 'center',
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '省份',
    dataIndex: 'province',
    align: 'center',
    sorter: true,
    encoding: 'gbk'
  },
  {
    title: '城市',
    dataIndex: 'city',
    align: 'center',
    sorter: true,
    encoding: 'gbk'
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

const search = ref('')

const request = (params) => {
  return userApi.index({
    like: `nickname:${search.value}|country:${search.value}|province:${search.value}|city:${search.value}`,
    ...params
  })
}

const state = reactive({ columns, search, request })

const onSearch = () => {
  table.value.refresh()
}

const onMoreClick = (user) => {
  router.push(`/users/${user.id}`)
}
</script>

<style lang="less" scoped>
.user-list {
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
