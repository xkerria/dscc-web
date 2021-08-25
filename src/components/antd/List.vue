<template>
  <div class="antd-list">
    <div class="list" ref="list">
      <a-list rowKey="id" :data-source="data" :loading="{ spinning: loading, tip }">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <slot :item="item" :index="index" />
          </a-list-item>
        </template>
      </a-list>
    </div>
    <div class="bbar">
      <a-pagination
        showSizeChanger
        v-model:current="current"
        v-model:pageSize="pageSize"
        :total="total"
        :show-total="(total, range) => `当前 ${range[0]} ~ ${range[1]} 共 ${total}`"
        :pageSizeOptions="['10', '20', '50', '100', '1000']"
        @change="onPageChange"
        @showSizeChange="onPageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="jsx">
import {
  defineExpose,
  defineEmits,
  defineProps,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
  nextTick,
  computed
} from 'vue'

const emit = defineEmits(['update:current', 'update:pageSize', 'sort'])

const props = defineProps({
  request: {
    type: Function,
    required: true
  },
  search: {
    type: String,
    default: ''
  },
  tip: {
    type: String,
    default: '正在加载...'
  }
})

const table = ref()

const loading = ref(false)
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const data = ref([])

const getSerialWidth = (num) => {
  if (num > 1000) return 80
  if (num > 100) return 70
  if (num > 10) return 60
  return 50
}

const state = reactive({ loading, current, pageSize, total, data })

onMounted(() => {
  load()
})

const load = (params) => {
  state.loading = true
  props.request({ page: current.value, size: pageSize.value, ...params }).then((res) => {
    state.total = res.total
    state.data = res.data
    state.loading = false
  })
}

const onPageChange = (page, size) => {
  emit('update:current', page)
  load()
}

const onPageSizeChange = (page, size) => {
  emit('update:pageSize', size)
  load()
}

defineExpose({
  refresh: load
})
</script>

<style lang="less" scoped>
.antd-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .list {
    flex: 1;
    overflow-y: auto;
  }

  .bbar {
    text-align: right;
    padding-top: 8px;
  }
}
</style>
