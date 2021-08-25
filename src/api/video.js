import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/videos', { params })
  },
  show(id) {
    return axios.get(`/videos/${id}`)
  },
  store(data) {
    return axios.post('/videos', data)
  },
  update(id, data) {
    return axios.put(`/videos/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/videos/${id}`)
  }
}
