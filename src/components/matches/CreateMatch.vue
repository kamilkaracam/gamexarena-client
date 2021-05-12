<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card color="#DCDCDC">
        <v-toolbar dark color="#ff000">
          <v-btn icon dark @click="closeDialog()">
            <v-icon>close</v-icon>
          </v-btn>

          <v-toolbar-title>{{ $t('CreateMatch.title') }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <!--<v-btn dark flat @click="dialog = false">{{ $t('buttons.Save') }}</v-btn>-->
          </v-toolbar-items>
        </v-toolbar>

        <v-list three-line subheader>
          <v-stepper v-model="e6" vertical class="custom-game-stepper">
            <v-form v-model="macDalgalari" :ref="formRef" @submit.prevent="submit">
              <template v-for="(step,i) in steps">
                <div :key="i">
                  <v-stepper-step :step="step.step" :complete="e6 > step.step">
                    <h1>{{$t(step.title)}}</h1>
                  </v-stepper-step>

                  <v-stepper-content :step="step.step" class="m-ml-0">
                    <component v-bind:is="step.component" :form-ref="formRef"></component>

                    <v-btn  v-if="step.component !== 'game-rules'" color="primary" @click="fow">
                      {{ $t('buttons.Continue') }}
                    </v-btn>


                  </v-stepper-content>
                </div>
              </template>

              <v-btn type="submit" :loading="loading" :disabled="loading" color="create-custom-match-button" large>
                {{ $t('buttons.Save') }}
              </v-btn>
            </v-form>
          </v-stepper>
        </v-list>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import ChooseConsole from './create-match/ChooseConsole'
  import ChooseGame from './create-match/ChooseGame'
  import SelectOpponent from './create-match/SelectOpponent'
  import YourWager from './create-match/YourWager'
  import GameRules from './create-match/GameRules'

  export default {
    name: 'CreateMatch',
    props: {
      matchType: {type: String, required: true},
      // visible: {type: Boolean}
    },
    components: {
      ChooseConsole,
      ChooseGame,
      SelectOpponent,
      YourWager,
      GameRules,
    },
    data() {
      return {
        e6: 1,
        steps: [],
        formRef: 'createMatch',
        macDalgalari: {},
        loading: false,
        customSteps: [
          {step: 1, title: "CreateMatch.ChooseConsole", component: "choose-console"},
          {step: 2, title: "CreateMatch.ChooseGame", component: "choose-game"},
          {step: 3, title: "CreateMatch.YourWager", component: "your-wager"},
          {step: 4, title: "CreateMatch.GameRules", component: "game-rules"},
        ],
        directSteps: [
          {step: 1, title: "CHOOSE YOUR CONSOLE", component: "choose-console"},
          {step: 2, title: "CHOOSE A GAME", component: "choose-game"},
          {step: 3, title: "SELECT OPPONENT", component: "select-opponent"},
          {step: 4, title: "YOUR WAGER", component: "your-wager"},
          {step: 5, title: "GAME RULES", component: "game-rules"},
        ],
      }
    },
    computed: {
      ...mapState(['forms', 'createMatchDialog']),
      dialog: {
        get() {
          return this.createMatchDialog
        },
        set(value) {
          this.toggleDialog('createMatchDialog')
        }
      }
    },
    methods: {
      ...mapActions([
        'toggleDialog',
        'setFormProp',
        'setSnackbar'
      ]),
      ...mapActions([
        'Matches/store',
        'Matches/fetchMatches'
      ]),
      fow() {
        let stepId = this.e6
        switch (stepId) {
          case 1 :
            if (this.forms[this.formRef].platform_id !== null) {
              this.e6 = 2
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectPlatform')]});
            }
            break;
          case 2:
            if (this.forms[this.formRef].game_id !== null) {
              this.e6 = 3
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectGame')]});
              /*if(this.forms[this.formRef].game_type_id === null && this.forms[this.formRef].game_id !== null){
                this.setSnackbar({status:true, type:'error', messages: ['Oyun tipi seçmeden ilerleyemezsiniz.']});
              }*/
            }
            break;
          case 3:
            if (this.forms[this.formRef].wager !== 0) {
              this.e6 = 4
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectWager')]});
            }
            break;
          case 4:
            break;
          default:
        }
      },
      getSteps() {
        this.steps = (this.matchType === "custom" ? this.customSteps : this.directSteps)
      },
      closeDialog() {
        this.dialog = false
        this.resetForm()
        this.e6 = 1
      },
      resetForm() {
        this.setFormProp({
          root: this.formRef,
          prop: {
            platform_id: null,
            game_id: null,
            game_type_id: null,
            wager: 0,
            options: []
          }
        })
      },
      init() {
        this.e6 = 1
        this.resetForm()
        this.getSteps()
      },
      submit() {
        let stepId = this.e6


        switch (stepId) {
          case 1 :
            if (this.forms[this.formRef].platform_id !== null) {
              this.e6 = 2
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectPlatform')]});

              return false
            }
            break;
          case 2:
            if (this.forms[this.formRef].game_id !== null && this.forms[this.formRef].game_type_id !== null) {
              this.e6 = 3
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectGame')]});
              if(this.forms[this.formRef].game_type_id === null && this.forms[this.formRef].game_id !== null){
                this.setSnackbar({status:true, type:'error', messages: ['Oyun tipi seçmeden ilerleyemezsiniz.']});
              }
              return false
            }
            break;
          case 3:
            if (this.forms[this.formRef].wager !== 0) {
              this.e6 = 4
            } else {
              this.setSnackbar({status:true, type:'error', messages: [this.$t('Alert.CreateMatch.SelectWager')]});
              return false
            }
            break;
          case 4:
            break;
          default:
        }


        if(this.forms[this.formRef].platform_id === null || this.forms[this.formRef].game_id === null || this.forms[this.formRef].game_type_id === null || this.forms[this.formRef].wager === 0){
          return false
          this.resetForm()
          this.e6 = 1
        }else{
          this.loading = true
          this['Matches/store'](this.forms[this.formRef]).then(resp => {
            this.loading = false
            this.dialog = false

            this.e6 = 1
            this.resetForm()

            if (this.$router.currentRoute.name === 'matches') {
              this.$router.go(this.$router.currentRoute)

            } else {
              this.$router.push({name: 'matches'})
              this.$router.go(this.$router.currentRoute)
            }


          }).catch(err => {
            switch (err.response.status) {
              case 400:
                let messages = []
                for (let message of err.response.data) {
                  messages.push(this.$t('validations.' + message.validation, {label: this.$t('inputs.' + message.field)}))
                }
                this.setSnackbar({status: true, type: 'error', messages: messages});
                this.resetForm();
                this.e6 = 1;
                break;
              case 402:
                this.setSnackbar({status: true, type: 'error', messages: [err.response.data.message]});
                this.resetForm();
                this.e6 = 1;
                break;
              default:
                this.setSnackbar({status: true, type: 'error', messages: [err.response.data.message]});
                this.resetForm();
                this.e6 = 1;
                break;
            }
            this.loading = false
          })
        }
      }
    },
    created() {
      this.init();
    }
  }
</script>

<style scoped>
  .v-list--three-line .v-list__tile {
    height: 48px !important;
  }

  .theme--light.v-stepper {
    background: #DCDCDC;
  }

  .theme--light.v-stepper .v-stepper__label h1 {
    font-weight: 300 !important;
    cursor: pointer;
  }

  .v-input--selection-controls .v-input__control {
    width: 100% !important;
  }

  .theme--light.v-messages {
    display: none !important;
  }

  .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
    margin-bottom: 0 !important;
  }

  .money-select span {
    font-size: 31px;
  }

  .theme--dark.v-toolbar {
    background-color: #17270f !important;
  }

  .v-list {
    padding: 0;
  }

  .v-stepper, .v-stepper__header {
    box-shadow: none;
  }

  .opponent-profile-pic {
    border-radius: 50%;
  }
</style>
