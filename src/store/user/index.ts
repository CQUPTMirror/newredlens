interface User {

}

interface State {
  userinfo: User
}

const state: State = {
  userinfo: {

  }
}

const getters = {
  userinfo: (state: State) => state.userinfo
}

const mutations = {
  GET_USERINFO (state: State, userinfo: User) {
    state.userinfo = userinfo
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
