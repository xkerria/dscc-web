import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/sales', { params })
  },
  show(id) {
    return axios.get(`/sales/${id}`)
  },
  store(data) {
    return axios.post('/sales', data)
  },
  update(id, data) {
    return axios.put(`/sales/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/sales/${id}`)
  }
}
