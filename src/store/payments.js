import axios from 'axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    addMoney({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.post('/api/payments', data).then(resp => {
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  },
  mutations: {},
}
