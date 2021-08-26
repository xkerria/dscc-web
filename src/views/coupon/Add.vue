<template>
  <div class="coupon-add">
    <a-page-header class="header" title="添加会员等级" :back-icon="false" />

    <div class="container">
      <coupon-form ref="form" :model="state.model" />

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
import CouponForm from './components/Form.vue'
import couponApi from '@/api/coupon'

const router = useRouter()
const form = ref(null)
const model = ref({ title: '', type: '', value: 0, expire: 0, expire_unit: null, remark: '' })
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return couponApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/coupons')
    })
}
</script>

<style lang="less" scoped>
.coupon-add {
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
