<template>
  <div>
    <v-btn block color="info" @click="clickAddedOpponent">{{$t('Match.AddedOpponent')}}</v-btn>
    <v-btn v-if="home.username !== me.username && !match.is_tournament_match" block color="error" outline
           @click="clickLeave(match.uuid)"> {{$t('Match.LeaveMatch')}}
    </v-btn>
    <v-btn v-if="false" block color="primary" outline>Match Options?</v-btn>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "StepAddedOpponent",
    props: {
      match: {required: true, type: Object},
      home: {required: true, type: Object},
      away: {required: true, type: Object},
    },
    computed: {
      ...mapGetters(['channels']),
      ...mapGetters('Auth', [
        'me'
      ]),
      ...mapGetters('Matches', [
        'addedOpponentStatus',
      ]),
      whoAmI() {
        switch (this.me.uuid) {
          case this.home.uuid:
            return 'home';
          case (this.away ? this.away.uuid : ''):
            return 'away';
          default:
            return 'other';
        }
      },
    },
    methods: {
      ...mapActions([
        'Matches/leaveMatch',
      ]),
      clickAddedOpponent() {
        this.channels.match.emit('addedOpponent', {match: this.match, type: this.whoAmI});
        this.addedOpponentStatus[this.whoAmI] = true;
      },
      clickLeave(uuid) {
        this['Matches/leaveMatch']({uuid}).catch(err => alert(err.response.data.message));
        this.$router.go(this.$router.currentRoute)
      },
    }
  }
</script>
