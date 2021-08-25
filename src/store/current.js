const state = () => ({
  course: null,
  videos: [],
  attachments: []
})

const mutations = {
  set_course(state, payload) {
    state.course = payload
  },
  set_videos(state, payload) {
    state.videos = payload
  },
  set_video(state, obj) {
    let index = state.videos.findIndex((i) => i.id === obj.id)
    if (index === -1) {
      index = state.videos.push({ ...obj }) - 1
    } else {
      state.videos[index] = { ...obj }
    }
  },
  set_attachment(state, obj) {
    let index = state.attachments.findIndex((i) => i.id === obj.id)
    if (index === -1) {
      index = state.attachments.push({ ...obj }) - 1
    } else {
      state.attachments[index] = { ...obj }
    }
  }
}

const actions = {
  setCourse({ commit }, obj) {
    commit('set_course', obj)
  },
  setVideos({ commit }, arr) {
    commit('set_videos', arr)
  },
  uploadVideo({ commit }, obj) {
    commit('set_video', obj)
  },
  setAttachments({ commit }, arr) {
    commit('set_attachments', arr)
  },
  uploadAttachment({ commit }, obj) {
    commit('set_attachment', obj)
  }
}

export default { namespaced: true, state, mutations, actions }
