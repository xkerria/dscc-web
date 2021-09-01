<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.title" label="标题">
      <a-input v-model:value="modelRef.title" placeholder="标题" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.priority" label="优先级">
      <a-input-number v-model:value="modelRef.priority" :min="0" :max="9999" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.cover_url" label="封面图片">
      <image-field height="180" width="320" v-model:value="modelRef.cover_url" mode="cover" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.image_url" label="内容图片">
      <image-field height="375" width="375" v-model:value="modelRef.image_url" mode="contain" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const modelRef = reactive({ ...props.model })
const ruleRef = reactive({
  title: [
    { required: true, message: '必填' },
    { max: 255, message: '长度不超过 255 位' }
  ],
  cover_url: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  image_url: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  priority: [{ type: 'number', min: 0, max: 9999, message: '0 ~ 9999' }]
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
