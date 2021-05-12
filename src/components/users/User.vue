<template>

  <v-container py-0>

   <v-progress-linear :indeterminate="true" v-if="!user" style="margin-top:70px;"></v-progress-linear>

    <v-layout v-if="user" class="user-profile" row wrap>
      <v-flex md3 sm3 sm2>
        <v-card height="100vh" class="gamexarena-green user-gamertags d-inline" style="display: inline !important;">
          <v-img v-if="avatarPath" ref="userAvatar"
            :src="'/api/' + avatarPath"
            height="300px" style="width:100%"
            :key="imgKey"
          >
            <v-layout
              column
              fill-height
            >
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark v-if="me && me.uuid === user.uuid" @click="sendProfileImage" icon class="mr-3" title="Click for change image">
                  <v-icon>edit</v-icon>
                </v-btn>
                <input type="file" name="profileImage" style="display:none;" ref="profileImage" @change="uploadProfileImage" id="profileImage">
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pt-5">
                <div class="display-1 pl-5 pt-5">
                  <v-badge color="green">
                    <v-icon v-if="onlineUser(user.uuid)" slot="badge" dark small></v-icon>
                    <span>{{user.username}}</span>
                  </v-badge>
                </div>
              </v-card-title>
            </v-layout>
          </v-img>

          <v-img v-else :src="'http://api.adorable.io/avatars/' + user.username"
            height="300px"
          >
          <v-layout
              column
              fill-height
            >
              <v-card-title>
                <v-spacer></v-spacer>

                <v-btn dark v-if="me && me.uuid === user.uuid" @click="sendProfileImage" icon class="mr-3" title="Click for change image">
                  <v-icon>edit</v-icon>
                </v-btn>
                <input type="file" name="profileImage" style="display:none;" ref="profileImage" @change="uploadProfileImage" id="profileImage">
              </v-card-title>

              <v-spacer></v-spacer>

              <v-card-title class="white--text pt-5">
                <div class="display-1 pl-5 pt-5">
                  <v-badge color="green">
                    <v-icon v-if="onlineUser(user.uuid)" slot="badge" dark small></v-icon>
                    <span>{{user.username}}</span>
                  </v-badge>
                </div>
              </v-card-title>
            </v-layout>
          </v-img>

          <v-list two-line class="px-5 gamexarena-green" dark>
            <v-list-tile>

              <v-list-tile-content class="text-md-center">
                <v-list-tile-title>Maximum Bet: $500</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>

            <v-divider></v-divider>

            <v-list-tile v-for="user in user.usernames" :key="user.id">
              <v-list-tile-action>
                <i v-if="user.platform.id === 1" class="fab fa-xbox fa-2x"></i>
                <i v-if="user.platform.id === 2" class="fab fa-playstation fa-2x"></i>
                <i v-if="user.platform.id === 3" class="fa fa-desktop fa-2x"></i>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{user.username}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>


            <v-divider></v-divider>

          </v-list>
        </v-card>
      </v-flex>

      <v-flex md9 sm12 xs12>
        <v-layout column wrap>
          <v-flex md-12 text-xs-right>
            <v-btn v-if="me && (me.uuid === user.uuid)" class="mr-0" outline color="green" to="/me/personal-details">{{$t('MeNavigations.EditProfile')}}</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap text-xs-center>
          <v-flex md12>
            <template class="profile-tabs">
              <v-tabs
                centered
                class="gamexarena-green"
                icons-and-text
                dark
              >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab :href="'#tab-'+ games.id" v-for="games in playedGames" :key="games.id" :onclick="tabClick()">
                  {{games.name}}
                </v-tab>

                <v-tab-item
                  v-for="games in playedGames" :key="games.id"
                  :id="'tab-' + games.id"
                >
                  <v-card flat>
                    <v-card-text>
                      <v-layout row wrap class="challenges">
                        <v-flex md4 sm12 xs12>
                          <v-tabs dark>
                            <v-tab v-for="type in challengeTypes" :key="type.id" ripple>
                              {{ type.text }}
                            </v-tab>

                            <v-tab-item v-for="type in challengeTypes" :key="type.id">
                              <v-card flat>
                                <v-card-text class="pa-0">
                                  <component :is="type.template" :matchKey="games.id"></component>
                                </v-card-text>
                              </v-card>
                            </v-tab-item>
                          </v-tabs>
                        </v-flex>

                        <v-flex md8 px-3>

                          <v-progress-linear v-if="match && matchLoading" slot="progress" color="blue" height="2" indeterminate></v-progress-linear>

                          <v-layout v-if="!matchLoading" column class="elevation-1">
                            <v-flex class="gamexarena-green white--text text--lighten-1">
                              <h2>{{ match.game.name }} for {{ $n(match.wager,'currency')}}</h2>
                              <small>Created by @{{ match.home.username}} {{ $d(new Date(match.created_at), 'long') }} </small>
                            </v-flex>

                            <v-divider></v-divider>

                            <v-flex>
                              <v-list two-line subheader>
                                <v-subheader>Result </v-subheader>

                                <v-list-tile>
                                  <v-list-tile-avatar>
                                    <user-avatar :user="match.home"></user-avatar>
                                  </v-list-tile-avatar>

                                  <v-list-tile-content>
                                    <strong>@{{ match.home.username}}</strong>
                                  </v-list-tile-content>

                                  <v-list-tile-action>
                                    {{ match.scores[0].home }}
                                  </v-list-tile-action>
                                </v-list-tile>

                                <v-list-tile :href="'/users/' + match.away.uuid">
                                  <v-list-tile-avatar>
                                    <user-avatar :user="match.away"></user-avatar>
                                  </v-list-tile-avatar>

                                  <v-list-tile-content>
                                    <strong>@{{ match.away.username}}</strong>
                                  </v-list-tile-content>

                                  <v-list-tile-action>
                                    {{ match.scores[0].away }}
                                  </v-list-tile-action>
                                </v-list-tile>
                              </v-list>
                            </v-flex>

                            <v-divider></v-divider>

                            <v-flex pt-3>
                              <h4 class="mb-3">Match Details</h4>

                              <v-layout row wrap>

                                <v-flex md12 text-center my-2 v-for="rule in match.options" :key="rule.id">
                                  {{ rule.rule.name }}: {{ rule.text }}
                                </v-flex>

                              </v-layout>
                            </v-flex>

                            <v-flex v-if="false">
                              <v-card>
                                <h4>Record</h4>

                                <v-layout row>
                                  <v-flex md5>
                                    <p>@{{match.home.username}}</p>
                                    <p>{{ match.scores[0].home }}</p>
                                    <p>Wins</p>
                                  </v-flex>

                                  <v-flex md2>
                                    -- vs --
                                  </v-flex>

                                  <v-flex md5>
                                    <p>@{{ match.away.username}}</p>
                                    <p>{{ match.scores[0].away }}</p>
                                    <p>Wins</p>
                                  </v-flex>
                                </v-layout>
                              </v-card>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </template>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Matches from './Matches'
  import Tournaments from './Tournaments'
  import UserAvatar from '../helpers/UserAvatar'
  import axios from 'axios'

  export default {
    name: "UserProfile",
    components: {
      Matches,
      Tournaments,
      UserAvatar
    },
    data() {
      return {
        challengeTypes: [
          {id: 1, template: 'matches', text: 'Matches'},
          {id: 2, template: 'tournaments', text: 'Tournaments'}
        ],
        user: null,
        userGames: null,
        playedGames:[],
        gamerTags: [],
        imgKey: 5,
        avatarPath: null
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'me'
      ]),
      ...mapGetters('Matches', [
        'match',
        'matchLoading'
      ]),
      ...mapGetters([
        'onlineUsers'
      ]),
    },

    methods: {
      ...mapActions([
        'Users/fetchUser'
      ]),
      onlineUser(uuid) {
        return typeof this.onlineUsers[uuid] !== 'undefined'
      },
      sendProfileImage(){
        this.$refs.profileImage.click()
      },
      tabClick(){

      },
      uploadProfileImage(){
        var self = this
        this.file = this.$refs.profileImage.files[0]
        let formData = new FormData()
        formData.append('avatar',this.file)

        this.avatarPath = axios.post('/api/me/change-avatar', formData)
          .then(function (response) {
            self.avatarPath = response.data.avatar
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    },
    created() {
      this['Users/fetchUser']({
        uuid: this.$route.params.uuid,
        includes: ['platformGames', 'usernames', 'matches']
      }).then(resp => {
        this.user = resp.data
        this.avatarPath = (this.user.avatar) ? this.user.avatar : null
        let gameName = null
        let userGm = {}

        let gamesArr = _.chain(this.user.platformGames).map(function(item) { return item.game.name+'|'+item.game.id }).uniq().value();
        let tmpGameArr = [];
        for(const i in gamesArr){
          let gm = gamesArr[i].split('|');
          this.playedGames.push({
            id:gm[1],
            name:gm[0]
          });
        }

        let firstMatch = this.user.matches.filter(item => item.game.id == this.playedGames[0].id)

      })
    }
  }
</script>

<style scoped>
  .profile-tabs .theme--dark.v-tabs__bar {
    background: #17270f !important;
  }

  .v-tabs__container--icons-and-text {
    background: green;
  }
  .v-tabs__icon,
  .theme--dark.v-icon{
    line-height: 70px !important;
  }

  .hidden-sm-and-down{
    display: block !important;
  }
</style>
