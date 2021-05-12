<template>
  <v-toolbar class="header">
    <template v-if="!me">
      <v-toolbar-title>
        <router-link :to="{name: 'welcome',params:{lang: $route.params.lang}}" class="gamexarena-green logo-btn">
          <img src="/static/assets/img/logo-reverse.svg" class="welcome-logo gamexarena-green">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-md-and-down welcome-desktop-menu">
        <v-btn flat :to="{name:'matches', params:{lang: $route.params.lang}}">
          {{ $t('HeaderNavigation.Matches')}}
        </v-btn>
        <v-btn flat :to="{name:'tournaments', params:{lang: $route.params.lang}}">
          {{ $t('HeaderNavigation.Tournaments') }}
        </v-btn>
        <v-btn flat :to="{name:'about-us', params:{lang: $route.params.lang}}">
          {{ $t('HeaderNavigation.AboutUs')}}
        </v-btn>
        <v-btn flat :to="{name:'rules', params:{lang: $route.params.lang}}">
          {{ $t('HeaderNavigation.Rules')}}
        </v-btn>
        <v-btn flat :to="{name:'faq', params:{lang: $route.params.lang}}">
          {{ $t('HeaderNavigation.Faq')}}
        </v-btn>
      </v-toolbar-items>



      <v-toolbar-items  class="menu-items hidden-sm-and-down" style="padding-top: 0 !important;">
        <languages></languages>
      </v-toolbar-items>
    </template>

    <template v-if="me">
      <v-toolbar-title>
        <v-btn flat :to="{name: 'welcome',params:{lang: $route.params.lang}}" class="gamexarena-green logo-btn">
          <img src="/static/assets/img/logo-reverse.svg" class="welcome-logo gamexarena-green">
        </v-btn>
      </v-toolbar-title>

      <v-toolbar-items class="hidden-sm-and-up">
        <template>
          <div class="text-xs-center pt-3 gamexarena-green" v-if="me">
            <router-link to="/notifications" style="color: #FFFFFF;">
              <v-badge color="blue" overlap>
                <span v-if="unreadCount > 0" slot="badge">{{ unreadCount }}</span>
                <i class="fas fa-bell fa-2x"></i>
              </v-badge>
            </router-link>
          </div>
        </template>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-md-and-down">
        <!--<v-btn :to="'/users/'+ me.uuid" flat>-->
          <!--{{ $t('HeaderNavigation.Profile') }}-->
        <!--</v-btn>-->

        <template v-for="(item, index) in items">
          <v-list-tile v-if="item.click" :key="index" @click="item.click(item.dialog)">
            <v-list-tile-content>
              <v-list-tile-title px-0 pt-2 class="header-profile-menu-items create-challange-color">
                {{ $t(item.title) }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <!--<v-btn :to="{name:'matches', click: this.toggleDialog, dialog: 'createMatchDialog'}" @click="this.items.click(item.dialog)" flat>-->
          <!--{{ $t('HeaderNavigation.CreateChallange') }}-->
        <!--</v-btn>-->
        <v-btn :to="{name:'matches', params:{lang: $route.params.lang}}" flat>
          {{ $t('HeaderNavigation.Matches') }}
        </v-btn>
        <v-btn :to="{name:'tournaments', params:{lang: $route.params.lang}}" flat>
          {{ $t('HeaderNavigation.Tournaments') }}
        </v-btn>
        <!--<v-btn flat :to="{name:'leaders-table', params:{lang: $route.params.lang}}">-->
          <!--{{ $t('HeaderNavigation.LeadersTable')}}-->
        <!--</v-btn>-->
      </v-toolbar-items>

      <v-toolbar-items>
        <create-match matchType="custom"></create-match>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-md-and-down">
        <app-dropdown class="gamexarena-green"></app-dropdown>

        <v-btn flat :to="'/users/'+ me.uuid"><i class="far fa-user fa-2x"></i></v-btn>

        <app-notification></app-notification>

        <v-btn flat :to="{name: 'add-money'}">
          <i class="fas fa-plus fa-1x mr-2"></i>
          {{ $n(me.account.balance, 'currency') }}
        </v-btn>
      </v-toolbar-items>
    </template>
  </v-toolbar>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AppDropdown from './AppDropdown'
  import AppNotification from './AppNotification'
  import CreateMatch from '../matches/CreateMatch'
  import Languages from '../home/Languages'
  import {Slide} from 'vue-burger-menu'

  export default {
    components: {
      AppDropdown,
      AppNotification,
      CreateMatch,
      Languages,
      Slide
    },
    data() {
      return {
        items: [
          {title: 'MeNavigations.CreateMatch', click: this.toggleDialog, dialog: 'createMatchDialog', icon: 'fas fa-gamepad'},
        ]
      }
    },
    methods: {
      ...mapActions(['toggleDialog', 'Auth/logout']),
      ...mapActions([
        'toggleDialog',
        'Users/fetchNotifications',
        'Users/notifications',
        'Users/readNotification',
      ]),
      clickNotification(notification) {
        if (!notification.is_read) {
          this['Users/readNotification'](notification).then(() => {
            this.$router.push(notification.href)
            if(this.$router.currentRoute.name === 'matches'){
              this.$router.go(notification.href)
            }else{
              this.$router.push(notification.href)
            }

          })
        } else if (notification.href) {
          this.$router.push(notification.href)
          if(this.$router.currentRoute.name === 'matches'){
            this.$router.go(notification.href)
          }else{
            this.$router.push(notification.href)
          }
        }
      },
    },
    computed: {
      ...mapGetters('Auth', [
        'me',
      ]),
      ...mapGetters('Users', [
        'notifications',
        'changes'
      ]),
      unreadCount() {
        return (this.notifications.filter(n => !n.is_read)).length
      },
    },
  }
</script>

<style scoped>
  .logo-btn::before{
    background-color: transparent !important;
  }

  .create-challange-color{
    color: #ffffff !important;
    line-height: 55px !important;
    height: 39px;
    font-weight: normal;
    font-size: 15px;
  }

  .v-btn--active:before, .v-btn:focus:before, .v-btn:hover:before{
    background-color: transparent !important;
  }
</style>
