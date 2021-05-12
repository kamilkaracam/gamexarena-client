<template>
  <v-layout row wrap pa-3 align-center justify-center v-if="!hasScore">
    <v-flex md2 text-md-center>
      <user-avatar :user="home"></user-avatar>
      <p>{{ gamerTagForMatch(home) }}</p>
      <v-text-field v-model="score.home" placeholder="Enter Score" type="number"></v-text-field>
    </v-flex>

    <v-flex md1></v-flex>

    <v-flex md2 text-md-center>
      <user-avatar :user="away"></user-avatar>
      <p>{{ gamerTagForMatch(away) }}</p>
      <v-text-field v-model="score.away" placeholder="Enter Score" type="number"></v-text-field>
    </v-flex>

    <v-flex v-if="false" md12 text-md-center>
      <p><span class="font-weight-black">Advantage Reminder:</span> We'll add 3 goals to JUGGERR's score.</p>
    </v-flex>

    <v-flex md12 v-if="scoreTie">
      <v-alert :value="true" type="error">
        There's a withdraw - please ensure that a player has won this match!
      </v-alert>
    </v-flex>

    <v-flex md12>
      <v-btn @click="clickSubmit" block color="success" :disabled="submitDisabled">{{ $t('Match.SubmitScore') }}</v-btn>
      <v-btn v-if="false" block color="error" outline>{{$t('Cancel')}}</v-btn>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-layout>
  <v-layout v-else>
    <h3>Rakibin skor girmesi bekleniyor...</h3>
  </v-layout>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import UserAvatar from '../../helpers/UserAvatar';
  import axios from 'axios';

  export default {
    name: "StepSubmitScore",
    props: {
      match: {required: true, type: Object},
      home: {required: true, type: Object},
      away: {required: true, type: Object},
    },
    components: {
      UserAvatar,
    },
    computed:{
      ...mapGetters('Auth', [
        'me'
      ]),
    },
    data() {
      return {
        submitDisabled: false,
        score: {
          home: null,
          away: null,
        },
        color: 'error',
        mode: '',
        snackbar: false,
        text: null,
        timeout: 6000,
        x: null,
        y: 'top',
        submitCount: 0,
        scoreTie: null,
        hasScore: false
      };
    },
    methods: {
      ...mapActions([
        'setSnackbar',
        'Matches/submitScore',
      ]),
      gamerTagForMatch(user) {
        if (!user.usernames.length) {
          return ''
        }
        return user.usernames.find(n => n.platform.id === this.match.platform.id).username
      },
      clickSubmit() {
        this.scoreTie = null
        if (this.score.home === this.score.away) {
          this.scoreTie = 1
          this.score.home = null
          this.score.away = null
          return
        } else {
          this['Matches/submitScore']({uuid: this.match.uuid, params: this.score})
            .then(() => this.submitDisabled = true)
            .catch(err => {
              this.setSnackbar({status: true, type: 'error', messages: [err.response.data.message]});
            });
        }

        // if (this.score.home === this.score.away) {
        //   this.setSnackbar({status: true, type: 'error', messages: 'Lütfen tekrar maç yapın.'});
        //   this.submitCount = 1
        //   return
        // } else if (this.submitCount === 1 && this.score.home === this.score.away) {
        //   this.setSnackbar({status: true, type: 'error', messages: 'ikinci beraberlik'});
        // } else {
        //   this['Matches/submitScore']({uuid: this.match.uuid, params: this.score})
        //     .then(() => this.submitDisabled = true)
        //     .catch(err => {
        //       this.setSnackbar({status: true, type: 'error', messages: [err.response.data.message]});
        //     });
        // }

        // this['Matches/submitScore']({uuid: this.match.uuid, params: this.score})
        //     .then(() => this.submitDisabled = true)
        //     .catch(err => {
        //       this.setSnackbar({status: true, type: 'error', messages: [err.response.data.message]});
        //     });
        // this.$router.go(this.$router.currentRoute)
      },
      checkScoreSubmitted(){
        const userParams = {
          user_uuid : this.me.uuid
        }
        axios.put('/api/matches/'+this.match.uuid+'/checkscore',userParams).then((resp)=>{
          console.log(resp);
          this.hasScore = resp.data.hasscore;
        })
      }
    },
    created(){
      this.checkScoreSubmitted()
    }
  }
</script>
