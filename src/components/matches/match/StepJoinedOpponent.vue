<template>
  <div>
    <template v-if="joinedState">
      {{ $t('Match.Acceptance') }}
    </template>
    <template v-else>
      <v-btn @click="clickJoinedOpponent" block color="info">{{$t('Match.OpponentJoined')}}</v-btn>
      <v-btn v-if="false" block color="primary" outline>Having a problem?</v-btn>
      <v-btn v-if="false" block color="primary" outline>Match Options?</v-btn>
    </template>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "StepJoinedOpponent",
    props: {
      match: {required: true, type: Object},
      home: {required: true, type: Object},
      away: {required: true, type: Object},
    },
    data() {
      return {
        joinedState: false,
      }
    },
    computed: {
      ...mapGetters(['channels']),
      ...mapGetters('Auth', [
        'me'
      ]),
      ...mapGetters('Matches', [
        'joinedOpponentStatus',
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
      clickJoinedOpponent() {
        this.channels.match.emit('joinedOpponent', {match: this.match, type: this.whoAmI});
        this.joinedState = true;
      },
    }
  }
</script>
