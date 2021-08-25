import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/services', { params })
  },
  show(id) {
    return axios.get(`/services/${id}`)
  },
  store(data) {
    return axios.post('/services', data)
  },
  update(id, data) {
    return axios.put(`/services/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/services/${id}`)
  }
}
