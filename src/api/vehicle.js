import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/vehicles', { params })
  },
  show(id) {
    return axios.get(`/vehicles/${id}`)
  },
  store(data) {
    return axios.post('/vehicles', data)
  },
  update(id, data) {
    return axios.put(`/vehicles/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/vehicles/${id}`)
  }
}
