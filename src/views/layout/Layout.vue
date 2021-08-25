<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light" width="250" :trigger="null">
      <page-nav />
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <page-header />
      </a-layout-header>
      <a-layout-content class="layout-content">
        <div class="wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed, onMounted, provide, ref } from 'vue'
import PageHeader from './Header.vue'
import PageNav from './Nav.vue'
import Brand from './Brand.vue'
import { useStore } from 'vuex'

const store = useStore()

const collapsed = computed(() => store.state.glob.navCollapsed)

store.dispatch('auth/init')
store.dispatch('auth/keep')
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  width: 100vw;

  &-header {
    padding: 0;
  }

  &-content {
    padding: 16px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    .wrapper {
      background-color: #fff;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
