<template>
  <div class="banner-edit" v-if="model.id">
    <a-page-header class="header" title="编辑待售车辆" :back-icon="false" />

    <div class="container">
      <banner-form ref="form" :model="state.model" />

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
import BannerForm from './components/Form.vue'
import bannerApi from '@/api/banner'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const form = ref(null)
const model = ref({ type: '引导页', image: '', priority: 9999 })
const state = reactive({ model })

onMounted(() => {
  bannerApi.show(props.id).then((res) => {
    model.value = res
  })
})

const onSubmitClick = () => {
  form.value
    .validate()
    .then((values) => {
      return bannerApi.update(props.id, values)
    })
    .then(() => {
      message.success('编辑成功')
      router.back()
    })
}
</script>

<style lang="less" scoped>
.banner-edit {
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
