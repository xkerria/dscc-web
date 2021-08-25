import logApi from '@/api/log'

const state = () => ({
  error: null
})

const mutations = {
  set_error(state, payload) {
    state.error = payload
  }
}

const actions = {
  report({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('set_error', data?.value)
      const json = JSON.stringify(data?.value)
      logApi
        .store({ source: 'server', type: 'error', ...data, value: json })
        .then((res) => resolve(res))
        .catch((e) => reject(e))
    })
  }
}

export default { state, mutations, actions }
