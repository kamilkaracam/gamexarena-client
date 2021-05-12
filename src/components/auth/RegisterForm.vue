<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md4 offset-md4 class="text-xs-center">
        <v-card-text>
          <v-alert v-if="formSuccess" :value="true" type="success">
            {{ $t('Auth.FormReach') }}}
          </v-alert>

          <v-form v-if="!formSuccess" @submit.prevent="submit" @keyup.enter="submit" ref="form">
            <v-text-field
              v-model.trim="registerForm.first_name"
              :label="$t('inputs.first_name')"
              :error-messages="validationErrors('first_name', 'registerForm')"
              :counter="20"
              @input="$v.registerForm.first_name.$touch()"
              @blur="$v.registerForm.first_name.$touch()"
              required></v-text-field>

            <v-text-field
              v-model.trim="registerForm.last_name"
              :label="$t('inputs.last_name')"
              :error-messages="validationErrors('last_name', 'registerForm')"
              :counter="20"
              @input="$v.registerForm.last_name.$touch()"
              @blur="$v.registerForm.last_name.$touch()"
              required></v-text-field>

            <v-text-field
              v-model.trim="registerForm.email"
              :label="$t('inputs.email')"
              :error-messages="validationErrors('email', 'registerForm')"
              @input="$v.registerForm.email.$touch()"
              @blur="$v.registerForm.email.$touch()"
              required></v-text-field>

            <v-text-field
              v-model.trim="registerForm.username"
              :label="$t('inputs.username')"
              :error-messages="validationErrors('username', 'registerForm')"
              @input="$v.registerForm.username.$touch()"
              @blur="$v.registerForm.username.$touch()"
              required></v-text-field>

            <v-text-field
              v-model.trim="registerForm.password"
              :label="$t('inputs.password')"
              :error-messages="validationErrors('password', 'registerForm')"
              :append-icon="passwordVisiblity ? 'visibility_off' : 'visibility'"
              :type="passwordVisiblity ? 'text' : 'password'"
              @click:append="passwordVisiblity = !passwordVisiblity"
              @input="$v.registerForm.password.$touch()"
              @blur="$v.registerForm.password.$touch()"
              class="input-group--focused"
              required></v-text-field>

            <v-layout row>
              <v-flex xs12 md4>
                <v-select
                  v-model="birthday"
                  :label="$t('inputs.birthday')"
                  :error-messages="validationErrors('birthday')"
                  :items="birthdayItems"
                  @change="$v.birthday.$touch()"
                  @blur="$v.birthday.$touch()"
                  required></v-select>
              </v-flex>

              <v-flex xs12 md4>
                <v-select
                  v-model="birthmonth"
                  :label="$t('inputs.birthmonth')"
                  :items="birthmonthItems"
                  :error-messages="validationErrors('birthmonth')"
                  @change="$v.birthmonth.$touch()"
                  @blur="$v.birthmonth.$touch()"
                  required></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-select
                  v-model="birthyear"
                  :label="$t('inputs.birthyear')"
                  :items="birthyearItems"
                  :error-messages="validationErrors('birthyear')"
                  @change="$v.birthyear.$touch()"
                  @blur="$v.birthyear.$touch()"
                  required></v-select>
              </v-flex>
            </v-layout>

            <v-btn type="submit" :loading="loading" :disabled="loading" class="btn-register" large>{{ $t('CreateAccount') }}</v-btn>
          </v-form>
          <router-link :to="{name:'login', params:{lang: $route.params.lang}}" style="margin-right:10px;">
            Back
          </router-link>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {required, email, maxLength, minLength} from 'vuelidate/lib/validators'
  import {ValidationMixins} from '../../mixins'

  export default {
    mixins: [validationMixin, ValidationMixins],
    validations: {
      registerForm: {
        first_name: {required, minLength: minLength(2), maxLength: maxLength(20)},
        last_name: {required, minLength: minLength(2), maxLength: maxLength(20)},
        username: {required, minLength: minLength(3), maxLength: maxLength(20)},
        email: {required, email},
        password: {required, minLength: minLength(6), maxLength: maxLength(20)},
      },
      birthday: {required},
      birthmonth: {required},
      birthyear: {required},
    },
    data: () => ({
      registerForm: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        birthday: null,
        birthmonth: null,
        birthyear: null,
      },
      formSuccess: false,
      loading: false,
      passwordVisiblity: false,
      birthday: null,
      birthdayItems: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
        30, 31,
      ],
      birthmonth: null,
      birthmonthItems: [
        1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12,
      ],
      birthyear: null,
      birthyearItems: [
        2000,
        1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990,
        1989, 1988, 1987, 1986, 1985, 1984, 1983, 1982, 1981, 1980,
        1979, 1978, 1977, 1976, 1975, 1974, 1973, 1972, 1971, 1970,
        1969, 1968, 1967, 1966, 1965, 1964, 1963, 1962, 1961, 1960
      ]
    }),
    computed: {
      birthDate() {
        return this.birthyear + '-' + this.birthmonth + '-' + this.birthday
      }
    },
    methods: {
      ...mapActions('Auth', [
        'register',
      ]),
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.register(Object.assign({}, this.registerForm, {birth_date: this.birthDate})).then((resp) => {
          this.$refs.form.reset()
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
