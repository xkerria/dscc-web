import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/settings', { params })
  },
  show(name, params) {
    return axios.get(`/settings/${name}`, { params })
  },
  update(name, data) {
    return axios.put(`/settings/${name}`, data)
  }
}
