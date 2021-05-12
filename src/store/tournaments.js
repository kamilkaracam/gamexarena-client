import axios from 'axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    fetchTournaments({commit}, data) {
      let includes = data.includes ? '?include=' + data.includes.join(',') : ''
      return new Promise((resolve, reject) => {
        axios.get('/api/tournaments' + includes)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    fetchTournament({commit}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : ''
      return new Promise((resolve, reject) => {
        axios.get('/api/tournaments/' + data.uuid + includes)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    fetchChatMessages({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/tournaments/' + data.uuid + '/chats')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    joinTournament({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/tournaments/' + data.uuid + '/competitors')
          .then((resp) => resolve(resp))
          .catch((err) => reject(err))
      })
    },
    fetchCompetitors({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/tournaments/' + data.uuid + '/competitors')
          .then((resp) => resolve(resp))
          .catch((err) => reject(err))
      })
    },
    fetchMatches({}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : '';
      return new Promise((resolve, reject) => {
        axios.get('/api/tournaments/' + data.uuid + '/matches' + includes)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
  },
  mutations: {},
}
