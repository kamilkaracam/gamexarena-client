import axios from 'axios'

const FETCH_COUNTRIES = 'fetchCountries'
const FETCH_TIMEZONES = 'fetchTimeZones'

export default {
  namespaced: true,
  state: {
    countries: [],
    timezones: []
  },
  getters: {
    countries: state => state.countries,
    timezones: state => state.timezones
  },
  actions: {
    fetchCountries({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/countries').then((resp) => {
          commit(FETCH_COUNTRIES, resp.data.data)
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchTimeZones({commit}, data) {
      return new Promise((resolve, reject) => {
        axios.get('/api/timezones').then((resp) => {
          commit(FETCH_TIMEZONES, resp.data.data)
          resolve(resp)
        }).catch((err) => {
          reject(err)
        })
      })
    },
  },
  mutations: {
    [FETCH_COUNTRIES](state, payload) {
      state.countries = payload
    },
    [FETCH_TIMEZONES](state, payload) {
      state.timezones = payload
    }
  }
}
