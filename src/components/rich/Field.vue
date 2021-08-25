<template>
  <editor v-model="content" :init="options" />
</template>

<script setup>
import { defineEmits, defineProps, ref, watch, onMounted, reactive } from 'vue'
import styleUtils from '@/utils/style'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import preset from '@/tinymce/preset'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  preset: {
    type: String,
    default: 'classic',
    validator: (val) => ['classic'].includes(val)
  }
})

const emit = defineEmits(['update:value'])

const options = {
  ...preset[props.preset],
  width: styleUtils.unit(props.width),
  height: styleUtils.unit(props.height)
}

const content = ref(props.value)
reactive({ content, options })

watch(
  () => content.value,
  (val) => {
    emit('update:value', val)
  }
)

onMounted(() => {
  tinymce.init({})
})
</script>
