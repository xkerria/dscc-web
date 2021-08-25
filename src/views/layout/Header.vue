<template>
  <div class="header">
    <div class="left">
      <a-tooltip :title="collapsed ? '展开菜单' : '收缩菜单'">
        <span class="trigger" @click="() => store.dispatch('glob/collapse')">
          <menu-unfold-outlined v-if="collapsed" />
          <menu-fold-outlined v-else />
        </span>
      </a-tooltip>
      <span class="route">
        <a-typography-text>{{ $route?.meta?.title }}</a-typography-text>
      </span>
    </div>
    <div class="right">
      <a-dropdown>
        <a-button type="text">
          <span>{{ admin?.name }}</span>
          <ui-icon name="md-arrow-down-r" />
        </a-button>
        <template #overlay>
          <a-menu @click="onActionClick">
            <a-menu-item key="logout">
              <ui-icon name="md-logout-r" />
              <span>注销</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const admin = computed(() => store.state.auth.admin)
const collapsed = computed(() => store.state.glob.navCollapsed)

const onLinkClick = (item) => {
  router.replace(item.path)
}

const onActionClick = ({ item, key, keyPath }) => {
  switch (key) {
    case 'logout':
      return logout()
    default:
      return
  }
}

const logout = () => {
  store.dispatch('auth/logout').then(() => {
    router.replace('/login')
  })
}
</script>

<style lang="less" scoped>
.header {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  .left {
    display: flex;
    align-items: center;
    .route {
      margin-left: 24px;
    }
    .trigger {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
