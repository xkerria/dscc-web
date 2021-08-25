<template>
  <input ref="input" type="file" :accept="accept" @change="onFileChange" style="display: none" />
  <a-button type="primary" @click="onTriggerClick">
    <ui-icon name="md-upload-fr" />
    <span>上传</span>
  </a-button>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import VideoThumb from './Thumb.vue'
import Cloud from '@/libs/Cloud'
import styleUtils from '@/utils/style'

const input = ref(null)
const emit = defineEmits(['update:value'])

const props = defineProps({
  value: String,
  accept: {
    type: String,
    default: 'video/*'
  },
  tip: {
    type: String,
    default: '点击上传'
  },
  mode: {
    type: String,
    default: 'cover'
  },
  height: {
    type: [String, Number],
    default: 90
  },
  width: {
    type: [String, Number],
    default: 160
  }
})

const style = computed(() => ({
  height: styleUtils.unit(props.height),
  width: styleUtils.unit(props.width)
}))

const onFileChange = () => {
  const file = input.value.files[0]
  if (!file) return
  const cloud = new Cloud()
  cloud.upload(file).then(({ url }) => {
    emit('update:value', url)
  })
}

const onTriggerClick = (e) => {
  e.preventDefault()
  input.value.click(e)
}
</script>

<style lang="less" scoped>
.video-upload {
  cursor: pointer;

  .trigger {
    height: 100%;
    width: 100%;
    border: 1px dashed hsv(0, 0, 94%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: fade(#000, 45%);
  }
}
</style>
