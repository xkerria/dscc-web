<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.cover" label="课程封面">
      <image-field height="90" width="160" v-model:value="modelRef.cover" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.name" label="课程名称">
      <a-input v-model:value="modelRef.name" placeholder="课程名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.price" label="课程单价">
      <a-input-number v-model:value="modelRef.price" :min="0" :max="99999" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.desc" label="课程简介">
      <a-textarea v-model:value="modelRef.desc" placeholder="课程简介" :rows="5" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.recommended" label="推荐课程">
      <a-switch v-model:checked="modelRef.recommended" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.h5" label="课程介绍">
      <rich-field v-model:value="modelRef.h5" height="480" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, reactive, toRaw } from 'vue'
import ImageField from '@/components/image/Field.vue'
import RichField from '@/components/rich/Field.vue'
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
  cover: [{ required: true, message: '必填' }],
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 255, message: '长度为 1 ~ 255 位' }
  ],
  price: [
    { required: true, message: '必填' },
    { type: 'number', min: 0, max: 99999, message: '0 ~ 99999' }
  ],
  desc: [{ required: true, message: '必填' }],
  h5: []
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
