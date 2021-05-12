<template>
  <v-layout v-if="tournament" row wrap text-md-center text-xs-center>
    <v-flex md8 xs12 pa-3>
      <v-card class="mb-2">
        <v-card-text>
          <h1>{{ tournament.title }}</h1>

          <v-divider></v-divider>
          <v-btn v-if="competitors && me && !isJoined()" block color="success" @click="clickJoin(tournament.uuid)">
            {{ $t('Tournaments.JoinButton') }}
          </v-btn>
          <v-btn v-if="competitors && me && isJoined()" block color="info">{{ $t('Tournaments.TournamentStart') }}  {{ $d(new Date(tournament.started_at), 'justdate') }} {{ $d(new Date(tournament.started_at), 'justhour') }}
          </v-btn>
          <v-btn v-if="competitors && me && isJoined()" block color="warning" @click="clickCancel(tournament.uuid)">Cancel Join</v-btn>
          <!--<p>-->
            <!--{{ $t('Tournaments.TournamentStart') }}-->
          <!--</p>-->
          <p>{{ $d(new Date(tournament.started_at), 'justdate') }}</p>
          <p>{{ $d(new Date(tournament.started_at), 'justhour') }}</p>
          <p></p>
          <p v-if="competitors">
            Tournament size : {{tournament.opponent_number}} <br>
            {{ $t('Tournaments.JoinerCount') }}: {{competitors.length}} </p>
        </v-card-text>
      </v-card>

      <v-card class="mb-2">
        <v-card-text>
          <v-layout>
            <v-flex md12>
              <h3>{{ $t('Tournaments.Prizes.title') }}</h3>

              <v-divider class="mb-2"></v-divider>

              <h1>{{ $n(tournament.total_prize, 'currency') }}</h1>
              <i class="fas fa-trophy fa-4x mb-5" style="color: #ffc107"></i>
            </v-flex>
          </v-layout>

          <v-layout v-if="tournament.prizes" row wrap align-center justify-center>
            <v-flex md2 v-for="(prize) in tournament.prizes" :key="prize.start" v-if="prize.start <= 3">
              <img :src="prizeIcon(prize.start)" style="width: 75px" alt="">
              <h3>{{ $tc('Tournaments.Prizes.prize', prize.start, {prize: $n(prize.prize, 'currency'), type: (prize.is_bonus ? 'bonus': 'cash')}) }}</h3>
            </v-flex>
          </v-layout>

          <v-layout v-if="tournament.prizes.length > 3" row wrap>
            <v-flex md12>
              <img src="/static/assets/img/man.jpg" width="100px" alt="">
              <div v-for="(prize) in tournament.prizes" :key="prize.start" v-if="prize.start >= 4">
                <h4>{{ $t('Tournaments.Prizes.bonusBalance' + (prize.end - prize.start === 1? 1 : 2 ), {start:
                  prize.start, end: prize.end, prize: $n(prize.prize, 'currency')} ) }}</h4>
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>

      <v-card class="mb-2">
        <v-card-text>
          <h3>{{ $t('Tournaments.TournamentDetails.title') }}</h3>

          <v-divider class="mb-2"></v-divider>

          <dl>
            <dt class="font-weight-bold">{{ $t('Tournaments.TournamentDetails.StartTime') }}:</dt>
            <!--<dd class="mb-1">{{ $d(new Date(tournament.started_at), 'long') }}</dd>-->
            <dd class="mb-1">{{ $t('Tournaments.TournamentStart') }}</dd>
            <template v-for="option in tournament.options">
              <dt :key="option.id" class="font-weight-bold">
                {{ $t('Services.Tournaments["' + option.rule.name + '"]') }}:
              </dt>
              <dd :key="option.slug" class="mb-1">{{ option.text }}</dd>
            </template>
          </dl>
        </v-card-text>
      </v-card>

      <!--<v-card class="mb-2 text-xs-left">
        <v-card-text>
          <h3>{{ $t('Tournaments.HowToPlay.title') }}</h3>

          <v-divider class="mb-2"></v-divider>

          <p v-for="(item, i) in $t(howToPlayList)" :key="i">{{ item }}</p>
        </v-card-text>
      </v-card>-->
      <div v-if="tournament.tournamentrules.length === 3">
      <v-card class="mb-2 pa-3 text-xs-left" v-if="locale === 'tr'">
        <span v-html="tournament.tournamentrules[0].rule">

        </span>
      </v-card>

      <v-card class="mb-2 pa-3 text-xs-left" v-if="locale === 'en'">
        <span v-html="tournament.tournamentrules[1].rule">

        </span>
      </v-card>

      <v-card class="mb-2 pa-3 text-xs-left" v-if="locale === 'de'">
        <span v-html="tournament.tournamentrules[2].rule">

        </span>
      </v-card>
      </div>

      <!--<v-card class="mb-2 text-xs-left">-->
        <!--<v-card-text>-->
          <!--<h3>{{ $t('Tournaments.GameRules.title') }}</h3>-->

          <!--<v-divider class="mb-2"></v-divider>-->

          <!--<p v-for="(item, i) in $t(gameRulesForList)" :key="i">{{ item }}</p>-->
        <!--</v-card-text>-->
      <!--</v-card>-->

      <!--<v-card class="mb-2 text-xs-left">-->
        <!--<v-card-text>-->
          <!--<h3>{{ $t('Tournaments.GamexarenaRules.title') }}</h3>-->

          <!--<v-divider class="mb-2"></v-divider>-->

          <!--<p v-for="(item, i) in $t(gamexRulesForList)" :key="i">{{ item }}</p>-->
        <!--</v-card-text>-->
      <!--</v-card>-->

      <v-card class="mb-2" v-if="tournamentStart">
        <v-card-text>
          <tournament-bracket :tournament="tournament"></tournament-bracket>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-flex md4 xs12 pa-3 text-md-left>
      <section>
        <v-toolbar class="gamexarena-green" dark>
          <v-toolbar-title>{{ tournament.game.name + ' Chat' }}</v-toolbar-title>
        </v-toolbar>

        <chat :messages="messages"
              :channel="{state: 'chat', channel: 'chat:tournaments:' + tournament.uuid}"></chat>
      </section>
    </v-flex>

    <alert :visible="snackbar" @close="snackbar=false" color="error">
      {{ $t('Tournaments.CantJoin')}}
    </alert>
  </v-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Chat from '../helpers/Chat';
  import TournamentBracket from './TournamentBracket'
  import Alert from '../helpers/Alert'
import axios from 'axios';

  export default {
    name: "Tournament",
    components: {
      Chat,
      TournamentBracket,
      Alert,
    },
    data() {
      return {
        locale: this.$t('iso-code'),
        snackbar: false,
        tournamentStart: true,
        tournament: null,
        competitors: null,
        matches: null,
        messages: [],
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'me',
      ]),
      howToPlayList() {
        return `Tournaments.HowToPlay.${this.tournament.game.slug}.list1`
      },
      gameRulesForList() {
        return `Tournaments.GameRules.${this.tournament.game.slug}.list1`
      },
      gamexRulesForList() {
        return `Tournaments.GamexarenaRules.${this.tournament.game.slug}.list1`
      },
    },
    methods: {
      ...mapActions([
        'setSnackbar',
        'Tournaments/fetchTournament',
        'Tournaments/fetchCompetitors',
        'Tournaments/fetchChatMessages',
        'Tournaments/joinTournament',
      ]),
      onFetchTournament(resp) {
        this.tournament = resp.data;

        this['Tournaments/fetchCompetitors']({uuid: this.$route.params.slug}).then(resp => this.competitors = resp.data.data);
        this['Tournaments/fetchChatMessages']({uuid: this.$route.params.slug}).then(resp => this.messages = resp.data.data);
      },
      prizeIcon(index) {
        let iconList = {
          1: '/static/assets/img/coins/gold.svg',
          2: '/static/assets/img/coins/silver.svg',
          3: '/static/assets/img/coins/bronz.svg',
          4: '/static/assets/img/man.png'
        }
        return iconList[index <= 3 ? index : 4]
      },
      isJoined() {
        return !!this.competitors.find(n => n.uuid === this.me.uuid)
      },
      clickJoin(uuid) {
        this['Tournaments/joinTournament']({uuid}).then((resp) => {
          this.$router.go(this.$router.currentRoute)
          this['Tournaments/fetchCompetitors']({uuid: this.$route.params.slug})
        }).catch((err) => {
          if (err.response.status === 401) {
            alert('You must logged in for join the tournament')
          } else if (err.response.status === 403) {
            this.snackbar = true
          }
        })
      },
      clickCancel(uuid){
        axios.post('/api/tournaments/'+uuid+'/exit-tournament').then((resp) => {
          this.$router.go(this.$router.currentRoute)
        })
      }
    },
    created() {
      this['Tournaments/fetchTournament']({uuid: this.$route.params.slug, includes: ['platform,game,options.rule']})
        .then(this.onFetchTournament);
    }
  }
</script>
