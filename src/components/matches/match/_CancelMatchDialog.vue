<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Cancel Match</v-card-title>

      <v-card-text>
        Are you sure you would like to cancel match? This cannot be undone.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="error" flat @click="dialog = false">
          Back
        </v-btn>

        <v-btn color="success" @click="clickCancel(match.uuid)">
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "CancelMatchDialog",
    props: {
      visibility: {required: true, type: Boolean},
      match: {required: true, type: Object},
    },
    computed: {
      dialog: {
        get() {
          return this.visibility
        },
        set(value) {
          if (!value) {
            this.$emit('close')
          }
        },
      },
    },
    methods: {
      ...mapActions([
        'Matches/cancelMatch',
      ]),
      clickCancel(uuid) {
        this['Matches/cancelMatch']({uuid}).then(resp => this.$router.push({name: 'matches'}));
      },
    }
  }
</script>
