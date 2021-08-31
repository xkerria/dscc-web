<template>
  <div class="sale-add">
    <a-page-header class="header" title="添加待售车辆" :back-icon="false" />

    <div class="container">
      <sale-form ref="form" :model="state.model" />

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
import SaleForm from './components/Form.vue'
import saleApi from '@/api/sale'

const router = useRouter()
const form = ref(null)
const model = ref({ title: '', image_url: '' })
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return saleApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/sales')
    })
}
</script>

<style lang="less" scoped>
.sale-add {
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
