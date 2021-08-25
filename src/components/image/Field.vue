<template>
  <div class="image-field" :style="style">
    <input ref="input" type="file" :accept="accept" @change="onFileChange" style="display: none" />

    <a-tooltip :title="tip" placement="top">
      <div @click="onTriggerClick" :style="style">
        <image-thumb v-if="value" :src="value" :mode="mode" />
        <div v-else class="trigger">
          <slot>
            <ui-icon name="md-upload-fr" style="font-size: 24px" />
            <div>点击上传</div>
          </slot>
        </div>
      </div>
    </a-tooltip>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import ImageThumb from './Thumb.vue'
import Cloud from '@/libs/Cloud'
import styleUtils from '@/utils/style'

const input = ref(null)
const emit = defineEmits(['update:value'])

const props = defineProps({
  value: String,
  accept: {
    type: String,
    default: 'image/*'
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
.image-field {
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
