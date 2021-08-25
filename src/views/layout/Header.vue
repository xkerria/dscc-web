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
        <a-breadcrumb>
          <template v-for="(route, index) of routes" :key="index">
            <a-breadcrumb-item v-if="index === routes.length - 1">{{ route.label }}</a-breadcrumb-item>
            <a-breadcrumb-item v-else>
              <router-link :to="route.path">{{ route.label }}</router-link>
            </a-breadcrumb-item>
          </template>
        </a-breadcrumb>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import _ from 'lodash'

const store = useStore()
const route = useRoute()
const router = useRouter()
const routes = ref([])

const admin = computed(() => store.state.auth.admin)
const collapsed = computed(() => store.state.glob.navCollapsed)

const getRoutes = () => {
  let arr = [...route.matched].map((i) => ({ path: i.path, label: i.meta.label, name: i.name }))
  arr = _.uniqBy(arr, (i) => i.label + i.path)
  return arr
}

onMounted(() => {
  routes.value = getRoutes()
})

watch(
  () => route.path,
  () => {
    routes.value = getRoutes()
  }
)

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
