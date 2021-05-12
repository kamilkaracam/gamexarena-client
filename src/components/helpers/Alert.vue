<template>
  <v-snackbar
    v-model="visibility"
    :color="snackbar.type"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'"
    :timeout="timeout"
    :top="y === 'top'"
    auto-height
  >
    <template v-for="(message, i) in snackbar.messages">
      <p :key="i">{{ $t(message) }}</p>
    </template>

    <v-btn flat @click="visibility = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Alert',
    data() {
      return {
        y: 'top',
        x: 'right',
        timeout: 6000,
      }
    },
    computed: {
      ...mapGetters([
        'snackbar'
      ]),
      visibility: {
        get() {
          return this.snackbar.status
        },
        set(value) {
          if (!value) {
            this.setSnackbar({status: false, type: 'error', messages: []});
          }
        },
      },
    },
    methods: {
      ...mapActions(['setSnackbar'])
    }
  }
</script>
