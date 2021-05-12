<template>
 <div>
   <!--<template>-->
     <!--<div class="text-xs-center pt-2 gamexarena-green" v-if="me">-->
         <!--<router-link to="/notifications" style="color: #FFFFFF;">-->
           <!--<v-badge color="blue" overlap>-->
             <!--<span v-if="unreadCount > 0" slot="badge">{{ unreadCount }}</span>-->
             <!--<i class="fas fa-bell fa-2x"></i>-->
           <!--</v-badge>-->
         <!--</router-link>-->
     <!--</div>-->
   <!--</template>-->
   <Slide right>
     <v-layout v-if="me">
       <v-flex md3 sm3 xs3 row wrap>
         <v-avatar color="grey lighten-4">
           <img
             :src="'/api/'+ me.avatar"
             alt="avatar">
         </v-avatar>
       </v-flex>

       <v-flex md9 sm9 xs9 pt-3>
         <h5>{{ me.username }}</h5>
       </v-flex>
     </v-layout>

     <v-layout>
       <v-flex md12 sm12 xs12 column>
         <h5 v-if="me.account">Account Balance: € {{ me.account.balance }}</h5>
       </v-flex>
     </v-layout>

     <v-divider v-if="me" class="pb-0"></v-divider>

     <v-layout v-if="me" column wrap pt-0>
       <template v-for="(item,index) in clickItems" class="mobile-menu-items">
         <v-list-tile v-if="item.click" :key="index + 15" @click="item.click(item.dialog)" style="margin-left:-20px;">
           <v-list-tile-content>
             <v-list-tile-title px-0 pt-2 pa-0 class="mobile-menu-items">
               <i :class="item.icon" class="header-profile-menu-icons"></i>{{ $t(item.title) }}
             </v-list-tile-title>
           </v-list-tile-content>
         </v-list-tile>
       </template>
       <v-flex md12 v-for="(menu, index) in menuItems" :key="index" class="mobile-menu-items mb-3">
         <router-link v-if="menu.href" :to="{name:menu.href, params:{lang: $route.params.lang}}" class="mb-3">
           <i :class="menu.icon" class="header-profile-menu-icons"></i>{{ $t(menu.title) }}
         </router-link>

         <router-link v-if="menu.click" :to="menu.click(menu.dialog)" class="mb-3">
           <span><i :class="menu.icon" class="header-profile-menu-icons"></i>{{ $t(menu.title) }}</span>
         </router-link>
       </v-flex>
     </v-layout>

     <v-divider v-if="me" class="pb-0"></v-divider>

     <v-layout column wrap pt-0>
       <v-flex md12 v-for="(page, index) in pages" :key="index" class="mobile-menu-items">
         <router-link v-if="page.guest" :to="{name:page.href, params:{lang: $route.params.lang}}" class="mb-3">
           <i :class="page.icon" class="header-profile-menu-icons"></i>{{ page.title }}
         </router-link>
       </v-flex>
     </v-layout>

     <v-layout row wrap>
       <v-flex md4 v-for="item in items" :key="item.value">
         <a @click="changeLocale(item.value)" class="lang-change">{{ item.text }}</a>
       </v-flex>
     </v-layout>
   </Slide>
 </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AppDropdown from './AppDropdown'
  import AppNotification from './AppNotification'
  import CreateMatch from '../matches/CreateMatch'
  import Languages from '../home/Languages'
  import {Slide} from 'vue-burger-menu'
  import _ from 'lodash'

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
        clickItems: [
          {title: 'MeNavigations.CreateChallenge', click: this.toggleDialog, dialog: 'createMatchDialog', icon: 'fas fa-gamepad'},
        ],
        menuItems: [
          {title: 'MeNavigations.MyProfile', click: this.myProfileLink, dialog: '', icon: 'fas fa-user'},
          {title: 'MeNavigations.MyGames', href: 'me.game-settings', icon: 'fas fa-headset'},
          {title: 'MeNavigations.TransactionHistory', href: 'me.transaction-history', icon: 'fas fa-credit-card'},
          {title: 'MeNavigations.AccountSettings', href: 'me.personal-details', icon: 'fas fa-cog'},
          // {title: 'MeNavigations.AddFunds', href: 'add-money', icon: 'fa fa-plus'},
          {title: 'MeNavigations.Logout', href: 'logout', icon: 'fas fa-sign-out-alt'},
        ],
        pages: [
          {title: 'Matches', href: 'matches', icon: '', guest: true},
          // {title: 'Leaders Table', href: 'matches', icon: '', guest: true},
          {title: 'About Us', href: 'about-us', icon: '', guest: true},
          {title: 'Tournaments', href: 'tournaments', icon: '', guest: true},
          {title: 'Rules', href: 'rules', icon: '', guest: true},
          {title: 'F.A.Q', href: 'faq', icon: '', guest: true},
        ],
        locale: this.$t('iso-code'),
        items: [
          {value: 'en', text: 'English'},
          {value: 'de', text: 'Deutsch'},
          {value: 'tr', text: 'Türkçe'}
        ]
      }
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
    methods: {
      ...mapActions([
        'toggleDialog',
        'Users/fetchNotifications',
        'Users/notifications',
        'Users/readNotification',
      ]),

      changeLocale(value) {
        _.merge(this.$route.params, {lang: value})
        this.$router.push({name: this.$route.meta.name, params: this.$route.params})
      },
      myProfileLink() {
        return {name: 'users', params: {uuid: this.me.uuid}}
      },
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
  }
</script>

<style scoped>
  .v-list__tile{
    padding-left: 0;
    padding: 0 !important;
  }

  .v-list__tile--link{
    margin-left:-20px !important;
  }

  .v-list__tile v-list__tile--link{
    padding-left: 0 !important;
  }

  .v-list__tile--link{
    padding-left: 0 !important;
  }

  .lang-change {
    color: #ffffff;
    font-size: 13px;
  }


  .mobile-menu-items a {
    color: #ffffff !important;
    text-decoration: none;
    font-size: 15px !important;
  }

  .lang-left {
    left: 10px !important;
  }

  .bm-cross {
    height: 30px;
  }

  .change-lang {
    list-style: none;
    padding-left: 0;
    text-align: center;
  }

  .change-lang li {
    font-size: 13px;
    padding-right: 10px;
  }
</style>
