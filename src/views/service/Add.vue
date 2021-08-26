<template>
  <div class="service-add">
    <a-page-header class="header" title="添加服务" :back-icon="false" />

    <div class="container">
      <service-form ref="form" :model="state.model" />

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
import ServiceForm from './components/Form.vue'
import serviceApi from '@/api/service'

const router = useRouter()
const form = ref(null)
const model = ref({
  name: '',
  intro: '',
  tip: '',
  content: '',
  priority: 9999,
  icon_url: '',
  video_url: '',
  category_id: ''
})
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return serviceApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/services')
    })
}
</script>

<style lang="less" scoped>
.service-add {
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
