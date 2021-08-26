import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/partners', { params })
  },
  show(id) {
    return axios.get(`/partners/${id}`)
  },
  store(data) {
    return axios.post('/partners', data)
  },
  update(id, data) {
    return axios.put(`/partners/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/partners/${id}`)
  }
}
