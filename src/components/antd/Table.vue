<template>
  <div class="antd-table">
    <div class="table" ref="table">
      <a-table
        :rowKey="rowKey"
        :data-source="data"
        :columns="cols"
        :pagination="false"
        :loading="{ spinning: loading, tip }"
        :scroll="{ y }"
        @change="onTableChange"
      />
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
  columns: {
    type: Array,
    default: []
  },
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
  },
  showSerial: {
    type: Boolean,
    default: true
  },
  rowKey: {
    type: String,
    default: 'id'
  }
})

const table = ref()

const loading = ref(false)
const current = ref(1)
const pageSize = ref(10)
const total = ref(0)
const data = ref([])
const y = ref(0)
const params = ref({})
const serialWidth = ref(50)

const getSerialWidth = (num) => {
  if (num > 1000) return 80
  if (num > 100) return 70
  if (num > 10) return 60
  return 50
}

const cols = computed(() => {
  if (!props.showSerial) return props.columns
  return [
    {
      title: '#',
      align: 'center',
      width: serialWidth.value,
      customRender: ({ index }) => (current.value - 1) * pageSize.value + index + 1
    },
    ...props.columns
  ]
})

const state = reactive({ loading, current, pageSize, total, data, y, params })

onMounted(() => {
  nextTick(() => {
    state.y = table?.value?.offsetHeight - 55
  })
  window.addEventListener('resize', () => {
    state.y = table?.value?.offsetHeight - 55
  })
  load()
})

const load = () => {
  state.loading = true
  props.request({ page: current.value, size: pageSize.value, ...state.params }).then((res) => {
    state.total = res.total
    serialWidth.value = getSerialWidth(res.total)
    state.data = res.data
    state.loading = false
  })
}

const onTableChange = (_, __, sorter) => {
  let sort = `${sorter.field}:${sorter?.order ?? 'asc'}`
  if (sorter?.column?.encoding) {
    sort += `,${sorter.column.encoding}`
  }
  state.params = { sort, order: sort }
  load()
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
.antd-table {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .table {
    flex: 1;
    overflow: hidden;
  }

  .bbar {
    text-align: right;
    padding-top: 8px;
  }
}
</style>
