<template>
  <image-field v-if="type === 'image'" v-model:value="content" @update:value="(val) => onEnd(val)" />
  <a-typography-text v-else v-model:content="content" :editable="{ onChange, onEnd }" />
</template>

<script setup>
import { defineEmits, defineProps, nextTick, reactive, ref } from 'vue'
import ImageField from '@/components/image/Field.vue'

const emit = defineEmits(['update:modelValue', 'done'])
const props = defineProps({
  type: {
    type: String,
    validator: (val) => ['string', 'image'].includes(val)
  },
  modelValue: {
    type: String,
    required: true
  }
})

const content = ref(props.modelValue)
const state = reactive({ content })

const onChange = () => {
  emit('update:modelValue', content.value)
}

const onEnd = () => {
  emit('update:modelValue', content.value)
  nextTick(() => {
    emit('done', content.value)
  })
}
</script>

<style lang="less" scoped></style>
