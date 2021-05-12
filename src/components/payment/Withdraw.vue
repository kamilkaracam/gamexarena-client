<template>
  <v-container>
    <v-layout column>
      <v-flex md12 text-xs-center>
        <h1 class="mb-5"> {{ $t('buttons.Withdraw')}}</h1>
      </v-flex>
    </v-layout>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      color="success"
    >
      {{ text }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>


    <v-layout v-if="me.identity">
      <v-flex xs12 sm4 offset-sm4 mb-5>
        <v-card>
          <v-form>
            <v-card-title primary-title>
              <v-text-field
                label="Amount"
                prefix="€"
                v-model="amount"
              ></v-text-field>
            </v-card-title>

            <p class="pl-3">
              {{ $t('Withdraw.Payment') }}
            </p>

            <v-card-actions>
              <v-btn @click="sendWithdraw" color="success" block>
                {{ $t('buttons.Withdraw')}}
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout column v-if="!me.identity">
      <v-flex md12 text-xs-center>
        <p>Before you continue, we just need to make sure you are who you say you are.</p>
        <p>Complete the form below using your government issued form of identification (your passport or drivers
          license), showing your name and age. Once your identity is confirmed, you will be allowed to withdraw as much
          as you’d like.</p>

      </v-flex>
    </v-layout>

    <v-layout row v-if="!me.identity">
      <v-flex md12 text-xs-center>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Front</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Back</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Selfie</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-form @submit.prevent="sendId" @keyup.enter="sendId" enctype="multipart/form-data">
              <v-stepper-content step="1">
                <v-card
                  class="mb-5"
                  color="lighten-1"

                >
                  <v-layout column>
                    <v-flex md12>
                      <v-img v-if="image.front" :src="image.front" contain height="300" class="mb-3"></v-img>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit, tempora. Alias aliquam
                        architecto asperiores beatae deleniti ipsam magnam natus necessitatibus nihil provident quod
                        quos rem reprehenderit, sint soluta tempore.
                      </p>

                      <v-btn v-model="form.identity_front" @click="pickFile1" dark>UPLOAD FRONT</v-btn>

                      <input type="file" ref="image1" style="display: none" accept="image/*" @change="onFrontPicked">
                    </v-flex>
                  </v-layout>
                </v-card>

                <v-btn
                  color="primary"
                  @click="e1 = 2"
                  v-if="image.front"
                >
                  Continue
                </v-btn>

              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  class="mb-5"
                  color="lighten-1"
                >
                  <v-layout column>
                    <v-flex md12>
                      <v-img v-if="image.back" :src="image.back" contain height="300" class="mb-3"></v-img>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit, tempora. Alias aliquam
                        architecto asperiores beatae deleniti ipsam magnam natus necessitatibus nihil provident quod
                        quos rem reprehenderit, sint soluta tempore.
                      </p>

                      <v-btn v-model="form.identity_back" @click="pickFile2" dark>UPLOAD BACK</v-btn>

                      <input type="file" ref="image2" style="display: none" accept="image/*" @change="onBackPicked">
                    </v-flex>
                  </v-layout>
                </v-card>

                <v-btn
                  color="primary"
                  @click="e1 = 3"
                  v-if="image.back"
                >
                  Continue
                </v-btn>

              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  class="mb-5"
                  color=" lighten-1"
                >
                  <v-layout column>
                    <v-flex md12>
                      <v-img v-if="image.selfie" :src="image.selfie" contain height="300" class="mb-3"></v-img>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit, tempora. Alias aliquam
                        architecto asperiores beatae deleniti ipsam magnam natus necessitatibus nihil provident quod
                        quos rem reprehenderit, sint soluta tempore.
                      </p>

                      <v-btn v-model="form.identity_selfie" @click="pickFile3" dark>UPLOAD SELFIE</v-btn>

                      <input type="file" ref="image3" style="display: none" accept="image/*" @change="onSelfiePicked">
                    </v-flex>
                  </v-layout>
                </v-card>

                <v-btn
                  color="success"
                  type="submit block"
                  v-if="image.selfie"
                >
                  COMPLETE
                </v-btn>

              </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import axios from 'axios'

  export default {
    name: "Withdraw",
    data() {
      return {
        e1: 0,
        identityConfirmed: false,
        amount: null,
        image: {
          front: null,
          back: null,
          selfie: null,
          name: null,
        },
        form: {
          identity_front: null,
          identity_back: null,
          identity_selfie: null,
        },
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 10000,
        text: 'Para çekme talebiniz alınmıştır.'
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'me'
      ]),
      ...mapActions([
        'Auth/fetchMe',
      ]),
    },
    methods: {
      pickFile1() {
        this.$refs.image1.click()
      },
      pickFile2() {
        this.$refs.image2.click()
      },
      pickFile3() {
        this.$refs.image3.click()
      },
      onFrontPicked(e) {
        const files = e.target.files;
        if (files[0] !== undefined) {
          this.form.identity_front = files[0].name;
          if (this.form.identity_front.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener('load', () => {
            this.image.front = fr.result;
            this.form.identity_front = fr.result // this is an image file that can be sent to server...
          })
        } else {
          this.form.identity_front = null;
          this.image.front = null;
        }
      },
      onBackPicked(e) {
        const files = e.target.files;
        if (files[0] !== undefined) {
          this.form.identity_back = files[0].name;
          if (this.form.identity_back.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener('load', () => {
            this.image.back = fr.result;
            this.form.identity_back = fr.result // this is an image file that can be sent to server...
          })
        } else {
          this.form.identity_back = null;
          this.image.back = null;
        }
      },
      onSelfiePicked(e) {
        const files = e.target.files;
        if (files[0] !== undefined) {
          this.form.identity_selfie = files[0].name;
          if (this.form.identity_selfie.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener('load', () => {
            this.image.selfie = fr.result;
            this.form.identity_selfie = fr.result // this is an image file that can be sent to server...
          })
        } else {
          this.form.identity_selfie = null;
          this.image.selfie = null;
        }
      },
      sendId() {
        this.form.identity_front = this.$refs.image1.files[0]
        this.form.identity_back = this.$refs.image2.files[0]
        this.form.identity_selfie = this.$refs.image3.files[0]

        let formData = new FormData()

        formData.append('identity_front', this.form.identity_front)
        formData.append('identity_back', this.form.identity_front)
        formData.append('identity_selfie', this.form.identity_front)

        axios.post('/api/me/identity', formData)
          .then(resp => {
            this['Auth/fetchMe']();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      sendWithdraw() {
        let formData = new FormData()

        formData.append('amount', this.amount)

        axios.post('/api/withdraw', formData)
          .then((resp) => {
            this.snackbar = true;
            this.amount = null;

            this.$router.go(this.$router.currentRoute)
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    },
  }
</script>

<style scoped>

</style>
