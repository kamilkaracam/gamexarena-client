// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import UnderConstruction from './UnderConstruction'
import router from './router'
import i18n from './i18n'
import store from './store'
import Vuetify from 'vuetify'
import VueGtm from 'vue-gtm'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VModal from 'vue-js-modal'
Vue.use(VModal)


import Tawk from 'vue-echo'


Vue.use(require('vue-moment'));

//Vue.use(SweetModal)

Vue.use(Vuetify, {
  iconfont: 'fa'
})

Vue.config.productionTip = false



Vue.use(VueGtm, {
  id: 'GTM-PF3MHK5',
  enabled: process.env.NODE_ENV !== 'development',
  debug: true,
  vueRouter: router,
  ignoredViews: []
})

const underConstruction = false

// i18n.locale = 'de-DE'
/* eslint-disable no-new */

const MATCH_COMMISSION = 10;
Vue.mixin({
  methods: {
    calculateMatchPrize(entryFee, competitors = 2) {
      let total = parseFloat(entryFee) * parseInt(competitors);

      return parseFloat(total - ((total / 100) * MATCH_COMMISSION));
    }
  }
});

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {App, UnderConstruction},
  template: underConstruction ? '<UnderConstruction/>' : '<App/>',
})

