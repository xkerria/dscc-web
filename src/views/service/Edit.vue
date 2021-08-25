<template>
  <div class="service-edit" v-if="model.id">
    <a-page-header class="header" title="编辑服务" :back-icon="false" />

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
import { onMounted } from '@vue/runtime-core'
import { message } from 'ant-design-vue'
import ServiceForm from './components/Form.vue'
import serviceApi from '@/api/service'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const form = ref(null)
const model = ref({ name: '', intro: '', tip: '', content: '', priority: 9999, icon_url: '', video_url: '' })
const state = reactive({ model })

onMounted(() => {
  serviceApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return serviceApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.back()
    })
}
</script>

<style lang="less" scoped>
.service-edit {
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
