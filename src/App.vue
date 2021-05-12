<template>
  <div>
    <v-app v-if="['master-layout', 'profile-layout'].includes(layout)">
      <app-header></app-header>
      <app-header-mobile class="hidden-sm-and-up"></app-header-mobile>

      <template v-if="['master-layout'].includes(layout)">
        <router-view :key="$route.fullPath"></router-view>
      </template>

      <v-container fluid pa-0 v-if="['profile-layout'].includes(layout)">
        <v-layout row wrap style="min-height:70vh">
          <v-flex md2 class="gamexarena-green hidden-sm-and-down">
            <menu-items></menu-items>
          </v-flex>

          <v-flex md10 sm12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>


      <app-footer></app-footer>





      <alert></alert>
    </v-app>

    <v-app v-if="['welcome-layout'].includes(layout)">
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AppHeader from './components/layout/AppHeader'
  import AppHeaderMobile from './components/layout/AppHeaderMobile'
  import AppFooter from './components/layout/AppFooter'
  import MenuItems from './components/me/dashboard/MenuItems'
  import Alert from './components/helpers/Alert';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter,
      MenuItems,
      AppHeaderMobile,
      Alert,
    },
    data() {
      return {
        layout: this.$route.meta.layout || 'master-layout',
      }
    },
    watch: {
      '$route'() {
        this.layout = this.$route.meta.layout || 'master-layout'
      }
    },
    computed: {
      ...mapGetters(['channels', 'onlineUsers']),
    },
    methods: {
      ...mapActions('Auth', [
        'loggedInitialize',
        'subscribeOnlineUser',
        'subscribeNotification',
      ]),
      ...mapActions([
        'connectSocket',
        'setOnlineUsers',
        'Users/notifications',
      ]),
    },
    created() {
      let token = localStorage.getItem('token');

      
      if (token && localStorage.getItem('me')) {
        this.loggedInitialize().then(() => {
          this.channels.onlineUser.emit('join');
          this.channels.onlineUser.on('online', this.setOnlineUsers);
          this.channels.notification.on('new', this['Users/notifications']);
        });
      } else {
        this.connectSocket({});
      }
    }
  }
</script>

<style>
  @import "./assets/css/style.css";
</style>
