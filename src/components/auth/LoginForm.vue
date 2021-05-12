<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md4 offset-md4 class="text-xs-center">
        <v-card-text>
          <v-form @submit.prevent="submit" @keyup.enter="submit">
            <v-text-field
              type="email"
              v-model="loginForm.email"
              :error-messages="validationErrors('email', 'loginForm')"
              :label="$t('inputs.email')"
              @input="$v.loginForm.email.$touch()"
              @blur="$v.loginForm.email.$touch()"
              required></v-text-field>

            <v-text-field
              :type="passwordVisibility ? 'text' : 'password'"
              v-model="loginForm.password"
              :error-messages="validationErrors('password', 'loginForm')"
              :label="$t('inputs.password')"
              :append-icon="passwordVisibility ? 'visibility_off' : 'visibility'"
              @click:append="passwordVisibility = !passwordVisibility"
              @input="$v.loginForm.password.$touch()"
              @blur="$v.loginForm.password.$touch()"
              class="input-group--focused"
              required></v-text-field>
            <v-alert v-if="formError !== null" :value="true" type="error" v-html="formError.message">
            </v-alert>

            <v-btn type="submit" :loading="loading" :disabled="loading" class="btn-login mb-5" large>
              {{ $t('Auth.Login') }}
            </v-btn>
          </v-form>
          <router-link :to="{name:'register', params:{lang: $route.params.lang}}" style="margin-right:10px;">
            Create Account
          </router-link>
          <router-link :to="{name:'forgot-password', params:{lang: $route.params.lang}}">
            Forgot Password?
          </router-link>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {required, minLength, email} from 'vuelidate/lib/validators'
  import {ValidationMixins} from '../../mixins'

  export default {
    mixins: [validationMixin, ValidationMixins],
    validations: {
      loginForm: {
        email: {required, email},
        password: {required, minLength: minLength(6)},
      }
    },
    data: () => ({
      passwordVisibility: false,
      formSuccess: false,
      loading: false,
      formError: null,
      loginForm: {
        email: '',
        password: '',
      },
    }),
    computed: {
      ...mapGetters(['channels']),
    },
    methods: {
      ...mapActions([
        'setOnlineUsers',
        'Auth/login',
        'Auth/loggedInitialize',
      ]),
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.loading = true;

        this['Auth/login'](this.loginForm).then((resp) => {
          this['Auth/loggedInitialize']().then((resp) => {
            localStorage.setItem('locale', this.$i18n.locale);

            this.channels.onlineUser.emit('join');
            this.channels.onlineUser.on('online', this.setOnlineUsers);

            this.loading = false;
            this.$emit('close');
            this.$router.push({name: 'welcome'})
          })
        }).catch((err) => {

          this.loading = false

          this.formError = err.response.data
          err.response.data.forEach((r) => {
            this.formErrors.push(r)
          });
          this.loading = false
        })
      },
    },
  }
</script>
