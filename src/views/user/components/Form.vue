<template>
  <a-form :label-col="{ lg: 3, md: 4 }" :wrapper-col="{ lg: 21, md: 20 }">
    <a-form-item v-bind="validateInfos.phone" label="手机号">
      <a-input v-model:value="modelRef.phone" placeholder="手机号" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.points" label="初始积分">
      <a-input-number v-model:value="modelRef.points" :min="0" :max="9999" style="width: 320px" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.vip_id" label="会员等级">
      <a-select v-model:value="modelRef.vip_id" placeholder="会员等级" style="width: 320px">
        <a-select-option v-for="(vip, index) in vips" :key="index" :value="vip.id">
          <div class="vip-item">
            <image-thumb :src="vip.icon_url" width="69" height="29" mode="contain" />
            <span>{{ vip.name }}</span>
          </div>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="validateInfos.remark" label="备注">
      <a-textarea v-model:value="modelRef.remark" placeholder="备注" :rows="4" />
    </a-form-item>
  </a-form>
</template>

<script setup>
import { onMounted, reactive, toRaw, ref } from 'vue'
import { Form } from 'ant-design-vue'
import vipApi from '@/api/vip'
import ImageThumb from '@/components/image/Thumb.vue'

const useForm = Form.useForm

const props = defineProps({
  model: {
    type: Object,
    required: true
  }
})

const vips = ref([])
const modelRef = reactive({ ...props.model })

const ruleRef = reactive({
  phone: [
    { required: true, message: '必填' },
    { pattern: /^1[3-9][0-9]{9}$/, message: '手机号格式错误' }
  ],
  vip_id: [],
  priority: [{ type: 'number', min: 0, max: 9999, message: '0 ~ 9999' }],
  remark: [{ min: 0, max: 1000, message: '长度为 0 ~ 1000 位' }]
})

const { validate, validateInfos } = useForm(modelRef, ruleRef)

onMounted(() => {
  vipApi.index().then((res) => {
    vips.value = res
  })
})

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
.vip-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
