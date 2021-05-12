<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="showLogin"
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
          <login-form></login-form>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import LoginForm from './LoginForm'

  export default {
    props: ['visible'],
    data() {
      return {
        dialog: false
      }
    },
    components: {
      LoginForm
    },
    computed: {
      showLogin: {
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
