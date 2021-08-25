import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/categories', { params })
  },
  show(id) {
    return axios.get(`/categories/${id}`)
  },
  store(data) {
    return axios.post('/categories', data)
  },
  update(id, data) {
    return axios.put(`/categories/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/categories/${id}`)
  }
}
