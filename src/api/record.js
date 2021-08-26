import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/records', { params })
  },
  show(id) {
    return axios.get(`/records/${id}`)
  },
  store(data) {
    return axios.post('/records', data)
  },
  update(id, data) {
    return axios.put(`/records/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/records/${id}`)
  }
}
