<template>
  <div class="image-thumb" :style="style">
    <div class="mask" v-if="mask">
      <ui-icon name="md-eye-f" @click="onViewClick" />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import styleUtils from '@/utils/style'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    default: 'cover'
  },
  suffix: {
    type: String,
    default: ''
  },
  mask: {
    type: Boolean,
    default: false
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  width: {
    type: [String, Number],
    default: '100%'
  }
})

const style = computed(() => ({
  height: styleUtils.unit(props.height),
  width: styleUtils.unit(props.width),
  backgroundImage: `url(${props.src}${props.suffix})`,
  backgroundSize: props.mode
}))

const onViewClick = () => {}
</script>

<style lang="less" scoped>
.image-thumb {
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid hsv(0, 0, 94%);

  .mask {
    width: 100%;
    height: 100%;
    background-color: fade(#000, 45%);
    opacity: 0;
    transition-property: all;
    transition-duration: 0.3s;

    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    .icon {
      cursor: pointer;
    }
    .icon + .icon {
      margin-left: 8px;
    }
  }
  .mask:hover {
    opacity: 1;
  }
}
</style>
