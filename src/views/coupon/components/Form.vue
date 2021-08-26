<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.title" label="标题">
      <a-input v-model:value="modelRef.title" placeholder="标题" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.type" label="类型">
      <a-select v-model:value="modelRef.type" placeholder="类型">
        <a-select-option v-for="(type, index) in types" :key="index" :value="type">
          {{ type }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.value" label="面值">
      <a-input-number v-model:value="modelRef.value" :min="0" :max="99999" style="width: 348px" />
    </a-form-item>
    <a-form-item label="有效期">
      <a-input-group compact>
        <a-form-item v-bind="validateInfos.expire" extra="从领取时间开始计算，设置为 0 则永久有效">
          <a-input-number
            v-model:value="modelRef.expire"
            :min="0"
            :max="9999"
            style="width: 280px"
            @change="onExpireChange"
          />
        </a-form-item>
        <a-form-item v-bind="validateInfos.expire_unit">
          <a-select v-model:value="modelRef.expire_unit" placeholder="单位" :disabled="modelRef.expire <= 0">
            <a-select-option v-for="(unit, index) in units" :key="index" :value="unit.value">
              {{ unit.label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-input-group>
    </a-form-item>
    <a-form-item v-bind="validateInfos.remark" label="备注">
      <a-textarea v-model:value="modelRef.remark" placeholder="备注" :rows="4" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive, ref, toRaw } from 'vue'
import { Form } from 'ant-design-vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const units = [
  { value: 'minute', label: '分钟' },
  { value: 'hour', label: '小时' },
  { value: 'day', label: '天' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' },
  { value: 'quarter', label: '季度' },
  { value: 'year', label: '年' }
]
const types = ref(['代金券'])
const modelRef = reactive({ ...props.model })
const validatorUnit = async (rule, value) => {
  if (modelRef.expire > 0 && !value) return Promise.reject('必选')
  return Promise.resolve()
}
const ruleRef = reactive({
  title: [
    { required: true, message: '必填' },
    { min: 1, max: 32, message: '长度为 1 ~ 32 位' }
  ],
  type: [{ required: true, message: '必选' }],
  value: [
    { required: true, message: '必填' },
    { type: 'integer', min: 0, max: 99999, message: '0 ~ 99999' }
  ],
  expire: [{ type: 'integer', min: 0, max: 9999, message: '0 ~ 9999' }],
  expire_unit: [{ validator: validatorUnit }],
  remark: [{ min: 0, max: 1024, message: '长度为 0 ~ 1024 位' }]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

const onExpireChange = (val) => {
  if (val <= 0) modelRef.expire_unit = null
}

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
