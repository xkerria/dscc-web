<template>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item v-bind="validateInfos.name" label="姓名">
      <a-input v-model:value="modelRef.name" placeholder="姓名" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.phone" label="手机号">
      <a-input v-model:value="modelRef.phone" placeholder="手机号" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.password" label="密码">
      <a-input-password v-model:value="modelRef.password" placeholder="密码" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, onMounted, reactive, toRaw } from 'vue'
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
  name: [
    { required: true, message: '必填' },
    { min: 1, max: 64, message: '长度为 1 ~ 64 位' }
  ],
  phone: [
    { required: true, message: '必填' },
    { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式错误' }
  ],
  password: [
    { required: true, message: '必填' },
    { min: 6, max: 64, message: '长度为 6 ~ 32 位' }
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
