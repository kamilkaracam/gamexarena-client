<template>
  <v-layout row wrap>
    <v-radio-group row v-model="crossPlatform">
      <v-flex md12 class="pl-5 mb-3 mobile-none-padding sm-xs-mb-10">
        <h3>Cross-Platform</h3>
      </v-flex>
      <v-flex md4 sm12 xs12 pl-5 pr-5 class="mobile-none-padding sm-xs-mb-10">
        <v-card class="pa-3">
          <v-layout px-3>
            <v-flex md11 sm10 xs10 class="money-select">
              {{ $t('CreateMatch.Crossplay.Console') }}
            </v-flex>

            <v-flex md1 sm2 xs2 class="money-select-input">
              <v-radio :value="this.console" color="green"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex md4 sm12 xs12 pl-5 pr-5 class="mobile-none-padding sm-xs-mb-10">
        <v-card class="pa-3">
          <v-layout px-3>
            <v-flex md11 sm10 xs10 class="money-select">
              {{ $t('CreateMatch.Crossplay.All') }}
            </v-flex>

            <v-flex md1 sm2 xs2 class="money-select-input">
              <v-radio :value="this.all" color="green"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-radio-group>
  </v-layout>
</template>

<script>
  export default {
    name: "CrossPlatform",
    data() {
      return {
        crossPlatform: 0,
        console:'console',
        all:'all'
      }
    },
  }
</script>
