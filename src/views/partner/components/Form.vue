<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.name" label="名称">
      <a-input v-model:value="modelRef.name" placeholder="名称" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.type" label="类型">
      <a-select v-model:value="modelRef.type" placeholder="类型">
        <a-select-option v-for="(type, index) in types" :key="index" :value="type">{{ type }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.contact" label="联系人">
      <a-input v-model:value="modelRef.contact" placeholder="联系人" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.contact_num" label="联系电话">
      <a-input v-model:value="modelRef.contact_num" placeholder="联系电话" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.intro" label="简介">
      <a-textarea v-model:value="modelRef.intro" placeholder="简介" :rows="4" />
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

const types = ['酒店', '票务', '娱乐']

const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  type: [{ required: true, message: '必选' }],
  contact: [{ min: 0, max: 255, message: '长度为 0 ~ 255 位' }],
  contact_num: [{ min: 0, max: 255, message: '长度为 0 ~ 255 位' }],
  intro: [{ min: 0, max: 32, message: '长度为 0 ~ 1024 位' }]
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
