<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.image" label="分类封面">
      <image-field height="64" width="252" v-model:value="modelRef.image" mode="container" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.name" label="课程名称">
      <a-input v-model:value="modelRef.name" placeholder="课程名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.on_home" label="首页展示">
      <a-switch v-model:checked="modelRef.on_home" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, reactive, toRaw } from 'vue'
import ImageField from '@/components/image/Field.vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  image: [{ required: true, message: '必填' }],
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 32, message: '长度为 1 ~ 32 位' }
  ],
  on_home: []
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
