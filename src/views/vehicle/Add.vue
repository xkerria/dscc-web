<template>
  <div class="vehicle-add">
    <a-page-header class="header" title="添加服务" :back-icon="false" />

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
import { message } from 'ant-design-vue'
import VehicleForm from './components/Form.vue'
import vehicleApi from '@/api/vehicle'

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

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return vehicleApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/vehicles')
    })
}
</script>

<style lang="less" scoped>
.vehicle-add {
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
