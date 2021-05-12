<template>
  <v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      color="success"
    >
      {{ text }}
      <v-btn
        color="white"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card flat>
      <v-card-text>
        <v-container fluid v-if="mygames">
          <h1>{{ $t('MeNavigations.MyGames') }}</h1>
          <v-layout row wrap>
          <v-flex md4 px-2 v-for="game in mygames" :key="game.game.id">
            <v-alert :value="true" type="success" :color="game.platform.slug" style="color:#000;">
              {{game.game.name}}
            </v-alert>
          </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid>
          <h1>{{$t('MeNavigations.Games')}}</h1>
          <form @submit.prevent="submit">
            <v-layout row wrap>
              <template>
                <v-flex md4 px-2 pb-0  v-for="platform in platforms" :key="platform.id">
                  <h3>{{platform.name}}</h3>
                </v-flex>
              </template>
              <template v-for="platform in platforms">
                <v-flex md4 pa-2 :key="platform.id" v-if="!selectedPlatforms.length || selectedPlatforms.includes(platform.id)">
                  <v-checkbox v-for="game in platform.games" :class="platform.slug" :key="game.id"
                              v-model="selectedGame"
                              :label="game.name"
                              color="green"
                              :value="platform.id +'|'+ game.id"
                              hide-details
                  >
                  </v-checkbox>
                </v-flex>
              </template>
            </v-layout>
            <v-layout md12>
              <v-btn color="success" @click="submit">{{$t('buttons.Save')}}</v-btn>
            </v-layout>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'

  import Alert from '../helpers/Alert'

  export default {
    components: {
      Alert
    },
    data() {
      return {
        selectedGame: [],
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 6000,
        text: '',
        mygames:null,

      }
    },
    computed: {
      ...mapGetters('Platforms', [
        'platforms',
        'selectedPlatforms'
      ])
    },
    created(){
      this.getMyGames()
    },
    methods: {
      ...mapActions([
        'setSnackbar'
      ]),
      getMyGames(){
        axios.get('/api/me?include=platform_games').then((resp)=>{
          this.mygames = resp.data.platformGames;
        })
      },
      submit() {
        let selectedGames = {games: this.selectedGame};
        axios.post('/api/me/platform-games', selectedGames).then(resp => {
          this.snackbar = true
          this.text = resp.data.message
          this.getMyGames()
        })
      }
    }
  }
</script>

<style scoped>
  .console-type .theme--light.v-label {
    color: #ffffff;
  }
</style>
