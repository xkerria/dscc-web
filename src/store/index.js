import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './auth'
import glob from './glob'
import current from './current'
import log from './log'

const store = createStore({
  modules: { auth, glob, current, log },
  plugins: [createPersistedState({ paths: ['auth', 'glob'] })]
})

export default store
