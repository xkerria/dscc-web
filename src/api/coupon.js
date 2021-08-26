import axios from '@/utils/axios'

export default {
  index(params) {
    return axios.get('/coupons', { params })
  },
  show(id) {
    return axios.get(`/coupons/${id}`)
  },
  store(data) {
    return axios.post('/coupons', data)
  },
  update(id, data) {
    return axios.put(`/coupons/${id}`, data)
  },
  destroy(id) {
    return axios.delete(`/coupons/${id}`)
  }
}
