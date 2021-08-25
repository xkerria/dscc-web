<template>
  <div class="admin-edit" v-if="model.id">
    <admin-form ref="form" :model="state.model" />
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
import { onMounted } from '@vue/runtime-core'
import { message } from 'ant-design-vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const form = ref(null)
const model = ref({ id: '', name: '', letter: '', logo: '' })
const state = reactive({ model })

onMounted(() => {
  adminApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return adminApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.back()
    })
}
</script>

<style lang="less" scoped>
.admin-edit {
  padding: 64px 280px;
  background-color: #fff;
  .bbar {
    text-align: center;
  }
}
</style>
