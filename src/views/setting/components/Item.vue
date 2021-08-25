<template>
  <div class="setting-item">
    <div :style="{ width: labelWidth }">
      <Text>{name}</Text>
    </div>
    <div class="value">
      <text-value v-if="props.type === 'string'"></text-value>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps } from 'vue'
import styleUtils from '@/utils/style'
import SettingItem from './components/Item'
import TextRender from './TextRender.vue'

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, defualt: 'string' },
  value: { type: String, defualt: '' },
  labelWidth: { type: [Number, String], default: 200 }
})
</script>

<style lang="less" scoped>
.setting-item {
  display: flex;
  width: 100%;
  align-items: flex-start;

  .value {
    flex: 1;
  }
}
</style>
