<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.icon_url" label="图标">
      <image-field height="58" width="138" v-model:value="modelRef.icon_url" mode="contain" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.desc" label="描述">
      <rich-field v-model:value="modelRef.desc" height="580" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'
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
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  icon_url: [
    { required: true, message: '必填' },
    { type: 'url', min: 1, max: 1024, message: '地址长度为 1 ~ 1024 位' }
  ],
  desc: [{ min: 0, max: 1024, message: '长度为 0 ~ 1024 位' }]
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
