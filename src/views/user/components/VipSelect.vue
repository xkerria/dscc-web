<template>
  <a-modal
    v-model:visible="visible"
    :footer="null"
    :body-style="{ padding: '30px' }"
    :closable="false"
    :width="360"
    :after-close="onClose"
  >
    <div class="vips">
      <div class="vip" @click="onVipSelect(null)">无</div>
      <template v-for="vip of vips" :key="vip.id">
        <div class="vip" :style="{ backgroundImage: `url(${vip.icon_url})` }" @click="onVipSelect(vip)"></div>
      </template>
    </div>
  </a-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import vipApi from '@/api/vip'
import ImageThumb from '@/components/image/Thumb.vue'

const emit = defineEmits(['select'])
const visible = ref(false)
const vips = ref([])

onMounted(() => {
  vipApi.index().then((res) => {
    vips.value = res
  })
})

const onVipSelect = (vip) => {
  emit('select', vip)
  visible.value = false
}

const onClose = () => {
  visible.value = false
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
.vip {
  box-sizing: border-box;
  width: 300px;
  height: 58px;
  object-fit: contain;
  object-position: center;
  font-size: 24px;
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  border-radius: 8px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.vip:hover {
  border: 2px solid #69c0ff;
}
.vip + .vip {
  margin-top: 8px;
}
</style>
