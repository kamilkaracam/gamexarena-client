<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          <v-img src="/static/assets/img/logo.svg"></v-img>
        </v-card-title>

        <v-card-text>
          <account></account>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import Account from './Account'

  export default {
    props: ['visible'],
    data() {
      return {
        dialog: false
      }
    },
    components: {
      Account
    },
    computed: {
      show: {
        get() {
          return this.visible
        },
        set(value) {
          if (!value) {
            this.$emit('close')
          }
        }
      }
    }
  }
</script>
