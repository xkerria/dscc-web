<template>
  <div class="staff-add">
    <a-page-header class="header" title="添加职员" :back-icon="false" />

    <div class="container">
      <staff-form ref="form" :model="state.model" />

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
import StaffForm from './components/Form.vue'
import staffApi from '@/api/staff'

const router = useRouter()
const form = ref(null)
const model = ref({
  name: '',
  avatar_url: '',
  gender: 0,
  type: '',
  remark: ''
})
const state = reactive({ model })

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return staffApi.store(values)
    })
    .then(() => {
      message.success('添加成功')
      router.replace('/staffs')
    })
}
</script>

<style lang="less" scoped>
.staff-add {
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
