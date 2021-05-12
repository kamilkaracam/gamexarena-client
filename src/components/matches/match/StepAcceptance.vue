<template>
  <div>
    <div class="text-md-center py-3">
      <user-avatar :user="away"></user-avatar>

      <p>{{ away.username }} {{$t('Match.HasJoined')}} </p>
    </div>

    <v-btn @click="clickAccepAway" block color="success">{{$t('Match.Accept')}}</v-btn>
    <v-btn @click="clickRejectAway" block color="error">{{$t('Match.Deny')}}</v-btn>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import UserAvatar from '../../helpers/UserAvatar';

  export default {
    name: "StepAcceptance",
    props: {
      match: {required: true, type: Object},
      away: {required: true, type: Object},
    },
    components: {
      UserAvatar,
    },
    methods: {
      ...mapActions([
        'Matches/acceptAway',
        'Matches/rejectAway',
      ]),
      clickAccepAway() {
        this['Matches/acceptAway']({uuid: this.match.uuid});
        this.$router.go(this.$router.currentRoute)
      },
      clickRejectAway() {
        this['Matches/rejectAway']({uuid: this.match.uuid});
        this.$router.go(this.$router.currentRoute)
      },
    }
  }
</script>
