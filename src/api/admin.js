import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/admins', { params })
  },
  show(id) {
    return axios.get(`/admins/${id}`)
  },
  store(data) {
    return axios.post('/admins', data)
  },
  update(id, data) {
    return axios.put(`/admins/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/admins/${id}`)
  }
}
