<template>
  <div class="partner-add">
    <a-page-header class="header" title="添加合作单位" :back-icon="false" />

    <div class="container">
      <partner-form ref="form" :model="state.model" />

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
import PartnerForm from './components/Form.vue'
import partnerApi from '@/api/partner'

const router = useRouter()
const form = ref(null)
const model = ref({ name: '', type: '', contact: '', contact_num: '', intro: '' })
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return partnerApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/partners')
    })
}
</script>

<style lang="less" scoped>
.partner-add {
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
