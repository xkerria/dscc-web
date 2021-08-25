import lodash from 'lodash'
import settingApi from '@/api/setting'

const state = () => ({
  settings: [],
  navCollapsed: false
})

const getters = {
  setting:
    (state) =>
    (name, raw = false) => {
      let result = state.settings.filter((i) => i.name === name)?.[0] ?? null
      result = raw ? result : result?.value ?? null
      return result
    }
}

const mutations = {
  set_settings(state, payload) {
    state.settings = payload
  },
  set_nav_collapsed(state, payload) {
    state.navCollapsed = payload
  }
}

const actions = {
  loadSettings({ commit }) {
    return new Promise((resolve, reject) => {
      settingApi
        .index()
        .then((settings) => {
          commit('set_settings', settings)
          resolve(settings)
        })
        .catch((e) => reject(e))
    })
  },
  collapse({ commit, state }) {
    commit('set_nav_collapsed', !state.navCollapsed)
  }
}

export default { namespaced: true, state, getters, mutations, actions }
