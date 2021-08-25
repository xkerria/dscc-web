<template>
  <a-modal
    v-model:visible="visible"
    destroy-on-close
    :body-style="{ padding: 0 }"
    :footer="null"
    :closable="false"
    :width="800"
  >
    <video-player :options="options" :source="source" />
  </a-modal>
</template>

<script setup>
import { defineExpose, reactive, ref } from 'vue'
import VideoPlayer from './Player.vue'

const source = ref({})
const options = ref({})
const visible = ref(false)
const state = reactive({ visible, options, source })

defineExpose({
  play(obj) {
    state.source = obj
    state.visible = true
  },
  close() {
    state.visible = false
  }
})
</script>

<style lang="less" scoped></style>
