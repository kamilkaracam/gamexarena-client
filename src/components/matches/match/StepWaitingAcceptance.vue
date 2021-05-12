<template>
  <div>
    <v-alert :value="true" type="info">
      {{$t('Match.Acceptance')}}
    </v-alert>

    <v-btn v-if="home.username !== me.username" block color="error" outline
           @click="clickLeave(match.uuid)"> {{ $t('Match.LeaveMatch') }}
    </v-btn>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "StepWaitingAcceptance",
    props: {
      match: {required: true, type: Object},
      home: {required: true, type: Object},
    },
    data() {
      return {
        ...mapGetters(['channels']),
        ...mapGetters('Auth', ['me']),
      }
    },
    methods: {
      ...mapActions([
        'Matches/leaveMatch',
      ]),
      clickLeave(uuid) {
        this['Matches/leaveMatch']({uuid})
        .then((res)=>{
          this.$router.go(this.$router.currentRoute)
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
        
      },
    }
  }
</script>
