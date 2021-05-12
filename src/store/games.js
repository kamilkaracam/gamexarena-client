import axios from 'axios'

export default {
  namespaced: true,
  state: {
    games: [],
  },
  getters: {
    games: state => state.games,
  },
  actions: {
    fetchGames({commit}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : ''
      return new Promise((resolve, reject) => {
        axios.get('/api/games' + includes)
          .then((resp) => {
            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          });
      })
    }
  }
}
