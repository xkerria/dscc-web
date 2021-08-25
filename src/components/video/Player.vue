<template>
  <div class="player">
    <video ref="video" class="video-js vjs-big-play-centered vjs-16-9"></video>
  </div>
</template>

<script setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const video = ref(null)
let player = null

const props = defineProps({
  options: {
    type: Object
  },
  source: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  player = videojs(video.value, { controls: true, ...props.options }, function onPlayerReady() {
    player.src(props.source)
  })
})

onBeforeUnmount(() => {
  player.dispose()
})
</script>

<style lang="less" scoped>
.player {
  width: 100%;
}
</style>
