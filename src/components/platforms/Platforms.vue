<template>
  <v-flex column>
    <v-card flat class="console-type">
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <h1>Console</h1>
              <v-checkbox v-for="platform in platforms" :key="platform.id"
                          v-model="selectedPlatforms"
                          :label="platform.name"
                          :value="platform.id"
                          color="green"
                          hide-details
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        selectedPlatforms: []
      }
    },
    methods: {
      ...mapActions('Platforms', [
        'fetchPlatforms',
        'selectPlatforms',
      ])
    },
    computed: {
      ...mapState({
        platforms: state => state.Platforms.platforms
      })
    },
    created() {
      this.fetchPlatforms({includes: ['games']});
    },
    watch: {
      selectedPlatforms(val) {
        this.selectPlatforms(val)
      }
    }
  }
</script>

<style scoped>
  .console-type .theme--light.v-label {
    color: #ffffff;
  }
</style>
