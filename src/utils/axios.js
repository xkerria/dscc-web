import Axios from 'axios'
import store from '@/store'
import router from '@/router'
import { message } from 'ant-design-vue'
import _ from 'lodash'

const config = {
  baseURL: import.meta.env.VITE_API_URL
}

const axios = Axios.create(config)

const handle = (e) => {
  switch (e.code) {
    case 40101:
      store.dispatch('auth/logout').then(() => {
        router.replace('/login')
      })
      break
    case 40102:
      message.error('密码错误')
      break
    case 422:
      message.error(_.flatten(Object.values(e?.invalid)).join(' | '))
      break
    case 500:
      break
    case 40102:
      break
    default:
      break
  }
}

axios.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/accessToken']
    if (!!token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)

axios.interceptors.response.use(
  (res) => {
    const type = res.headers?.['content-type'] ?? ''
    if (type.indexOf('application/json') !== -1) return res.data
    return res
  },
  (err) => {
    let error = { status: 0, message: '服务器未响应', code: 0 }
    if (err.response) error = err.response.data
    handle(error)
    return Promise.reject(error)
  }
)

export default axios
