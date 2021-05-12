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
          <v-card
            class="mx-auto"
            max-width="500"
          >
            <v-window v-model="step">
              <v-window-item :value="1">
                <forgot-password></forgot-password>
              </v-window-item>

              <v-window-item :value="2">
                <login-form @close="show = false"></login-form>
              </v-window-item>

              <v-window-item :value="3">
                <register-form></register-form>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                :disabled="step === 1"
                flat
                @click="step--"
              >
                {{stepTextLeft}}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="step === 3"
                flat
                depressed
                @click="step++"
              >
                {{stepTextRight}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import RegisterForm from './RegisterForm'
  import LoginForm from './LoginForm'
  import ForgotPassword from './ForgotPassword'

  export default {
    props: {
      visible: {type: Boolean, required: true},
      authModalType: {type: String, required: true}
    },
    data() {
      return {
        dialog: false,
        step: 1,
        stepTextRight: '',
        stepTextLeft: ''
      }
    },
    components: {
      RegisterForm,
      LoginForm,
      ForgotPassword
    },
    methods: {
      getButtonText() {
        switch (this.step) {
          case 1:
            this.stepTextLeft = '';
            this.stepTextRight = 'Login';
            break;
          case 2:
            this.stepTextLeft = 'Forgot Password?';
            this.stepTextRight = 'Register';
            break;
          case 3:
          default:
            this.stepTextLeft = 'Login';
            this.stepTextRight = '';
            break;
        }
      },
      setStep() {
        switch (this.authModalType) {
          case 'register':
            this.step = 3
            break;
          case 'login':
            this.step = 2
            break;
        }
      }
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
    },
    watch: {
      step: {
        immediate: true,
        handler: 'getButtonText'
      },
      authModalType: {
        immediate: true,
        handler: 'setStep'
      }
    }
  }
</script>
