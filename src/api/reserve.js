import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/reserves', { params })
  },
  show(id) {
    return axios.get(`/reserves/${id}`)
  },
  store(data) {
    return axios.post('/reserves', data)
  },
  update(id, data) {
    return axios.put(`/reserves/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/reserves/${id}`)
  }
}
