<template>
  <div class="partner-qrcode">
    <a-typography-title v-if="model" :level="3">{{ model.name }}</a-typography-title>
    <img class="qrcode" :src="qrcodeUrl" :alt="id" />
    <a-typography-text type="danger"> 请右键点击图片选择图片另存为以导出二维码用于打印 </a-typography-text>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'
import partnerApi from '@/api/partner'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const baseUrl = import.meta.env.VITE_BASE_URL
const qrcodeUrl = ref('')
const model = ref(null)

partnerApi.show(props.id).then((res) => {
  model.value = res
})
QRCode.toDataURL(`${baseUrl}/?partnerId=${props.id}`).then((url) => {
  qrcodeUrl.value = url
})
</script>

<style lang="less" scoped>
.partner-qrcode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 16px;

  .qrcode {
    width: 480px;
    height: 480px;
    object-position: center;
    object-fit: cover;
  }
}
</style>
