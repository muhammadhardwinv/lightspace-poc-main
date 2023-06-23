export const state = () => ({
    isLoading: false,
    isLoggedin: false,
    dataUser: false
  })
  
  export const getters = {
    isLoading: state => state.isLoading,
    isLoggedin: state => state.isLoggedin,
    dataUser: state => state.dataUser
  }
  
  export const mutations = {
    SET_LOADING: (state, isLoading) => {
      state.isLoading = isLoading
    },
    SET_LOGGED_IN: (state, data) => {
      state.isLoggedin = data
      console.log('log : ', state.isLoggedin)
    },
    SET_DATA: (state, data) => {
      state.dataUser = data
      console.log('DATA : ', state.dataUser)
    }
  }
  
  export const actions = {
    // async get ({ commit }, payload) {
    //   commit('SET_LOGGED_IN', payload)
    // }
  }
