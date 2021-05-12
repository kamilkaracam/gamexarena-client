<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >

    <v-window v-model="step">
      <v-window-item :value="1">
        <register-form></register-form>
      </v-window-item>

      <!--<v-window-item :value="2">-->
        <!--<login-form></login-form>-->
      <!--</v-window-item>-->

      <!--<v-window-item :value="3">-->
        <!--<forgot-password></forgot-password>-->
      <!--</v-window-item>-->
    </v-window>

    <v-divider></v-divider>

    <!--<v-card-actions>-->
      <!--<v-btn-->
        <!--:disabled="step === 1"-->
        <!--flat-->
        <!--@click="step&#45;&#45;"-->
      <!--&gt;-->
        <!--{{stepTextLeft}}-->
      <!--</v-btn>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-btn-->
        <!--:disabled="step === 3"-->
        <!--flat-->
        <!--depressed-->
        <!--@click="step++"-->
      <!--&gt;-->
        <!--{{stepTextRight}}-->
      <!--</v-btn>-->
    <!--</v-card-actions>-->
  </v-card>
</template>

<script>
  import RegisterForm from './RegisterForm'
  import LoginForm from './LoginForm'
  import ForgotPassword from './ForgotPassword'

  export default {
    data() {
      return {
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
      }
    },
    watch: {
      step: {
        immediate: true,
        handler: 'getButtonText'
      }
    }
  }
</script>
