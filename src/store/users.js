import axios from 'axios'

const FETCH_NOTIFICATIONS = 'fetchNotifications'
const NOTIFICATIONS = 'notifications';
const READ_NOTIFICATION = 'readNotification'
const FETCH_USER = 'fetchUser'

export default {
  namespaced: true,
  state: {
    notifications: [],
    changes: false,
    uuid: [],
    user: null,
    transactions: null,
  },
  getters: {
    notifications: state => state.notifications,
    changes: state => state.changes,
    uuid: state => state.uuid,
    user: state => state.user,
    transactions: state => state.transactions,
  },
  actions: {
    updatePassword({commit}, form) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/me/change-password', form).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    personalDetails({commit}, form) {
      return new Promise((resolve, reject) => {
        axios.put('/api/me', form).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchNotifications({commit}, data) {
      const token = localStorage.getItem('token');
      if(token){
          return new Promise((resolve, reject) => {
            axios.get('/api/me/notifications').then((resp) => {
              commit(FETCH_NOTIFICATIONS, resp.data.data)
              resolve(resp)
            }).catch((err) => {
              reject(err)
            })
        })
      }
    },
    notifications({dispatch, commit}, data) {
      commit(NOTIFICATIONS, data);
      dispatch('setSnackbar', {status: true, type: 'info', messages: [data.message]}, {root: true})
    },
    readNotification({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.patch('/api/me/notifications/' + data.id, {is_read: true}).then(resp => {
          commit(READ_NOTIFICATION, data)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
    fetchTransactions({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/me/transactions').then(resp => {
          resolve(resp);
        }).catch(err => {
          reject(err);
        })
      });
    },
    fetchUser({commit}, data) {
      let includes = data.includes.length ? '?include=' + data.includes.join(',') : ''
      return new Promise((resolve, reject) => {
        axios.get('/api/users/' + data.uuid + includes).then((resp) => {
          commit(FETCH_USER, resp.data)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  mutations: {
    [FETCH_NOTIFICATIONS](state, payload) {
      if (state.notifications.length && state.notifications !== payload) {
        state.changes = true
      }
      state.notifications = payload
    },
    [NOTIFICATIONS](state, payload) {
      state.notifications.push(payload)
    },
    [READ_NOTIFICATION](state, payload) {
      state.notifications.map(n => {
        if (n.id === payload.id) {
          n.is_read = true
        }
      })
    },
    [FETCH_USER](state, payload) {
      state.user = payload
    },
  }
}
