import axios from 'axios'
import Tawk from 'vue-echo'

export default {
  namespaced: true,
  state: {
    status: '',
    isLoggedIn: false,
    me: null,
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    me: (state) => state.me
  },
  actions: {
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/register', user).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    login({dispatch, commit}, credentials) {
      return new Promise((resolve, reject) => {
        commit('loginRequest')

        axios.post('/api/auth/login', credentials).then((resp) => {
          commit('loggedIn', resp.data.token);
          resolve(resp)
        }).catch((err) => {
          commit('loggedError', err);
          localStorage.removeItem('token');
          reject(err)
        })
      })
    },
    loggedInitialize({dispatch, commit}) {
      const promises = [
        new Promise(resolve => {
          commit('loggedIn', localStorage.getItem('token'));
          resolve();
        }),
        new Promise(resolve => {
          dispatch('connectSocket', {token: localStorage.getItem('token')}, {root: true});
          resolve();
        }),
        new Promise((resolve, reject) => {
          // uuid alınması için /me bilgisi alındıktan sonra socket işlemleri yapılıyor
          dispatch('fetchMe').then(resp => {
            dispatch('subscribeOnlineUser');
            dispatch('subscribeNotification');
            resolve();
          })
        }),
      ];

      return Promise.all(promises);
    },
    fetchMe({commit}) {
      return new Promise((resolve, reject) => {
        axios.get('/api/me').then((resp) => {
          commit('setMe', resp.data);
          resolve(resp);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    forgotPassword({commit}, email) {
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/forgot-password', {email}).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    resetPassword({commit}, form) {
      let forgotKey = form.forgot_key
      form = {
        password: form.password,
        repeat_password: form.repeat_password,
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/password-reset/' + forgotKey, form).then((resp) => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    logout({commit, rootState}, data) {
      localStorage.removeItem('token')
      localStorage.removeItem('me')
      localStorage.removeItem('locale')

      delete axios.defaults.headers.common['Authorization']

      let onlineUserChannel = rootState.ws.getSubscription('user:online')
      onlineUserChannel.emit('leave')

      window.location = '/'

    },
    subscribeOnlineUser({dispatch}) {
      return new Promise((resolve, reject) => {
        dispatch('subscribeChannel', {state: 'onlineUser', channel: 'user:online'}, {root: true}).then(() => {
          // Online üyeler kanalına abone edildi
          resolve();
        });
      })
    },
    subscribeNotification({dispatch, state}) {
      return new Promise((resolve, reject) => {
        dispatch('subscribeChannel', {
          state: 'notification',
          channel: 'notification:' + state.me.uuid
        }, {root: true}).then(() => {
          // Notification kanalına abone edildi
          resolve();
        })
      })
    },
  },
  mutations: {
    loginRequest(state) {
      state.status = 'loading'
    },
    loggedIn(state, token) {
      state.isLoggedIn = true
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    loggedError(state) {
      state.status = 'error'
    },
    setMe(state, me) {
      state.me = me
      localStorage.setItem('me', JSON.stringify(me))
    }
  },
}
