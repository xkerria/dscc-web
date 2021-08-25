<template>
  <div class="user-view" v-if="user">
    <div class="base">
      <a-space size="large">
        <a-avatar :src="user.avatar" :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }" />
        <a-space direction="vertical">
          <div class="nickname">{{ user.nickname }}</div>
          <div class="phone">{{ user.phone }}</div>
          <a-space>
            <span v-if="user.gender">{{ { 1: '男', 2: '女' }[user.gender] }}</span>
            <span>{{ `${user?.country ?? ''}${user?.province ?? ''}${user?.city ?? ''}` }}</span>
          </a-space>
        </a-space>
      </a-space>

      <div class="points">
        <span>当前积分：</span>
        <span class="num">
          {{ user.points }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { message } from 'ant-design-vue'
import userApi from '@/api/user'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const user = ref(null)

const load = () => {
  userApi.show(props.id).then((res) => {
    user.value = res
  })
}

onMounted(() => {
  load()
})
</script>

<style lang="less" scoped>
.user-view {
  padding: 16px;

  .base {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nickname {
      font-size: 20px;
      font-weight: 500;
    }

    .points {
      .num {
        font-family: 'Bebas Neue';
        font-size: 36px;
        font-weight: 500;
        letter-spacing: 2px;
        color: #1890ff;
      }
    }
  }
}
</style>
