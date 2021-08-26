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
      <router-link :to="{ name: 'user-add' }">
        <a-button type="primary">
          <ui-icon name="md-add-r" />
          <span>预添加</span>
        </a-button>
      </router-link>
    </div>

    <div class="table">
      <antd-table ref="table" row-key="id" :search="search" :columns="columns" :request="request" size="small" />
    </div>
  </div>

  <vip-select ref="vipSelect" @select="onVipSelect" />
  <point-change ref="pointChange" @ok="onPointChange" />
</template>

<script setup lang="jsx">
import { computed, onMounted, reactive, ref, createVNode } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import AntdTable from '@/components/antd/Table.vue'
import ImageThumb from '@/components/image/Thumb.vue'
import VipSelect from './components/VipSelect.vue'
import PointChange from './components/PointChange.vue'
import userApi from '@/api/user'

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 64,
    align: 'center',
    customRender: ({ text }) =>
      text ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ImageThumb height='32' width='32' src={text} mode='contain' />
        </div>
      ) : (
        ''
      )
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 120,
    sorter: true
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
    customRender: ({ text }) => <span>{{ 0: '未知', 1: '男', 2: '女' }[text]}</span>
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
    title: '会员等级',
    dataIndex: 'vip',
    width: 90,
    align: 'center',
    customRender: ({ record }) =>
      record.vip ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ImageThumb height='29' width='69' src={record.vip.icon_url} mode='contain' style={{ border: 'none' }} />
        </div>
      ) : (
        <span>-</span>
      )
  },
  {
    title: '积分',
    dataIndex: 'points',
    width: 150,
    align: 'center',
    sorter: true
  },
  {
    dataIndex: 'id',
    align: 'right',
    width: 70,
    customRender: ({ record }) => {
      const slots = {
        default: () => (
          <a class='ant-dropdown-link'>
            more
            <ui-icon name='md-arrow-down-r' />
          </a>
        ),
        overlay: () => (
          <a-menu>
            <a-menu-item onClick={() => onPointClick(record)}>
              <span class='text-primary'>
                <ui-icon name='md-plus-one-or' />
                &nbsp; 积分增减
              </span>
            </a-menu-item>
            <a-menu-item onClick={() => onVipClick(record)}>
              <span class='text-primary'>
                <ui-icon name='md-medal-r' />
                &nbsp; 设置会员等级
              </span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item onClick={() => onDeleteClick(record)}>
              <span class='text-danger'>
                <ui-icon name='md-delete-fr' />
                &nbsp; 删除
              </span>
            </a-menu-item>
          </a-menu>
        )
      }
      return <a-dropdown v-slots={slots} />
    }
  }
]

const store = useStore()
const router = useRouter()
const table = ref()
const vipSelect = ref()
const pointChange = ref()
const search = ref('')
const current = ref(null)

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

const onVipClick = (user) => {
  current.value = user
  vipSelect.value.show()
}

const onVipSelect = (vip) => {
  userApi.update(current.value.id, { ...current.value, vip_id: vip?.id ?? null }).then((res) => {
    table.value.refresh()
  })
}

const onPointClick = (user) => {
  current.value = user
  pointChange.value.show()
}

const onPointChange = (points) => {
  userApi.storeRecord(current.value.id, { points, remark: '后台手动修改' }).then((res) => {
    table.value.refresh()
  })
}

const onDeleteClick = (item) => {
  Modal.confirm({
    title: '警告',
    content: '该操作将无法恢复，确认要删除？',
    icon: createVNode(ExclamationCircleOutlined),
    onOk: () => {
      userApi.destroy(item.id).then(({ data }) => {
        if (data === 1) {
          table.value.refresh()
          message.success('删除成功')
        } else {
          message.success('删除失败')
        }
      })
    }
  })
}
</script>

<style lang="less" scoped>
.user-list {
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
