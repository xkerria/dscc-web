import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/banners', { params })
  },
  show(id) {
    return axios.get(`/banners/${id}`)
  },
  store(data) {
    return axios.post('/banners', data)
  },
  update(id, data) {
    return axios.put(`/banners/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/banners/${id}`)
  }
}
