import { createStore } from 'vuex'
import user from './user'
import home from './home'

const store = createStore({
  modules: {
    home,
    user
  }
})

export default store
