<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1" @click="step = 1">
              <h3>GAME RULES</h3>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2" @click="step = 2">
              <h3>SELECT GAMES</h3>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" @click="step = 3">
              <h3>GAMER TAGS</h3>
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card
                class="mb-5"
              >
                <v-layout row>
                  <v-flex md6>
                    <h1>How It Works?</h1>
                    <ul>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                    </ul>
                  </v-flex>
                  <v-flex md6>
                    <h1>Game Rules</h1>
                    <ul>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                      <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi assumenda ex ipsam
                        possimus quia! Dicta doloremque eligendi magnam quae, rem repellendus similique tempore
                        vel. Aspernatur dolorum ea excepturi quod velit!
                      </li>
                    </ul>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-flex md12 left>
                <!--<v-btn flat right disabled>Back</v-btn>-->
              </v-flex>

              <v-flex md12 right>
                <v-btn
                  class="next-button-membership"
                  @click="step = 2"
                >
                  Next
                </v-btn>
              </v-flex>
            </v-stepper-content>

            <v-stepper-content step="2" height="auto">
              <v-card
                class="mb-5"
              >
                <select-game></select-game>
              </v-card>

              <v-flex md12 left>
                <v-btn
                  flat
                  @click="step = 1"
                  class="back-button-membership">Back</v-btn>
              </v-flex>

              <v-flex md12 right>
                <v-btn
                  class="next-button-membership"
                  @click="step = 3"
                >
                  Next
                </v-btn>
              </v-flex>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-5"
              >
                <gamer-tag></gamer-tag>
              </v-card>

              <v-flex md12 left>
                <v-btn
                  flat
                  @click="step = 2"
                  class="back-button-membership">Back</v-btn>
              </v-flex>

              <v-flex md12 right>
                <v-btn
                  color="finish-button-membership"
                  @click="step = 1"
                >
                  Finish
                </v-btn>
              </v-flex>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import HowItWork from './HowItWork'
  import SelectGame from './SelectGame'
  import GamerTag from './GamerTag'

  export default {
    data() {
      return {
        step: 0,
      }
    },
    components: {
      HowItWork,
      SelectGame,
      GamerTag
    }
  }
</script>

<style scoped>
  .w-second-left p {
    margin-left: 15% !important;
  }

  .v-stepper__header {
    background: #182710;
    color: #FFFFFF;
  }

  .v-stepper__header h3 {
    color: #FFFFFF !important;
  }
</style>
