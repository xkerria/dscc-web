<template>
  <div class="video-field" :style="style">
    <input ref="input" type="file" :accept="accept" @change="onFileChange" style="display: none" />

    <video-thumb v-if="value" :src="`${value}${suffix}`" :mode="mode" mask>
      <a-tooltip title="播放" color="#1890ff">
        <ui-icon name="md-play-circle-fr" @click="onPreviewClick" />
      </a-tooltip>
      <a-tooltip title="重新上传" color="#1890ff">
        <ui-icon name="md-upload-fr" @click="onTriggerClick" />
      </a-tooltip>
    </video-thumb>

    <div v-else @click="onTriggerClick" :style="style" class="trigger">
      <a-progress v-if="uploading" type="circle" :percent="percent" :status="status" />
      <template v-else>
        <slot>
          <ui-icon name="md-upload-fr" style="font-size: 24px" />
          <div>点击上传</div>
        </slot>
      </template>
    </div>
  </div>

  <video-play ref="video" />
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import VideoThumb from './Thumb.vue'
import VideoPlay from './Play.vue'
import Cloud from '@/libs/Cloud'
import styleUtils from '@/utils/style'

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

const suffix = ref(import.meta.env.VITE_OSS_SNAPSHOT_SUFFIX)
const input = ref(null)
const video = ref(null)
const uploading = ref(false)
const percent = ref(0)
const status = ref('normal')
const mime = ref('video/mp4')

const style = computed(() => ({
  height: styleUtils.unit(props.height),
  width: styleUtils.unit(props.width)
}))

const onFileChange = () => {
  emit('update:value', '')
  const file = input.value.files[0]
  if (!file) return
  uploading.value = true

  const cloud = new Cloud()
  cloud
    .upload(file, ({ percent: p, text: t }) => {
      percent.value = p
    })
    .then(({ url, mime }) => {
      emit('update:value', url)
      status.value = 'success'
      mime.value = mime
    })
    .catch(() => {
      status.value = 'exception'
    })
}

const onTriggerClick = (e) => {
  e.preventDefault()
  input.value.click(e)
}

const onPreviewClick = () => {
  video.value.play({ src: props.value, type: mime.value })
}
</script>

<style lang="less" scoped>
.video-field {
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
