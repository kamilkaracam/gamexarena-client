<template>
  <div class="pa-3">
    <v-flex md12 mb-3  v-for="(item, index) in items"
            :key="index" class="white-color">
      <router-link :to="item.link" class="header-profile-menu-items">
        <i :class="item.icon" class="header-profile-menu-icons"></i>
         {{$t(item.title)}}
      </router-link>
    </v-flex>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {title: 'ProfileNavigation.GameSettings', link: '/me/game-settings'},
          {title: 'ProfileNavigation.TransactionHistory', link: '/me/transaction-history'},
          {title: 'ProfileNavigation.GamerTags', link: '/me/gamer-tags'},
          {title: 'ProfileNavigation.ChangePassword', link: '/me/change-password'},
          {title: 'ProfileNavigation.PersonalDetails', link: '/me/personal-details'}
        ]
      }
    }
  }
</script>

<style scoped>
  .header-profile-menu-items{
    color: #ffffff !important;
  }
</style>
