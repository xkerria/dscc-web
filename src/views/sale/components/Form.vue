<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.title" label="标题">
      <a-input v-model:value="modelRef.title" placeholder="标题" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.content" label="详情">
      <rich-field v-model:value="modelRef.content" height="580" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
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
  title: [
    { required: true, message: '必填' },
    { max: 255, message: '长度不超过 255 位' }
  ],
  content: [
    { required: true, message: '必填' },
    { min: 0, max: 65535, message: '长度不超过 65535 位' }
  ]
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
