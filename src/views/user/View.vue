<template>
  <div class="user-view">
    <a-space>
      <a-input-number v-model:value="num" style="width: 250px" />
      <a-button type="primary" @click="onClick">充值</a-button>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import userApi from '@/api/user'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const num = ref(10000)

const onClick = () => {
  if (num.value <= -65535 || num.value > 65535) return
  userApi.topup(props.id, num.value).then((res) => {
    console.log('充值', res)
    message.success('充值成功')
  })
}
</script>

<style lang="less" scoped>
.user-view {
  padding: 16px;
}
</style>
