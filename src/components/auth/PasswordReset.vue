<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-alert v-if="formSuccess" :value="true" type="success">
          {{ $t('ResetPassword') }}
        </v-alert>

        <v-form v-if="!formSuccess" @submit.prevent="submit" @keyup.enter="submit" ref="form">
          <v-text-field
            type="password"
            v-model="passwordReset.password"
            :label="$t('inputs.password')"
            :error-messages="validationErrors('password', 'passwordReset')"
            @input="$v.passwordReset.password.$touch()"
            @blur="$v.passwordReset.password.$touch()"
            required></v-text-field>

          <v-text-field
            type="password"
            v-model="passwordReset.repeat_password"
            :label="$t('inputs.repeat_password')"
            :error-messages="validationErrors('repeat_password', 'passwordReset')"
            @input="$v.passwordReset.repeat_password.$touch()"
            @blur="$v.passwordReset.repeat_password.$touch()"
            required></v-text-field>

          <v-btn type="submit" :loading="loading" :disabled="loading" class="btn-login">
            {{ $t('ResetPassword') }}
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {required, minLength, sameAs} from 'vuelidate/lib/validators'
  import {ValidationMixins} from '../../mixins'

  export default {
    name: "PasswordReset",
    mixins: [validationMixin, ValidationMixins],
    validations: {
      passwordReset: {
        password: {required, minLength: minLength(6)},
        repeat_password: {required, sameAs: sameAs('password')}
      }
    },
    data() {
      return {
        formSuccess: false,
        loading: false,
        passwordReset: {
          password: '',
          repeat_password: '',
          forgot_key: this.$route.params.forgotKey,
        },
      }
    },
    methods: {
      ...mapActions('Auth', [
        'resetPassword',
      ]),
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.loading = true
        this.resetPassword(this.passwordReset).then((resp) => {
          this.formSuccess = true
        }).catch((err) => {
          this.$refs.form.reset()
          this.loading = false
        }).then(() => {
          this.loading = false
        })
      }
    },
  }
</script>
