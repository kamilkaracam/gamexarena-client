import Vue from 'vue'
import Vuex from 'vuex'
import Ws from "@adonisjs/websocket-client";
// Modules
import Auth from './auth'
import Platforms from './platforms'
import Games from './games'
import Payments from './payments'
import Matches from './matches'
import Tournaments from './tournaments'
import Users from './users'
import Resources from './resources'

Vue.use(Vuex);



const SOCKET_URL = 'ws://172.16.10.31:3030';
//const SOCKET_URL = 'ws://dev.gamexarena.com:3030'
//const SOCKET_URL = 'wss://api.gamexarena.com';


const CONNECT_WITH_TOKEN = 'connect-with-token';
const CONNECT_WITHOUT_TOKEN = 'connect-without-token';
0
const TOGGLE_SNACKBAR = 'toggleSnackbar';
const SET_SNACKBAR = 'setSnackbar';
const SET_FORM_PROP = 'setFromProp';
const OPEN_DIALOG = 'openDialog';
const CLOSE_DIALOG = 'closeDialog';
const TOGGLE_DIALOG = 'toggleDialog';
const CONNECT_SOCKET = 'connectSocket';
const SUBSCRIBE_CHANNEL = 'subscribeChannel';
const SET_ONLINE_USERS = 'setOnlineUsers';
const SET_BANNER_VIEWD = 'setBannerViewed';

/**
 * Socket'in çalışma mantığı için not:
 *
 * Socket bağlantısı her durumda App içinde yapılır.
 * Login olunması halinde socket'e token yeniden bağlantısı sağlanır
 *  ve kullanıcı notification ve user:online kanallarına abone edilir
 */

export default new Vuex.Store({
  state: {
    underconstruction: true,
    createMatchDialog: false,
    bannerViewed : false,
    snackbar: {
      status: false,
      type: 'error',
      messages: [],
    },
    forms: {
      createMatch: {
        platform_id: null,
        game_id: null,
        game_type_id: null,
        wager: 0,
        options: [],
      },
    },
    ws: null,
    socketStatus: false,
    channels: {
      onlineUser: null,
      notification: null,
      match: null,
      chat: null,
    },
    onlineUsers: {},
  },
  getters: {
    snackbar: state => state.snackbar,
    ws: state => state.ws,
    channels: state => state.channels,
    onlineUsers: state => state.onlineUsers,
    createMatchDialog: state => state.createMatchDialog,
    getFormByRef: (state) => (ref) => {
      return state.forms[ref]
    },
    bannerViewed: state => state.bannerViewed
  },
  actions: {
    toggleSnackbar({commit}, data) {
      commit(TOGGLE_SNACKBAR, data);
    },
    setSnackbar({commit},data){
      commit(SET_SNACKBAR, data)
    },
    setFormProp({commit}, data) {
      commit(SET_FORM_PROP, data)
    },
    openDialog({commit}, data) {
      commit(OPEN_DIALOG, data)
    },
    closeDialog({commit}, data) {
      commit(CLOSE_DIALOG, data)
    },
    toggleDialog({commit}, data) {
      commit(TOGGLE_DIALOG, data)
    },
    connectSocket({state, commit}, data) {
      return new Promise(resolve => {
        commit(CONNECT_SOCKET, data);
        state.ws.on('open', () => {
          resolve();
        })
      });
    },
    subscribeChannel({state, commit}, data) {
      //if(!state.channels[data.state]){


        return new Promise(resolve => {
          commit(SUBSCRIBE_CHANNEL, data);
          state.channels[data.state].on('ready', () => {
            resolve();
          })
        })
      //}

    },
    setOnlineUsers({commit}, data) {
      commit(SET_ONLINE_USERS, data);
    },
    setBannerViewed({commit},data){
      commit(SET_BANNER_VIEWD,data)
    }

  },
  mutations: {
    [TOGGLE_SNACKBAR](state, payload) {
      state.snackbar.status = !state.snackbar.status;
    },
    [SET_SNACKBAR](state, payload) {
      state.snackbar = payload
    },
    [SET_FORM_PROP](state, payload) {
      Object.assign(state.forms[payload.root], payload.prop)
    },
    [OPEN_DIALOG](state, payload) {
      state[payload] = true
    },
    [CLOSE_DIALOG](state, payload) {
      state[payload] = false
    },
    [TOGGLE_DIALOG](state, payload) {
      state[payload] = !state[payload]
    },
    [CONNECT_SOCKET](state, payload) {
      if (typeof payload.token === 'undefined') {
        if (!state.socketStatus) {
          state.ws = Ws(SOCKET_URL).connect();
          state.socketStatus = CONNECT_WITHOUT_TOKEN;
        }
      } else {
        switch (state.socketStatus) {
          case CONNECT_WITHOUT_TOKEN:
          case false:
            state.ws = Ws(SOCKET_URL).withJwtToken(payload.token).connect();
            state.socketStatus = CONNECT_WITH_TOKEN;
            break;
        }
      }
    },
    [SUBSCRIBE_CHANNEL](state, payload) {
      state.channels[payload.state] = (state.ws.getSubscription(payload.channel)) ? state.ws.getSubscription(payload.channel) : state.ws.subscribe(payload.channel)
    },
    [SET_ONLINE_USERS](state, payload) {
      state.onlineUsers = payload;
    },
    [SET_BANNER_VIEWD](state, payload) {
      state.bannerViewed = payload;
    },
  },
  modules: {
    Auth,
    Platforms,
    Games,
    Payments,
    Matches,
    Tournaments,
    Users,
    Resources
  }
})
