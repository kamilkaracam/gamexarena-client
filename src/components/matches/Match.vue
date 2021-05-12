<template>
  <v-container v-if="match && home">
    <v-layout row wrap>
      <v-flex md8 xs12 pa-3>
        <!-- Match cancel -->
        <v-card v-if="toggleCancelSection" hover class="mb-4">
          <v-card-title class="headline">
            {{$t('Match.OpenMatch')}}
          </v-card-title>

          <v-card-text>
            {{$t('Match.YouMayCancel')}}
          </v-card-text>

          <v-card-actions class="pa-3">
            <v-btn @click="cancelMatchDialog = true" block color="error" outline>{{$t('Match.Cancel')}}</v-btn>
          </v-card-actions>
        </v-card>

        <v-card height="auto">
          <v-card-title class="white--text gamexarena-green">
            <span class="headline text-md-center">{{ match.game.name }}</span>
            <v-spacer></v-spacer>
            <span class="headline text-md-center">{{ $n(calculateMatchPrize(match.wager), 'currency') }}</span>
          </v-card-title>

          <v-card-text>
            <v-layout v-if="toggleJoinSection" row wrap>
              <v-flex md12 class="pa-3">
                <v-btn block color="success" @click="clickJoin(match.uuid)">
                  {{$t('Match.JoinMatchFor')}} {{ $n(match.wager, 'currency') }}
                </v-btn>
              </v-flex>
            </v-layout>

            <!--REMATCH-->
            <v-layout v-if="match.finished_at && (approvedScore  && approvedScore.length === 2)" row wrap>
              <v-flex md12 class="pa-3">
                <v-card color="white" hover class="white--text">
                  <v-card-title>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <h3>Match Completed</h3>
                      </v-flex>
                    </v-layout>
                  </v-card-title>

                  <v-card-text>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <v-btn block color="info">Rematch for $ 1.00</v-btn>
                        <v-btn block color="info">Rematch for $ 2.50</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-text>

                  <v-card-actions class="pa-3">

                  </v-card-actions>
                </v-card>

              </v-flex>
            </v-layout>

            <div v-if="toggleStepSection">
              <!--Match Start Steps for Home-->
              <v-layout v-if="toggleHomeStepSection" row wrap>
                <v-flex md12 class="pa-3">
                  <v-stepper v-model="activeStep">
                    <v-stepper-header>
                      <template v-for="(step, i) in steps.home">
                        <v-stepper-step :step="step.step" :complete="step.completed()" :key="i">
                          {{$t('Match.Step')}} {{ i + 1 }}
                        </v-stepper-step>

                        <v-divider v-if="i + 1 !== steps.home.length" :key="'divider' + i"></v-divider>
                      </template>
                    </v-stepper-header>

                    <v-stepper-items>
                      <template v-for="(step, i) in steps.home">
                        <v-stepper-content :key="i" :step="step.step">
                          <component :is="step.component" :match="match" :home="home" :away="away"
                                     @complete="nextStep"></component>
                        </v-stepper-content>
                      </template>
                    </v-stepper-items>
                  </v-stepper>
                </v-flex>
              </v-layout>

              <!--Match Start Steps for Away-->
              <v-layout v-if="toggleAwayStepSection" row wrap>
                <v-flex md12 class="pa-3">
                  <v-stepper v-model="activeStep">
                    <v-stepper-header>
                      <template v-for="(step, i) in steps.away">
                        <v-stepper-step :step="step.step" :complete="step.completed()" :key="i">
                          Step {{ i + 1 }}
                        </v-stepper-step>

                        <v-divider v-if="i + 1 !== steps.away.length" :key="'divider' + i"></v-divider>
                      </template>
                    </v-stepper-header>

                    <v-stepper-items>
                      <template v-for="(step, i) in steps.away">
                        <v-stepper-content :key="i" :step="step.step">
                          <component :is="step.component" :match="match" :home="home" :away="away"
                                     @complete="nextStep"></component>
                        </v-stepper-content>
                      </template>
                    </v-stepper-items>
                  </v-stepper>
                </v-flex>
              </v-layout>



              <!--İNVİTE PENDİNG -->
              <v-layout v-if="false" row wrap>
                <v-flex md12 class="pa-3">
                  <v-card color="white" hover class="white--text">
                    <v-card-title>
                      <v-layout row justify-space-between>
                        <v-flex md12>
                          <h3>Invite Pending</h3>
                        </v-flex>
                      </v-layout>
                    </v-card-title>

                    <v-card-text>
                      <v-layout row justify-space-between>
                        <v-flex md12>
                          <p class="mb-2 md8">This match is waiting an answer to the invitation sent to JUGGERR</p>
                        </v-flex>
                      </v-layout>
                    </v-card-text>

                    <v-card-actions class="pa-3">
                      <v-btn block color="primary" outline>Cancel Match</v-btn>
                    </v-card-actions>
                  </v-card>

                </v-flex>
              </v-layout>

              <!-- ADVANTAGES -->
              <v-layout v-if="false" row wrap>
                <v-flex md12 class="pa-3">
                  <v-card color="white" hover class="white--text">
                    <v-card-title>
                      <v-layout row justify-space-between>
                        <v-flex md12>
                          <h3>Advantages</h3>
                        </v-flex>
                      </v-layout>
                    </v-card-title>

                    <v-card-text>
                      <v-layout row justify-space-between>
                        <v-flex md12>
                          <p class="mb-2">JUGGERR is giving kaqmil 3 goals</p>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </div>

            <v-layout v-if="isDispute" row wrap>
              <v-flex md12 class="pa-3">
                <dispute :match="match"></dispute>
              </v-flex>
            </v-layout>

            <!-- MATCH GAME -->
            <v-layout row wrap>
              <v-flex md12 class="pa-3">
                <v-card color="white" hover class="white--text">
                  <v-card-title>
                    <v-layout row justify-space-between>
                      <v-flex md6>
                        <h3>{{ match.game.name }}</h3>
                      </v-flex>

                      <v-flex md6 text-md-right>
                        <h3>{{ $n(calculateMatchPrize(match.wager), 'currency') }}</h3>
                        <p>{{ $t('Match.Prize') }}</p>
                      </v-flex>
                    </v-layout>
                  </v-card-title>

                  <v-card-text>
                    <v-layout v-if="home" row wrap py-3>
                      <v-flex md1 text-xs-center>
                        <v-list-tile-avatar>
                          <user-avatar :user="home"></user-avatar>
                        </v-list-tile-avatar>
                      </v-flex>

                      <v-flex md10>
                        <v-layout column>
                          <v-flex>{{ home.username }}</v-flex>
                          <v-flex>{{ gamerTagForMatch(home) }}</v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex md1 v-if="approvedScore">
                        <h1>{{approvedScore.home}}</h1>
                      </v-flex>
                    </v-layout>

                    <v-divider></v-divider>

                    <v-layout v-if="away && match.away && match.away.is_approved" row wrap py-3>
                      <v-flex md1 text-md-center>
                        <v-list-tile-avatar>
                          <user-avatar :user="away"></user-avatar>
                        </v-list-tile-avatar>
                      </v-flex>
                      <v-flex md10>
                        <v-layout column>
                          <v-flex>{{ away.username }}</v-flex>
                          <v-flex>{{ gamerTagForMatch(away) }}</v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex md1 v-if="approvedScore">
                        <h1>{{approvedScore.away}}</h1>
                      </v-flex>
                    </v-layout>

                    <v-layout row justify-space-between py-3>
                      <v-flex md12 v-if="!match.finished_at && match.started_at">
                        <p class="mb-2">Expiring in
                          <Countdown :end="$d(new Date(expiringTime(match.created_at)), 'countdown')"></Countdown>
                        </p>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>

            <!-- MATCH DETAİLS -->
            <v-layout row wrap>
              <v-flex md12 class="pa-3">
                <v-card color="white" hover class="white--text">
                  <v-card-title>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <h3>{{$t('Match.MatchDetails')}}</h3>
                      </v-flex>
                    </v-layout>
                  </v-card-title>

                  <v-card-text>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <p class="mb-2">{{$t('Match.EntryFee')}}: <span class="font-weight-bold"><br>{{ $n(match.wager, 'currency') }}</span>
                        </p>
                        <dl>
                          <template v-for="option in match.options">
                            <dt :key="option.id" class="font-weight-bold">
                              {{ $t('Services.Tournaments["' + option.rule.name + '"]') }}:
                            </dt>
                            <dd :key="option.slug" class="mb-1">{{ option.text }}</dd>
                          </template>
                        </dl>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>

            <!-- GAME RULES -->
            <v-layout row wrap>
              <v-flex md12 class="pa-3">
                <v-card color="white" hover class="white--text">
                  <v-card-title>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <h3>{{ $t('Match.gameRules.title') }}</h3>
                      </v-flex>
                    </v-layout>
                  </v-card-title>

                  <v-card-text>
                    <v-layout row justify-space-between>
                      <v-flex md12>
                        <div v-for="(item, i) in $t(howToPlayList)" :key="i" v-html="item"></div>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md4 xs12 pa-3>
        <section>
          <v-toolbar class="gamexarena-green" dark>
            <v-toolbar-title>{{ match.game.name + ' Chat' }}</v-toolbar-title>
          </v-toolbar>

          <chat :messages="messages" :channel="{state: 'chat', channel: 'chat:matches:' + match.uuid}"></chat>
        </section>
      </v-flex>
    </v-layout>

    <template>
      <cancel-match-dialog :visibility="cancelMatchDialog" :match="match"
                           @close="cancelMatchDialog = false"></cancel-match-dialog>
    </template>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import Countdown from 'vuejs-countdown'
  import Chat from '../helpers/Chat'
  import UserAvatar from '../helpers/UserAvatar'
  import CancelMatchDialog from './match/_CancelMatchDialog';
  import StepAcceptance from './match/StepAcceptance';
  import StepWaitingAcceptance from './match/StepWaitingAcceptance';
  import StepAddedOpponent from './match/StepAddedOpponent';
  import StepJoinedOpponent from './match/StepJoinedOpponent';
  import StepScoreOrProblem from './match/StepScoreOrProblem';
  import StepSubmitScore from './match/StepSubmitScore';
  import Dispute from './match/Dispute'
  import axios from 'axios'

  export default {
    name: "Match",
    components: {
      Chat,
      UserAvatar,
      Countdown,
      CancelMatchDialog,
      StepAcceptance,
      StepWaitingAcceptance,
      StepAddedOpponent,
      StepJoinedOpponent,
      StepScoreOrProblem,
      StepSubmitScore,
      Dispute,
    },
    data() {
      return {
        match: null,
        home: null,
        away: null,
        disputeCounter: null,
        cancelMatchDialog: false,
        stepStatus: {
          home: {
            step3: false,
            step4: false,
            step5: false,
          },
          away: {
            step3: false,
            step4: false,
            step5: false
          }
        },
        messages: [],
        isDispute: false,
        isDraw: false,
        approvedScore: null,
      }
    },
    computed: {
      ...mapGetters(['channels']),
      ...mapGetters('Auth', [
        'me',
      ]),
      ...mapGetters('Matches', [
        'addedOpponentStatus',
        'joinedOpponentStatus',
      ]),

      whoAmI() {
        if (this.me === null) {
          return 'other'
        }

        switch (this.me.uuid) {
          case (this.match.home ? this.match.home.uuid : ''):
            return 'home';
          case (this.match.away ? this.match.away.uuid : ''):
            return 'away';
          default:
            return 'other';
        }
      },
      activeStep: {
        get() {
          let who = this.whoAmI;
          if (who === 'other') {
            return false;
          }

          let firstIncomplete = this.steps[who].find(n => !n.completed());

          return firstIncomplete ? firstIncomplete.step : false;
        },
        set() {
        }
      },
      steps() {
        return {
          home: [
            {step: 1, component: 'step-acceptance', completed: () => this.match.away && this.match.away.is_approved},
            {
              step: 2,
              component: 'step-added-opponent',
              completed: () => !!(this.addedOpponentStatus.home || this.match.started_at)
            },
            {
              step: 3,
              component: 'step-joined-opponent',
              completed: () => !!(this.stepStatus.home.step3 || this.match.started_at)
            },
            {
              step: 4,
              component: 'step-score-or-problem',
              completed: () => this.stepStatus.home.step4 || this.match.finished_at
            },
            {
              step: 5,
              component: 'step-submit-score',
              completed: () => this.stepStatus.home.step5 || this.match.finished_at
            },
          ],
          away: [
            {
              step: 1,
              component: 'step-waiting-acceptance',
              completed: () => this.match.away && this.match.away.is_approved
            },
            {
              step: 2,
              component: 'step-added-opponent',
              completed: () => !!(this.addedOpponentStatus.away || this.match.started_at)
            },
            {
              step: 3,
              component: 'step-joined-opponent',
              completed: () => !!(this.stepStatus.away.step3 || this.match.started_at)
            },
            {
              step: 4,
              component: 'step-score-or-problem',
              completed: () => this.stepStatus.away.step4 || this.match.finished_at
            },
            {
              step: 5,
              component: 'step-submit-score',
              completed: () => this.stepStatus.away.step5 || this.match.finished_at
            },
          ],
        }
      },
      howToPlayList() {
        return `Match.gameRules.${this.match.game.slug}.list1`
      },
      toggleCancelSection() {
        return this.whoAmI === 'home' && !this.away;
      },
      toggleJoinSection() {
        return !this.match.finished_at && !this.match.started_at && !this.away && this.whoAmI !== 'home' && this.me;
      },
      toggleStepSection() {
        //console.log(!!(!this.match.finished_at && this.me && this.away));
        //console.log(this.match.finished_at, this.me, this.away);
        return !this.match.finished_at && this.me && this.away;
      },
      toggleHomeStepSection() {
        return this.whoAmI === 'home';
      },
      toggleAwayStepSection() {
        return this.whoAmI === 'away';
      },
    },
    methods: {
      ...mapActions([
        'setSnackbar',
        'subscribeChannel',
        'Auth/fetchMe',
        'Matches/fetchMatch',
        'Matches/fetchChatMessages',
        'Matches/subscribeMatch',
        'subscribeNotification',
        'Matches/joinMatch',
        'Matches/leaveMatch',
        'Matches/startMatch',
        'Matches/setPlayingMatch',
        'Users/fetchUser',
      ]),
      nextStep(...args) {
        let who = this.whoAmI;

        this.stepStatus[who]['step' + args[0]] = true;
        if(args[0] === 1){
          this.expiringTime();
        }
      },
      onFetchMatch(resp) {
        this.match = resp.data;

        this['Matches/subscribeMatch']({uuid: this.match.uuid}).then(() => {
          this.channels.match.on('join', this.onJoinOpponent);
          this.channels.match.on('leave', this.onLeaveOpponent);
          this.channels.match.on('finished', this.onFinished);

          if (['home', 'away'].includes(this.whoAmI)) {
            this.listenOpponentChannels();
          }
        });

        this['subscribeNotification']

        this.fetchOpponent(this.match.home.uuid).then(resp => this.home = resp.data);

        if (resp.data.away) {
          this.fetchOpponent(this.match.away.uuid).then(resp => this.away = resp.data);
        }

        this['Matches/fetchChatMessages']({uuid: this.match.uuid}).then(resp => this.messages = resp.data.data);



        if (this.match.scores.length) {

          this.isDispute = !this.match.scores.find(n => n.is_approved);



          if(this.match.scores.length && (this.match.scores[0].is_approved === false && this.match.scores[1].is_approved === false)){
            this.isDispute = true;
          }

          if(this.match.disputes.length > 0){
            const filterMatchDispute = this.match.disputes.filter(item => item.user_id === this.me.id);
            this.isDispute = (filterMatchDispute.length === 0) ? true : false;
          }

          if(this.isDispute !== true){
            this.approvedScore = this.match.scores.find(n => n.is_approved);

            if(this.approvedScore){
              this.stepStatus[this.whoAmI].step3 = true;
              this.updateMe();
            }

          }else{
            this.approvedScore = [];
          }
          //ToDo: Kişinin maç skoru girip girmediğini kontrol et, girmiş ise skor ekranını gösterme

        }



        if (this.match.started_at) {
          this['Matches/setPlayingMatch'](this.match)
        }


      },
      listenOpponentChannels() {
        this.channels.match.on('acceptedAway', this.onAcceptedAway);
        this.channels.match.on('rejectedAway', this.onRejectedAway);
        this.channels.match.on('addedOpponent', this.onAddedOpponent);
        this.channels.match.on('startedMatch', this.onStartedMatch);
        this.channels.match.on('joinedOpponent', this.onJoinedOpponent);
        this.channels.match.on('joined', this.onJoinedOpponent);
        this.channels.match.on('disputed', this.onDisputed);
        this.channels.match.on('drawed', this.onDrawed);
      },
      fetchOpponent(uuid) {
        return this['Users/fetchUser']({
          uuid: uuid,
          includes: ['usernames']
        });
      },
      clickJoin(uuid) {
        this['Matches/joinMatch']({uuid})
          .then((res) =>{
            this.$router.go(this.$router.currentRoute)
          })
          .catch(err => alert(err.response.data.message));

      },
      onJoinOpponent(data) {
        this['Matches/fetchMatch']({
          uuid: this.$route.params.uuid,
          includes: ['away']
        }).then(resp => this.match.away = resp.data.away);

        this.fetchOpponent(data.away).then(resp => this.away = resp.data);
        this.listenOpponentChannels();
        this.updateMe();
      },
      onLeaveOpponent() {
        this.updateMe();

        this.match.away = this.away = null;
      },
      onAcceptedAway() {
        this.match.away.is_approved = true;
      },
      onRejectedAway() {
        this.updateMe();

        this.match.away = null;
        this.away = null;
      },
      onAddedOpponent(data) {
        this.setSnackbar({status: true, type: 'info', messages: [this.$t('Notifications.AddedOpponent')]});
      },
      onJoinedOpponent(data) {
        this.setSnackbar({status: true, type: 'info', messages: [this.$t('Notifications.JoinedOpponent')]});
      },
      onStartedMatch(data) {
        this.nextStep(3);
        this.match.started_at = new Date();
        this['Matches/setPlayingMatch'](this.match);
      },
      onDisputed() {
        this.isDispute = 1
      },
      onDrawed(){
        this.isDispute = 0
        this.isDraw = 1
        this.stepStatus[this.whoAmI].step4 = true;
        this.updateMe();
      },
      onFinished() {
        this.stepStatus[this.whoAmI].step5 = true;
        this.updateMe();
      },
      updateMe() {
        if (this.me) {
          this['Auth/fetchMe']();
        }
      },
      gamerTagForMatch(user) {
        if (!user.usernames.length) {
          return ''
        }
        return user.usernames.find(n => n.platform.id === this.match.platform.id).username
      },
      expiringTime(datetime) {
        let expireTime = new Date(datetime)
        if(this.match.started_at){
          expireTime = new Date(this.match.started_at)
          expireTime.setHours(expireTime.getHours() + 1);
        }else{
          expireTime.setHours(expireTime.getHours() + 3)
        }
        return expireTime;
      },
    },
    created() {
      this['Matches/fetchMatch']({
        uuid: this.$route.params.uuid,
        includes: ['type', 'options.rule', 'home', 'away', 'scores']
      }).then((resp)=>{
        this.onFetchMatch(resp)
      });
    }
  }
</script>
