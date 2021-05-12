<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md8 xs12 pa-3>
        <v-card height="auto">
          <v-card-title class="white--text gamexarena-green">
            <span class="headline text-md-center">{{$t('Match.OpenMatches')}}</span>
          </v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex md3 px-3>
                <v-select
                  :items="localPlatforms"
                  v-model="selectedPlatform"
                  item-text="name"
                  item-value="id"
                  label="Platforms"
                ></v-select>
              </v-flex>
              <v-flex md3 px-3>
                <v-select
                  v-if="games"
                  :items="games"
                  item-text="name"
                  item-value="id"
                  v-model="selectedGame"
                  label="Games"
                ></v-select>
              </v-flex>
              <v-flex md6 pb-3>
                <v-alert
                  :value="true"
                  color="warning"
                  type="warning"
                >
                  {{ $t('Match.YourMatch') }}
                </v-alert>
              </v-flex>
            </v-layout>
            
            <v-layout row wrap v-if="userForGamerTags">
              
              <v-flex md4 sm6 class="pa-3" v-for="match in matches" v-if="(selectedPlatform === null || match.platform.id === selectedPlatform) && (selectedGame=== null || match.game.id === selectedGame)"  :key="match.uuid">
                <v-card style="max-height: 250px;min-height: 250px" hover class="white--text" :class="[{'warning': me && match.home.username === me.username}, 'white']">
                  <v-card-title>
                    <v-layout row justify-space-between>
                      <v-flex md8>
                        <h3 class="mb-2 md8">{{match.game.name}} </h3>
                      </v-flex>
                      <v-flex md4 text-xs-right>
                        {{match.platform.name}}
                      </v-flex>
                    </v-layout>
                  </v-card-title>

                  <v-card-text style="min-height: 100px">
                    <v-layout row wrap>
                      <v-flex md4 sm2>
                        <v-list-tile-avatar>
                          <user-avatar :user="match.home"></user-avatar>
                        </v-list-tile-avatar>
                      </v-flex>
                      <v-flex md8 sm10>
                        <v-layout column>
                          <v-flex>
                            @{{match.home.username}}
                          </v-flex>
                          <v-flex>
                            <h6 class="green--text">
                              <!--{{ $d(new Date(match.created_at), 'long') }}-->
                              {{ match.created_at | moment("MM/DD/YYYY h:mm:ss") }} (CET)
                            </h6>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card-text>

                  <v-divider light></v-divider>

                  <v-card-actions class="pa-3" v-if="userForGamerTags">
                    <v-layout row wrap v-if="userForGamerTags.length > 2">
                      <v-flex md8 sm12 xs12>
                        <v-btn v-if="match.started_at && match.home.username !== me.username && match.away.username !== me.username" class="warning">{{$t('Match.NowPlaying')}}</v-btn>
                        <v-btn v-else :to="{name: 'match', params: {uuid: match.uuid}}" class="success">Join <span class="pl-2">{{match.currency.symbol}} {{match.wager}}</span></v-btn>
                      </v-flex>
                      <v-flex md4 sm12 xs12 text-md-center>
                        <i class="fas fa-award fa-2x"></i> {{match.currency.symbol}} {{(match.wager * 2 ) - ((match.wager*2 / 100) * 10)}}
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap v-else-if="!me">
                      <v-flex md12 sm12 xs12>
                        <v-btn class="success" to="/login">{{$t('Match.Join')}}</v-btn>
                      </v-flex>

                    </v-layout>
                    <v-layout row wrap v-else>
                      <v-flex md12 sm12 xs12>
                        <v-btn class="warning" to="/me/gamer-tags">{{$t('Match.GamerTag')}}</v-btn>
                      </v-flex>

                    </v-layout>



                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex md4 xs12 pa-3>
        <section>

          <v-toolbar class="gamexarena-green" dark style="height: auto !important;">
            <v-layout row wrap>
            <v-flex md10>
              <v-select
                :items="localGamesForChat"
                item-text="name"
                item-value="id"
                v-model="selectedGameForChat"
                v-on:change="changeChannel"
              ></v-select>
              </v-flex>
              <v-flex md2 pt-3 pl-4 class="chat-none">
                <v-badge color="green" overlap>
                  <span slot="badge">{{ Object.keys(this.getOnlineUsers()).length }}</span>
                  <i class="far fa-user fa-2x"></i>
                </v-badge>
               </v-flex>
          </v-layout>
          </v-toolbar>


          <chat :messages="messages" :channel="{state: 'chat', channel: 'chat:games:' + this.selectedGameForChat}" :key="chatKey"></chat>
        </section>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Chat from '../helpers/Chat';
  import UserAvatar from '../helpers/UserAvatar'
  import axios from 'axios';

  export default {
    name: "Dashboard",
    components: {
      Chat,
      UserAvatar
    },
    data() {
      return {
        matches: null,
        games: [{id: null, name: 'See All', slug: 'see-all'}],
        selectedPlatform: null,
        selectedGame: null,
        gamesForChat: null,
        selectedGameForChat: 155,
        messages: [],
        chatKey: 0,
        userForGamerTags: {},
      }
    },
    computed : {
      ...mapGetters('Platforms', [
        'platforms',
      ]),

      ...mapGetters('Auth', [
        'me',
      ]),

      ...mapGetters([
        'onlineUsers'
      ]),
      localPlatforms() {
        return [{id: null, name: 'See All', slug: 'see-all'}].concat(this.platforms);
      },
      localGamesForChat(){
        return [{id: 155, name: 'Lobby',slug:'lobby'}].concat(this.gamesForChat)
      },
      localChannel(){
        return this.selectedGameForChat
      },
    },

    methods: {
      ...mapActions([
        'subscribeChannel',
        'Platforms/fetchPlatforms',
        'Games/fetchGames',
        'Matches/fetchMatches',
        'Matches/fetchGameMessages',
        'Users/fetchUser',
        'Auth/fetchMe'
      ]),
      getOnlineUsers(){
        return this.onlineUsers
      },
      getRoomMessages(){
        this.chatKey += 1
        this.messages = []
        this['Matches/fetchGameMessages']({game: this.selectedGameForChat}).then(resp => this.messages = resp.data.data)
        this.$forceUpdate()
      },
      changeChannel(){
        this.getRoomMessages()
      },
      getMeUsernames(){
        var self = this
        axios.get('/api/me').then(function(response){
          self['Users/fetchUser']({
            uuid: response.data.uuid,
            includes: ['usernames']
          }).then(resp => {
            self.userForGamerTags = resp.data.usernames
          })
        })
      }
    },
    created() {
      this.changeChannel()
      this.getOnlineUsers()
      this.getRoomMessages()

      this['Games/fetchGames']({includes: []})
        .then(resp => this.gamesForChat = resp.data.data)
        .then(resp => this.games = this.games.concat(resp));


      this['Matches/fetchMatches']({includes: ['home']})
        .then(resp => this.matches = resp.data.data)
        .then(this.onFetchRoom)

      if (!this.platforms.length) {
        this['Platforms/fetchPlatforms']({includes: []});
      }
    },
    mounted(){
      this.getMeUsernames()
    }

  }
</script>

<style scoped>
  .v-toolbar__content{
    height: auto !important;
  }

  @media(max-width: 768px){
    .chat-none{
      display: none;
    }
  }
</style>
