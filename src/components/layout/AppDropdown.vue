<template>
  <v-menu>
    <v-btn slot="activator" flat dark class="text-xs-right">
      <span class="px-3">{{ me.username }}</span> <i class="fas fa-chevron-down mr-1"></i>
    </v-btn>

    <v-list>
      <v-layout row text-xs-center pa-2>
        <v-flex md6>
          <div>{{ $n(me.account.balance, 'currency') }}</div>
          <v-btn :to="{name: 'add-money'}" color="success">{{ $t('MeNavigations.AddMoney') }}</v-btn>
        </v-flex>

        <v-flex md6>
          <div>{{ $n(me.account.bonus_balance, 'currency') }}</div>
          <v-btn :to="{name: 'withdraw'}" color="success">{{ $t('MeNavigations.Withdraw') }}</v-btn>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <template v-for="(item, index) in items">
        <v-list-tile v-if="item.href" :key="index" :to="item.href">
          <v-list-tile-title px-0 class="header-profile-menu-items">
            <i :class="item.icon" class="header-profile-menu-icons text-md-center mr-2"></i>{{ $t(item.title) }}
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile v-if="item.click" :key="index" @click="item.click(item.dialog)">
          <v-list-tile-content>
            <v-list-tile-title px-0 class="header-profile-menu-items">
              <i :class="item.icon" class="header-profile-menu-icons text-md-center mr-2"></i>{{ $t(item.title) }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import CreateMatch from '../matches/CreateMatch'

  export default {
    components: {
      CreateMatch,
    },
    data() {
      return {
        items: [
          // {title: 'Direct Challange', link: '/direct-challange', icon: 'fas fa-handshake'},
          {title: 'MeNavigations.CreateChallenge', click: this.toggleDialog, dialog: 'createMatchDialog', icon: 'fas fa-gamepad'},
          {title: 'MeNavigations.TransactionHistory', href: {name: 'me.transaction-history'}, icon: 'fas fa-credit-card'},
          {title: 'MeNavigations.Rules', href: {name: 'rules', params: {lang: this.$route.params.lang}}, icon: 'fas fa-exclamation'},
          {title: 'MeNavigations.FAQ', href: {name: 'faq', params: {lang: this.$route.params.lang}}, icon: 'fas fa-question'},
          {title: 'MeNavigations.AccountSettings', href: {name: 'me.personal-details'}, icon: 'fas fa-cog'},
          {title: 'MeNavigations.Logout', click: this['Auth/logout'], dialog: '', icon: 'fas fa-sign-out-alt'},
        ]
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'me'
      ]),
    },
    methods: {
      ...mapActions(['toggleDialog', 'Auth/logout']),
    }
  }
</script>

<style scoped>
  .v-list__tile__title {
    height: 40px !important;
    line-height: 2.5 !important;
  }
</style>
