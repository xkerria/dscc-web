import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/users', { params })
  },
  show(id) {
    return axios.get(`/users/${id}`)
  },
  store(data) {
    return axios.post('/users', data)
  },
  update(id, data) {
    return axios.put(`/users/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/users/${id}`)
  },

  storeRecord(id, data) {
    return axios.post(`/users/${id}/records`, data)
  }
}
