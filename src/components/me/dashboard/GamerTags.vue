<template>
  <div>
    <v-container fluid>
      <h1 class="mb-3">{{ $t('ProfileNavigation.GamerTags') }}</h1>
      <gamer-tag></gamer-tag>
    </v-container>
  </div>
</template>

<script>
  import MenuItems from './MenuItems'
  import GamerTag from '../../auth/GamerTag'
  import {mapState} from 'vuex'

  export default {
    name: "GamerTags",
    components: {
      MenuItems,
      GamerTag
    }
  }
</script>
