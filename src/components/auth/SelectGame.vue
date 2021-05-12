<template>
  <v-container fluid>
    <v-layout>
      <v-flex md12>
        <h1>{{ $t('ProfileNavigation.GameSettings')}}</h1>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex md3 class="console-type">
        <v-layout column>
          <platforms></platforms>
        </v-layout>
      </v-flex>

      <v-flex>
        <v-layout md9 column>
          <games></games>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Platforms from '../platforms/Platforms'
  import Games from '../games/Games'

  export default {
    data() {
      return {}
    },
    components: {
      Platforms,
      Games
    }
  }
</script>
