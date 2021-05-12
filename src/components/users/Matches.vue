<template>
  <v-card>
    <v-list v-if="filteredMatches" three-line dense>
      <template v-for="match in filteredMatches">
        <v-list-tile
          :key="match.uuid"
          avatar
          @click="fetchMatch({uuid:match.uuid, includes: ['home','away','type','options.rule','scores']})"
        >
          <v-list-tile-avatar>
            {{ $n(match.wager,'currency')}}
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="match.game.name">
            </v-list-tile-title>
            <v-list-tile-sub-title v-html="match.platform.name">
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon color="success" v-if="match.winner && match.winner.uuid === user.uuid">W</v-icon>
            <!--Lost durumunda koyulacak-->
            <v-icon color="error" v-else>L</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
    <v-list v-else>
      <h3 class="pt-2">You have not played in any match yet.</h3>
    </v-list>
  </v-card>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Matches",
    data(){
      return {
        filteredMatches: []
      }
    },
    props: {
      matchKey: null,
    },
    computed: {
      ...mapGetters('Users', [
        'user'
      ])
    },
    methods: {
      ...mapActions([
        'Matches/fetchMatch'
      ]),
      fetchMatch(data) {
        this['Matches/fetchMatch'](data).then((res)=>{
          })
      }
    },
    created() {
      if(this.user.matches){
        //this.fetchMatch({uuid: this.user.matches[0].uuid, includes: ['home', 'away', 'type', 'options.rule', 'scores']})
        this.filteredMatches = this.user.matches.filter(item => (item.game.id == this.matchKey && (item.scores[0] && item.scores[0].is_approved && item.scores[1].is_approved )))
      }
    },
    mounted(){
      this.$root.$on('refresh_matches_event', (text) => {
          this.matchKey = text
          if(this.matchKey !== null){
            this.fetchMatch({uuid: this.user.matches[0].uuid, includes: ['home', 'away', 'type', 'options.rule', 'scores']})
            this.filteredMatches = this.user.matches.filter(item => item.game.id == this.matchKey)
          }

        })
    }
  }
</script>
