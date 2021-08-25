<template>
  <div class="attachment-list">
    <a-table :data-source="data" :pagination="false" row-key="id" :show-header="false" size="small">
      <a-table-column data-index="id" title="#" align="left" width="50px">
        <template #default="{ index }">
          <span>{{ index + 1 }}</span>
        </template>
      </a-table-column>
      <a-table-column data-index="name" />
      <a-table-column data-index="mime" width="200px" align="right" />
      <a-table-column data-index="size" align="right" width="120px">
        <template #default="{ record }">
          <span>{{ numeral(record.size).format('0.0 ib') }}</span>
        </template>
      </a-table-column>
      <a-table-column data-index="id" width="60px" align="right">
        <template #default="{ record }">
          <a-space>
            <ui-icon class="primary" name="md-download-o" @click="onDownload(record)" />
            <ui-icon class="danger" name="md-clear-r" @click="onDelete(record)" />
          </a-space>
        </template>
      </a-table-column>

      <template #footer>
        <div class="footer">
          <a-button type="primary" size="large" @click="onAdd">
            <ui-icon name="md-add-r" />
            <span>添加附件</span>
          </a-button>
        </div>
      </template>
    </a-table>
  </div>

  <attachment-select v-model:visible="visible" @ok="onAttachmentSelect" :exists="data.map((i) => i.id)" />
</template>

<script setup lang="jsx">
import { inject, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import courseApi from '@/api/course'
import attachmentApi from '@/api/attachment'
import AntdTable from '@/components/antd/Table.vue'
import AttachmentSelect from '@/components/common/attachment/Select.vue'
import numeral from 'numeral'
import dayjs from 'dayjs'
import fileUtils from '@/utils/file'

const course = inject('course')

const router = useRouter()
const table = ref(null)
const attachment = ref(null)
const data = ref([])
const visible = ref(false)

const load = () => {
  courseApi.indexAttachments(course.value.id).then((res) => {
    data.value = res
  })
}

onMounted(() => {
  load()
})

const onAdd = () => {
  visible.value = true
}

const onAttachmentSelect = (keys) => {
  courseApi.storeAttachment(course.value.id, keys).then(() => {
    visible.value = false
    load()
  })
}

const onDownload = (item) => {
  fileUtils.download(item.url, item.name)
}

const onDelete = (item) => {
  courseApi.destroyAttachment(course.value.id, item.id).then(() => {
    load()
  })
}
</script>

<style lang="less" scoped>
.attachment-list {
  height: 100%;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.primary {
  color: #1890ff;
}
.danger {
  color: #f5222d;
}
</style>
