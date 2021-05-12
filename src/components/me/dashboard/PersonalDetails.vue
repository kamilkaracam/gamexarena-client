<template>
  <div>
    <v-container fluid>
      <h1 class="mb-3">{{ $t('ProfileNavigation.PersonalDetails') }}</h1>

      <v-form @submit.prevent="submit" @keyup.enter="submit" ref="form">
        <v-layout row wrap>
          <v-flex md6 pr-5>
            <v-text-field
              disabled
              v-model="me.first_name"
              solo-inverted
            ></v-text-field>
          </v-flex>
          <v-flex md6 pr-5>
            <v-text-field
              disabled
              v-model="me.last_name"
              solo-inverted
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex md6 pr-5>
            <v-text-field
              disabled
              v-model="me.email"
              solo-inverted
            ></v-text-field>
          </v-flex>
          <v-flex md6 pr-5>
            <v-text-field
              disabled
              v-model="me.username"
              solo-inverted
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md6 pr-5>
            <v-text-field
              v-model="personalDetails.state"
              :label="$t('inputs.state')"
              :error-messages="validationErrors('state', 'personalDetails')"
              @input="$v.personalDetails.state.$touch()"
              @blur="$v.personalDetails.state.$touch()"
            ></v-text-field>

          </v-flex>
          <v-flex md6 pr-5>
            <v-text-field
              v-model="personalDetails.postal_code"
              :label="$t('inputs.postal_code')"
              :error-messages="validationErrors('postal_code', 'personalDetails')"
              @input="$v.personalDetails.postal_code.$touch()"
              @blur="$v.personalDetails.postal_code.$touch()"
            ></v-text-field>
          </v-flex>

          <v-flex md6 pr-5>
            <v-text-field
              v-model="personalDetails.city"
              :label="$t('inputs.city')"
              :error-messages="validationErrors('city', 'personalDetails')"
              @input="$v.personalDetails.city.$touch()"
              @blur="$v.personalDetails.city.$touch()"
            ></v-text-field>
          </v-flex>
          <v-flex md6 pr-5>
            <v-select
              v-model="personalDetails.country_id"
              :label="$t('inputs.country_id')"
              :items="countries"
              item-value="id"
              item-text="name"
            ></v-select>
          </v-flex>

          <v-flex md6 pr-5>
            <v-select
              v-model="personalDetails.gender"
              :label="$t('inputs.gender')"
              @input="$v.personalDetails.gender.$touch()"
              @blur="$v.personalDetails.gender.$touch()"
              :items="genderItems"
            ></v-select>
          </v-flex>
          <v-flex md6 pr-5>
            <v-select
              v-model="personalDetails.timezone_id"
              :label="$t('inputs.timezone_id')"
              :items="timezones"
              item-value="id"
              item-text="zone"
            ></v-select>
          </v-flex>

          <v-flex md12>
            <v-btn type="submit" :loading="loading" :disabled="loading" class="btn-login">
              {{ $t('buttons.SaveChanges') }}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {minLength, alphaNum} from 'vuelidate/lib/validators'
  import _ from 'lodash'
  import {ValidationMixins} from '../../../mixins'

  export default {
    name: "PersonalDetails",
    mixins: [validationMixin, ValidationMixins],
    validations: {
      personalDetails: {
        state: {minLength: minLength(2)},
        postal_code: {alphaNum, minLength: minLength(3)},
        city: {minLength: minLength(2)},
      }
    },
    data() {
      return {
        loading: false,
        personalDetails: {
          state: null,
          postal_code: null,
          city: null,
          country_id: null,
          gender: null,
          timezone_id: null
        },
        genderItems: [{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}],
      }
    },
    watch: {
      me() {
        this.personalDetails = _.pick(this.me, _.keys(this.personalDetails))
        this.personalDetails.country_id = this.me.country.id
        this.personalDetails.timezone_id = this.me.timezone.id
      }
    },
    computed: {
      ...mapGetters('Auth', [
          'me',
        ]
      ),
      ...mapGetters('Resources', [
        'countries',
        'timezones'
      ]),
    },
    methods: {
      ...mapActions([
        'setSnackbar',
        'Users/personalDetails',
        'Resources/fetchCountries',
        'Resources/fetchTimeZones',
        'Auth/fetchMe'
      ]),
      updateMe() {
        if (this.me) {
          this['Auth/fetchMe']();
        }
      },
      submit() {
        if (!this.isValid()) {
          return false
        }

        this.loading = true
        this['Users/personalDetails'](this.personalDetails).then((resp) => {
          this.setSnackbar({status:true, type:'success', messages: [this.$t('Alert.PersonalDetails')]});
          this.updateMe()
        }).catch((err) => {
          this.loading = false
        }).then(() => {
          this.loading = false
        })
      }
    },
    created() {
      this['Resources/fetchCountries']();
      this['Resources/fetchTimeZones']();
      this.updateMe()
    },
    mounted() {

    }
  }
</script>

<style scoped>
</style>
