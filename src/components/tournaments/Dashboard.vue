<template>
  <v-layout align-center justify-space-around row wrap>
    <v-flex v-if="tournaments" v-for="tournament in tournaments" :key="tournament.uuid" md3 mb-5>
      <template>
        <v-layout>
          <v-flex xs12 sm12 pa-5>
            <v-card>
              <v-img :aspect-ratio="0.9" :src="fakeGamePictures[tournament.game.slug]">
                <v-layout px-3 pb-1 column fill-height class="lightbox white--text">
                  <v-spacer></v-spacer>
                  <v-flex shrink>
                    <div class="subheading">{{ tournament.title }}</div>
                  </v-flex>
                </v-layout>
              </v-img>

              <v-card-title primary-title>
                <div>
                  <h3>{{ tournament.platform.name }}
                    <span v-if="tournament.title === 'Fortnite'">/ PC / Playstation 4</span>
                  </h3>
                  <h3 class="headline mb-0">
                    {{ $t('Tournaments.Prize') }}: {{ $n(tournament.total_prize, 'currency') }}
                  </h3>
                  <div v-if="false">{{ $d(new Date(tournament.started_at), 'middle') }}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <router-link
                  :to="{name: 'tournaments.show', params: {lang: $route.params.lang, slug: tournament.uuid}}"
                  class="v-btn v-btn--block v-btn__content orange">
                  {{ $t('Tournaments.Info') }}
                </router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Dashboard",
    data() {
      return {
        serviceIsReady: true,
        tournaments: null,
        fakeGamePictures: {
          fortnite: '/static/assets/img/tournaments/fortnite.jpg',
          pubg: '/static/assets/img/tournaments/pubg.jpg',
          'fifa-20': '/static/assets/img/tournaments/fifa.jpg',
          'cod-black-ops': '/static/assets/img/tournaments/callofduty.jpg',
        }
      }
    },
    methods: {
      ...mapActions([
        'Tournaments/fetchTournaments',
      ])
    },
    mounted() {
      this['Tournaments/fetchTournaments']({includes: ['platform', 'game', 'gameType']})
        .then(resp => this.tournaments = resp.data.data)
    }
  }
</script>
