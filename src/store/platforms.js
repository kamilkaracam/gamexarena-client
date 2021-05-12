import axios from "axios";

export default {
  namespaced: true,
  state: {
    platforms: [],
    selectedPlatforms: [],
  },
  getters: {
    platforms: state => state.platforms,
    selectedPlatforms: state => state.selectedPlatforms,
    getPlatformById: (state) => (id) => {
      return state.platforms.find(platform => platform.id === id)
    },
    getGamesByPlaformId: (state, getters) => (platformId) => {
      return platformId ? getters.getPlatformById(platformId)['games'] : []
    },
    getGameById: (state, getters) => (platformId, gameId) => {
      return getters.getGamesByPlaformId(platformId).find(game => game.id === gameId)
    },
    getGameRules: (state, getters) => (platformId, gameId, gameTypeId) => {
      return getters.getGameById(platformId, gameId)['types'].find(type => type.id === gameTypeId)['rules']
    }
  },
  actions: {
    fetchPlatforms({commit}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : ''
      return new Promise((resolve, reject) => {
        axios.get('/api/platforms' + includes)
          .then((resp) => {
            commit('setPlatforms', resp.data.data)
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          });
      })
    },
    fetchPlatform({commit}, id) {
      return new Promise((resolve, reject) => {
        axios.get('/api/platforms/' + id).then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    selectPlatforms({commit}, id) {
      commit('selectPlatforms', id)
    },
  },
  mutations: {
    setPlatforms(state, platforms) {
      state.platforms = platforms
    },
    selectPlatforms(state, platforms) {
      state.selectedPlatforms = platforms
    },
  },
}
