import axios from '@/utils/axios'

export default {
  login(data) {
    return axios.post('/auth/login', data)
  },
  admin(options) {
    return axios.get('/auth/admin', options)
  },
  refreshToken() {
    return axios.get('/auth/refresh')
  }
}
