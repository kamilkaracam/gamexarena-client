<template>
  <v-container>
    <v-layout>
      <v-flex>
        
        <h2>Click to complete your registration</h2>
          <br><br>
          <v-btn @click="verifyEmail" :loading="loading" :disabled="loading" class="btn-login">
            VERIFY
            {{$t('Email.Verify')}}
          </v-btn>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex'
  import axios from 'axios'


  export default {
    name: "VerifyEmail",
    data() {
      return {
        formSuccess: false,
        loading: false,
        uuid: this.$route.params.uuid
      }
    },
    methods: {
        verifyEmail(){
            this.loading = true
            axios.post('/api/auth/verify-email/', {uuid:this.uuid}).then((resp) => {
                if(resp.data.success){
                    this.loading = false
                    this.$router.push('/' + this.locale)
                }
            });
            /*this.resetPassword(this.passwordReset).then((resp) => {
                this.formSuccess = true
            }).catch((err) => {
                this.$refs.form.reset()
                this.loading = false
            }).then(() => {
                this.loading = false
            })*/
        }
    },
  }
</script>
