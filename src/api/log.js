import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/logs', { params })
  },
  show(id) {
    return axios.get(`/logs/${id}`)
  },
  store(data) {
    return axios.post('/logs', data)
  },
  update(id, data) {
    return axios.put(`/logs/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/logs/${id}`)
  }
}
