<template>
  <v-container>
    <v-layout>
      <v-flex md4 offset-md4 class="text-xs-center">
        <v-card-text>
          <h2 class="mb-5">{{ $t('Auth.ForgotPassword') }}</h2>

          <p v-if="!formSuccess">
            {{ $t('EnterEmailAddress') }}
          </p>

          <v-form v-if="!formSuccess" @submit.prevent="submit" @keyup.enter="submit">
            <v-text-field
              v-model="email"
              :error-messages="validationErrors('email')"
              :label="$t('inputs.email')"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              required></v-text-field>

            <v-btn type="submit" :loading="loading" :disabled="loading" large class="btn-register">
              {{ $t('ForgotPassword') }}
            </v-btn>
          </v-form>

          <router-link :to="{name:'login', params:{lang: $route.params.lang}}">
            Back
            </router-link>

          <v-alert v-if="formSuccess" :value="true" type="success">
            Password reset link has been sent to your email address.
          </v-alert>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'
  import {ValidationMixins} from '../../mixins'

  export default {
    mixins: [validationMixin, ValidationMixins],
    validations: {
      email: {required, email},
    },
    data: () => ({
      formSuccess: false,
      loading: false,
      email: '',
    }),
    methods: {
      ...mapActions('Auth', [
        'forgotPassword',
      ]),
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.loading = true

        this.forgotPassword(this.email).then((resp) => {
          this.formSuccess = true
        }).catch((err) => {
          err.response.data.forEach((r) => {
            this.formErrors.push(r)
          })
        }).then(() => {
          this.loading = false
        })
      },
    },
  }
</script>

<style>

</style>
