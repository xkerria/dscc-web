<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.name" label="姓名">
      <a-input v-model:value="modelRef.name" placeholder="姓名" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.avatar_url" label="头像">
      <image-field height="100" width="100" v-model:value="modelRef.avatar_url" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.type" label="类型">
      <a-select v-model:value="modelRef.type" placeholder="类型" style="width: 320px">
        <a-select-option v-for="(type, index) in types" :key="index" :value="type">
          {{ type }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.gender" label="性别">
      <a-select v-model:value="modelRef.gender" placeholder="性别" style="width: 320px">
        <a-select-option v-for="(item, index) in genders" :key="index" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.remark" label="备注">
      <a-textarea v-model:value="modelRef.remark" placeholder="备注" :rows="4" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, toRaw, computed } from 'vue'
import { useStore } from 'vuex'
import { Form } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const store = useStore()
const types = computed(() => store.getters['glob/setting']('职员类型')?.split(','))
const genders = [
  { label: '保密', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]
const modelRef = reactive({ ...props.model })
const ruleRef = reactive({
  name: [
    { required: true, message: '必填' },
    { max: 64, message: '长度为不超过 64 位' }
  ],
  avatar_url: [
    { required: true, message: '必填' },
    { type: 'url', max: 1024, message: '地址长度不超过 1024 位' }
  ],
  type: [{ required: true, message: '必选' }],
  gender: [{ required: true, message: '必选' }],
  remark: [{ min: 0, max: 1000, message: '长度为 0 ~ 1024 位' }]
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
