<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
import zhCN from 'ant-design-vue/es/locale/zh_CN'

store.dispatch('glob/loadSettings')
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
