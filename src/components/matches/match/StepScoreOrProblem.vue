<template>
  <div v-if="playingMatch && playingMatch.started_at">
    <v-progress-linear v-model="progressBar"></v-progress-linear>
    <v-btn v-if="false" block color="primary" outline>Having a problem?</v-btn>
    <v-btn v-if="false" block color="primary" outline>Match Options?</v-btn>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "StepScoreOrProblem",
    data() {
      return {
        progressBar: 0,
        waitingTime: 1 * 27000,
        interval: null,
      }
    },
    computed: {
      ...mapGetters('Matches', ['playingMatch']),
    },
    methods: {
      remainingTime() {
        if (!this.playingMatch || !this.playingMatch.started_at) {
          return;
        }

        let now = new Date().getTime();
        let targetTime = new Date(this.playingMatch.started_at).getTime() + this.waitingTime;
        let remainingTime = targetTime - now;

        this.progressBar = parseInt(100 - ((remainingTime * 100) / this.waitingTime));
        
        if (this.progressBar >= 100) {
          this.$emit('complete', 4);
          clearInterval(this.interval);
        }
      }
    },
    created() {
      this.interval = setInterval(this.remainingTime, 1000);
    }
  }
</script>
