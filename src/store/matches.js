import axios from 'axios'

const FETCH_MATCH = 'fetchMatch'
const FETCH_MATCHES = 'fetchMatches'
const SET_MATCH_LOADING = 'setMatchLoading'
const SET_PLAYING_MATCH = 'setPlayingMatch';

export default {
  namespaced: true,
  state: {
    match: null,
    matches: {},
    matchLoading: true,
    playingMatch: null,
    addedOpponentStatus: {
      home: false,
      away: false,
    },
    joinedOpponentStatus: {
      home: false,
      away: false,
    },
  },
  getters: {
    match: state => state.match,
    matches: state => state.matches,
    matchLoading: state => state.matchLoading,
    playingMatch: state => state.playingMatch,
    addedOpponentStatus: state => state.addedOpponentStatus,
    joinedOpponentStatus: state => state.joinedOpponentStatus,
  },
  actions: {
    setPlayingMatch({commit}, data) {
      commit(SET_PLAYING_MATCH, data)
    },
    store({dispatch, commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/matches', data)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    fetchMatch({commit}, data) {
      commit(SET_MATCH_LOADING, true);
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : '';

      return new Promise((resolve, reject) => {
        axios.get('/api/matches/' + data.uuid + includes)
          .then(resp => {
            commit(FETCH_MATCH, resp.data);
            commit(SET_MATCH_LOADING, false);
            resolve(resp)
          })
          .catch(err => reject(err))
      })
    },
    fetchMatches({commit}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : ''

      return new Promise((resolve, reject) => {
        axios.get('/api/matches/' + includes)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    fetchChatMessages({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/matches/' + data.uuid + '/chats')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    fetchGameMessages({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/games/' + data.game + '/chats')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    joinMatch({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/matches/' + data.uuid + '/join')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    subscribeMatch({dispatch}, data) {
      return new Promise((resolve, reject) => {
        // Match kanalına abone edildi
        dispatch('subscribeChannel', {state: 'match', channel: 'match:' + data.uuid}, {root: true})
          .then(() => resolve())
      })
    },
    leaveMatch({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/matches/' + data.uuid + '/leave')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    },
    acceptAway({}, data) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/matches/' + data.uuid + '/accept-away')
          .then(resp => resolve(resp))
          .catch(err => reject(err));
      });
    },
    rejectAway({}, data) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/matches/' + data.uuid + '/reject-away')
          .then(resp => resolve(resp))
          .catch(err => reject(err));
      });
    },
    cancelMatch({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.delete('/api/matches/' + data.uuid)
          .then(resp => resolve(resp))
          .catch(err => reject(err));
      });
    },
    startMatch({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/matches/' + data.uuid + '/start')
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      });
    },
    submitScore({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/matches/' + data.uuid + '/scores', data.params)
          .then(resp => resolve(resp))
          .catch(err => reject(err));
      })
    },
    dispute({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/matches/' + data.uuid + '/disputes', data.params)
          .then(resp => resolve(resp))
          .catch(err => reject(err))
      })
    }
  },
  mutations: {
    [FETCH_MATCH](state, payload) {
      state.match = payload
    },
    [FETCH_MATCHES](state, payload) {
      state.matches = payload
    },
    [SET_MATCH_LOADING](state, payload) {
      state.matchLoading = payload
    },
    [SET_PLAYING_MATCH](state, payload) {
      state.playingMatch = payload
    }
  }
}
