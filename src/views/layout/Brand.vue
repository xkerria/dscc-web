<template>
  <div class="brand">
    <div class="wrapper" :class="{ collapsed }">
      <img
        :src="logo?.value"
        class="logo"
        :style="{ height: collapsed ? '36px' : '48px', width: collapsed ? '36px' : '48px' }"
      />
      <div class="text" v-if="!collapsed">
        <div class="title">{{ title?.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const logo = computed(() => store.state.glob.settings.find((i) => i.name === 'LOGO'))
const title = computed(() => store.state.glob.settings.find((i) => i.name === '平台名称'))
const collapsed = computed(() => store.state.glob.navCollapsed)
</script>

<style lang="less" scoped>
.brand {
  width: 100%;
  padding: 8px;

  .wrapper {
    padding: 8px;
    display: flex;
    align-items: center;
    background-color: #f4f4f4;

    .logo {
      width: 48px;
      height: 48px;
      object-fit: cover;
      object-position: center;
      border-radius: 8px;
      transition-duration: 0.2s;
      transition-property: all;
    }

    .text {
      margin-left: 8px;
      transition-duration: 0.2s;
      transition-property: all;
      .title {
        font-size: 18px;
        letter-spacing: 0.1rem;
      }
    }
  }
  .collapsed {
    justify-content: center;
    background-color: #fff;
  }
}
</style>
