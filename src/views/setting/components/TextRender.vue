<template>
  <a-typography-paragraph v-model:value="value" editable />
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:value'])

const props = defineProps({
  value: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped></style>
