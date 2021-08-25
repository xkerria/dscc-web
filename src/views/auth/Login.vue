<template>
  <div class="login" :style="{ backgroundImage: `url(${bg})` }">
    <a-card class="wrapper" :title="name">
      <login-form ref="form" :model="model" />
      <a-button type="primary" style="width: 100%" @click="onLoginClick">
        <ui-icon name="md-login-r" />
        <span>登录</span>
      </a-button>
    </a-card>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LoginForm from './components/LoginForm.vue'

const router = useRouter()
const store = useStore()
const name = computed(() => store.getters['glob/setting']('平台名称'))
const bg = computed(() => store.getters['glob/setting']('登录背景'))

const form = ref(null)
const model = reactive({ phone: '', password: '' })

const onLoginClick = () => {
  form.value.validate().then((values) => {
    store.dispatch('auth/login', values).then(() => {
      router.replace('/')
    })
  })
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .wrapper {
    width: 300px;
  }
}
</style>
