<template>
  <div class="admin-add">
    <admin-form ref="form" :model="model" />
    <div class="bbar">
      <a-button type="primary" @click="onSubmitClick">提交</a-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity'
import AdminForm from './components/Form.vue'
import adminApi from '@/api/admin'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

const router = useRouter()
const form = ref(null)
const model = reactive({ name: '', phone: '', password: '' })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return adminApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.back()
    })
}
</script>

<style lang="less" scoped>
.admin-add {
  padding: 64px 280px;
  .bbar {
    text-align: center;
  }
}
</style>
