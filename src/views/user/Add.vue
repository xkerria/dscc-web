<template>
  <div class="user-add">
    <a-page-header class="header" title="预添加用户" :back-icon="false" />

    <div class="container">
      <user-form ref="form" :model="state.model" />

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
import UserForm from './components/Form.vue'
import userApi from '@/api/user'

const router = useRouter()
const form = ref(null)
const model = ref({ phone: '', points: 0, remark: '' })
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return userApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/users')
    })
}
</script>

<style lang="less" scoped>
.user-add {
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
