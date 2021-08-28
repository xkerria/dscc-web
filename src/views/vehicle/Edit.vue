<template>
  <div class="vehicle-edit" v-if="model.id">
    <a-page-header class="header" title="编辑服务" :back-icon="false" />

    <div class="container">
      <vehicle-form ref="form" :model="state.model" />

      <div class="bbar">
        <a-button type="primary" @click="onSubmitClick">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { message } from 'ant-design-vue'
import VehicleForm from './components/Form.vue'
import vehicleApi from '@/api/vehicle'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const form = ref(null)
const model = ref({
  name: '',
  logo_url: '',
  image_url: '',
  day_price: 0,
  km_price: 0,
  remark: ''
})
const state = reactive({ model })

onMounted(() => {
  vehicleApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return vehicleApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.back()
    })
}
</script>

<style lang="less" scoped>
.vehicle-edit {
  padding: 16px;
  background-color: #fff;
  .header {
    border-bottom: 1px solid hsv(0, 0, 94%);
  }

  .container {
    margin-top: 40px;
    .bbar {
      text-align: center;
    }
  }
}
</style>
