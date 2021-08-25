<template>
  <a-form>
    <a-form-item v-bind="validateInfos.phone">
      <a-input v-model:value="modelRef.phone" placeholder="手机号">
        <template #prefix>
          <div class="prefix">
            <ui-icon name="md-iphone-fr" />
          </div>
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password v-model:value="modelRef.password" placeholder="密码">
        <template #prefix>
          <div class="prefix">
            <ui-icon name="md-lock-fr" />
          </div>
        </template>
      </a-input-password>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { defineExpose, reactive, toRaw } from 'vue'
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
  phone: [
    { required: true, message: '必填' },
    { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式错误' }
  ],
  password: [{ required: true, message: '必填' }]
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

<style lang="less" scoped>
.prefix {
  color: hsv(0, 0, 75%);
}
</style>
