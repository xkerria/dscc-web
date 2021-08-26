import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/vips', { params })
  },
  show(id) {
    return axios.get(`/vips/${id}`)
  },
  store(data) {
    return axios.post('/vips', data)
  },
  update(id, data) {
    return axios.put(`/vips/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/vips/${id}`)
  }
}
