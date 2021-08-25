<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.icon_url" label="图标">
      <image-field height="80" width="80" v-model:value="modelRef.icon_url" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.video_url" label="视频">
      <video-field height="180" width="320" v-model:value="modelRef.video_url" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.priority" label="优先级">
      <a-input-number v-model:value="modelRef.priority" :min="0" :max="9999" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.intro" label="简介">
      <a-textarea v-model:value="modelRef.intro" placeholder="简介" :rows="4" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.tip" label="提示">
      <a-textarea v-model:value="modelRef.tip" placeholder="提示" :rows="2" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.content" label="详情">
      <rich-field v-model:value="modelRef.content" height="580" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'
import VideoField from '@/components/video/Field.vue'
import RichField from '@/components/rich/Field.vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 32, message: '长度为 1 ~ 32 位' }
  ],
  icon_url: [
    { required: true, message: '必填' },
    { type: 'url', min: 1, max: 1024, message: '地址长度为 1 ~ 1024 位' }
  ],
  video_url: [{ type: 'url', min: 1, max: 1024, message: '地址长度为 1 ~ 1024 位' }],
  intro: [{ min: 0, max: 1000, message: '长度为 0 ~ 1000 位' }],
  tip: [{ min: 0, max: 255, message: '长度为 0 ~ 255 位' }],
  priority: [{ type: 'number', min: 0, max: 9999, message: '0 ~ 9999' }],
  content: [{ min: 0, max: 65535, message: '长度为 0 ~ 65535 位' }]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

defineExpose({
  validate: () => {
    return new Promise((resolve, reject) => {
      validate()
        .then(() => {
          resolve(toRaw(modelRef))
        })
        .catch((e) => reject(e))
    })
  }
})
</script>

<style lang="less" scoped></style>
