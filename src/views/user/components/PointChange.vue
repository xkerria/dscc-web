<template>
  <a-modal v-model:visible="visible" title="积分" :after-close="onClose" @ok="onOk">
    <a-input-number v-model:value="points" style="width: 100%" placeholder="积分" :min="-99999" :max="99999" />
    <a-typography-paragraph type="secondary">正数增加积分，负数减少积分。</a-typography-paragraph>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ok'])
const visible = ref(false)
const points = ref(100)

const onClose = () => {
  visible.value = false
}

const onOk = () => {
  visible.value = false
  emit('ok', points.value)
}

defineExpose({
  show() {
    visible.value = true
  }
})
</script>

<style lang="less" scoped>
.vips {
  display: grid;
  grid-template-columns: repeat(1, auto);
}
</style>
