import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/staffs', { params })
  },
  show(id) {
    return axios.get(`/staffs/${id}`)
  },
  store(data) {
    return axios.post('/staffs', data)
  },
  update(id, data) {
    return axios.put(`/staffs/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/staffs/${id}`)
  }
}
