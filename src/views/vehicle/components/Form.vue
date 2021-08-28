<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.logo_url" label="LOGO">
      <image-field height="80" width="80" v-model:value="modelRef.logo_url" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.image_url" label="图片">
      <image-field height="90" width="160" v-model:value="modelRef.image_url" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.day_price" label="日租金">
      <a-input-number v-model:value="modelRef.day_price" :min="0" :max="99999.99" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.km_price" label="里程单价">
      <a-input-number v-model:value="modelRef.km_price" :min="0" :max="99999.99" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.remark" label="备注">
      <a-textarea v-model:value="modelRef.remark" placeholder="简介" :rows="4" />
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
  name: [
    { required: true, message: '必填' },
    { max: 255, message: '长度不超过 255 位' }
  ],
  logo_url: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  image_url: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  day_price: [{ type: 'number', min: 0, max: 99999, message: '0 ~ 99999' }],
  km_price: [{ type: 'number', min: 0, max: 99999, message: '0 ~ 99999' }],
  remark: [{ max: 1024, message: '长度不超过 1000 位' }]
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
