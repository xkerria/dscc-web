<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.type" label="类型">
      <a-select v-model:value="modelRef.type" placeholder="类型" style="width: 320px">
        <a-select-option v-for="(type, index) in types" :key="index" :value="type">
          {{ type }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.priority" label="优先级">
      <a-input-number v-model:value="modelRef.priority" :min="0" :max="9999" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.image_url" label="图片">
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

const types = ['引导', 'Banner']

const modelRef = reactive({ ...props.model })
const ruleRef = reactive({
  image: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  type: [{ required: true, message: '必选' }],
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
