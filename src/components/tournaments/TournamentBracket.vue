<template>

  <section v-if="matches" id="bracket">
    <v-layout v-if="roundCount" row text-sm-left pa-4>
      <v-flex md2 pr-3 v-for="(round, i) in rounds" :key="i" :class="['round', 'current']">
        <div class="round-details">Round {{ i }}</div>
        <v-layout align-space-around justify-space-around column fill-height class="round-section">
          <div v-for="match in round" :key="match.uuid" class="item mb-5">
            <router-link :to="'/matches/' + match.uuid">
              <v-card class="pl-2 pt-0 pb-0 py-0 mb-1">
                <v-layout row wrap>
                  <v-flex md10>
                    {{ match.home.username || 'Not Match' }}
                  </v-flex>
                  <v-flex v-if="approvedScore(match.scores)" md2 text-xs-center :class="{'red': approvedScore(match.scores).home < approvedScore(match.scores).away, 'green': approvedScore(match.scores).home > approvedScore(match.scores).away}" class="darken-1 white--text text--lighten-1">
                    <span class="score-section">{{ approvedScore(match.scores).home }}</span>
                  </v-flex>
                  <v-flex v-else md2 text-xs-center class="grey darken-5">
                    <span class="score-section"></span>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-card v-if="match.away" class="pl-2 pt-0 pb-0 py-0 mb-1">
                <v-layout>
                  <v-flex md10>
                    {{ match.away.username || 'Not Match'}}
                  </v-flex>
                  <v-flex v-if="approvedScore(match.scores)" md2 text-xs-center :class="{'green': approvedScore(match.scores).home < approvedScore(match.scores).away, 'red': approvedScore(match.scores).home > approvedScore(match.scores).away}" class="darken-1 white--text text--lighten-1">
                    <span class="score-section">{{ approvedScore(match.scores).away}}</span>
                  </v-flex>
                  <v-flex v-else md2 text-xs-center class="grey darken-5">
                    <span class="score-section"></span>
                  </v-flex>
                </v-layout>
              </v-card>
            </router-link>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import _ from 'lodash';

  export default {
    name: "TournamentBracket",
    props: {
      tournament: {required: true, type: Object}
    },
    data() {
      return {
        matches: null,
        roundCount: null,
        rounds: [],
      }
    },
    computed: {
      semifinals() {
        return this.rounds[Object.keys(this.rounds).slice(-2, -1)[0]]
      },
    },
    methods: {
      ...mapActions([
        'Tournaments/fetchMatches',
      ]),
      approvedScore(scores) {

        return (scores) ? scores.find(n => n.is_approved) : '';
        
      }
    },
    created() {
      this['Tournaments/fetchMatches']({uuid: this.tournament.uuid, includes: ['scores','home','away']})
        .then(resp => this.matches = resp.data.data)
        .then(() => {

          

          this.rounds = _.groupBy(this.matches, n => n.round_number);
          
          if(Object.keys(this.rounds).length > 0){
            this.roundCount = Math.log2(this.rounds[1].length) + 1;

            

            for (let i = 1; i <= this.roundCount; i++) {
              let roundMatches = this.matches.filter(n => n.round_number === i);
              if (roundMatches.length) {
                this.rounds[i] = this.matches.filter(n => n.round_number === i);
              } else {
                let matchCount = Object.keys(this.rounds[i - 1]).length;
                this.rounds[i] = Array(matchCount / 2).fill({uuid: null, home: {username: null}, away: {username: null}});
              }
            }
          }
        });
    }
  }
</script>

<style scoped>

  .item a{
    text-decoration: none;
  }

  #bracket {
    overflow: hidden;
    background-color: #e1e1e1;
    background-color: rgba(225, 225, 225, 0.9);
    padding-top: 20px;
    font-size: 12px;
  }

  .split {
    display: block;
    float: left;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    width: 42%;
    flex-direction: row;
  }

  .champion {
    float: left;
    display: block;
    width: 16%;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-self: center;
    align-self: center;
    margin-top: -15px;
    text-align: center;
    padding: 230px 0 \9;
  }

  .champion i {
    color: #a0a6a8;
    font-size: 45px;
    padding: 10px 0;
  }

  .round {
    display: block;
    float: left;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    width: 95%;
    width: 30.8333% \9;
  }

  .split-two {
  }

  .split-one .round {
    margin: 0 2.5% 0 0;
  }

  .split-two .round {
    margin: 0 0 0 2.5%;
  }

  .matchup {
    margin: 0;
    width: 100%;
    padding: 10px 0;
    height: 60px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  .score {
    font-size: 11px;
    text-transform: uppercase;
    float: right;
    color: #2C7399;
    font-weight: bold;
    font-family: 'Roboto Condensed', sans-serif;
    position: absolute;
    right: 5px;
  }

  .team {
    padding: 0 5px;
    margin: 3px 0;
    height: 25px;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
  }

  .round-2 .matchup {
    margin: 0;
    height: 60px;
    padding: 57px 0;
  }

  .round-3 .matchup {
    margin: 0;
    height: 60px;
    padding: 115px 0;
  }

  .round-details {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 13px;
    color: #2C7399;
    text-transform: uppercase;
    text-align: center;
    height: 40px;
  }

  .champion li, .round li {
    background-color: #fff;
    box-shadow: none;
    opacity: 0.45;
  }

  .current li {
    opacity: 1;
  }

  .current li.team {
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    opacity: 1;
  }


  .share .container {
    margin: 0 auto;
    text-align: center;
  }

  .final {
    margin: 4.5em 0;
  }

  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.3);
      transform: scale(1.3);
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0% {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }

    50% {
      -webkit-transform: scale(1.3);
      -ms-transform: scale(1.3);
      transform: scale(1.3);
    }

    100% {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
    }
  }

  .date {
    font-size: 10px;
    letter-spacing: 2px;
    font-family: 'Istok Web', sans-serif;
    color: #3F915F;
  }

  @media screen and (min-width: 981px) and (max-width: 1099px) {
    .container {
      margin: 0 1%;
    }

    .champion {
      width: 14%;
    }

    .split {
      width: 43%;
    }

    .split-one .vote-box {
      margin-left: 138px;
    }
  }

  @media screen and (max-width: 980px) {
    .container {
      -webkit-flex-direction: column;
      -moz-flex-direction: column;
      flex-direction: column;
    }

    .split, .champion {
      width: 90%;
      margin: 35px 5%;
    }

    .champion {
      -webkit-box-ordinal-group: 3;
      -moz-box-ordinal-group: 3;
      -ms-flex-order: 3;
      -webkit-order: 3;
      order: 3;
    }

    .split {
      border-bottom: 1px solid #b6b6b6;
      padding-bottom: 20px;
    }
  }

  @media screen and (max-width: 400px) {

    .split {
      width: 95%;
      margin: 25px 2.5%;
    }

    .round {
      width: 21%;
    }

    .current {
      -webkit-flex-grow: 1;
      -moz-flex-grow: 1;
      flex-grow: 1;
    }

    .round-details {
      font-size: 90%;
    }
  }
</style>
