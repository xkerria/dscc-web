import _ from 'lodash'
import settingApi from '@/api/setting'

const state = () => ({
  settings: [],
  navCollapsed: false
})

const getters = {
  pageSize: (state) => {
    let val = state.settings.find((i) => i.name === '表格默认行数').value
    val = Number.isSafeInteger(parseInt(val)) ? parseInt(val) : 10
    return _.clamp(val, 10, 1000)
  },
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
