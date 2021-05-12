<template>
  <v-container fluid>
    <v-layout>
      <v-flex md4>
        <h1>{{ $t('ProfileNavigation.ChangePassword')}}</h1>

        <v-form @submit.prevent="submit" @keyup.enter="submit" ref="form">
          <v-text-field
            type="password"
            v-model="updatePassword.new_password"
            :label="$t('inputs.new_password')"
            :error-messages="validationErrors('new_password', 'updatePassword')"
            @input="$v.updatePassword.new_password.$touch()"
            @blur="$v.updatePassword.new_password.$touch()"
            required></v-text-field>

          <v-text-field
            type="password"
            v-model="updatePassword.repeat_password"
            :label="$t('inputs.repeat_password')"
            :error-messages="validationErrors('repeat_password', 'updatePassword')"
            @input="$v.updatePassword.repeat_password.$touch()"
            @blur="$v.updatePassword.repeat_password.$touch()"
            required></v-text-field>

          <v-btn type="submit" :loading="loading" :disabled="loading" class="btn-login">
            {{ $t('buttons.ChangePassword') }}
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
  import {ValidationMixins} from '../../../mixins'

  export default {
    name: "ChangePassword",
    mixins: [validationMixin, ValidationMixins],
    validations: {
      updatePassword: {
        new_password: {required, minLength: minLength(6)},
        repeat_password: {required, sameAs: sameAs('new_password')}
      }
    },
    data() {
      return {
        formSuccess: false,
        loading: false,
        updatePassword: {
          new_password: null,
          repeat_password: null,
        },
      }
    },
    methods: {
      ...mapActions([
        'Users/updatePassword',
        'setSnackbar'
      ]),
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.loading = true
        this['Users/updatePassword'](this.updatePassword).then((resp) => {
          this.formSuccess = true
          this.setSnackbar({status:true, type:'success', messages: [this.$t('Alert.ChangePassword')]});
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


<style scoped>

</style>
