<template>
  <v-container>
    <v-layout column>
      <v-flex md12 text-xs-center mb-5>
        <h1 class="mb-2">{{$t('MeNavigations.AddMoney')}}</h1>
      </v-flex>

      <v-flex>
        <v-layout row justify-center>
          <v-flex md3>
            <h1 class="mb-3">{{$t('TransactionHistory.Amount')}}</h1>

            <v-layout row wrap>
              <v-radio-group v-model="amount">
                <v-flex v-for="(option, i) in options" :key="i" mb-3>
                  <v-card>
                    <v-layout px-3>
                      <v-flex md10 class="money-select">
                        <span>{{ $n(option, 'currency') }}</span>
                      </v-flex>

                      <v-flex md2 class="money-select-input">
                        <v-radio :value="option"></v-radio>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>

                <v-flex mb-3>
                  <v-card>
                    <v-layout px-3>
                      <v-flex md10 pl-2>
                        <v-text-field
                          v-model="customAmount"
                          label="Custom Amount"
                          prepend-icon="fa-euro-sign"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-radio-group>

              <v-flex md9 mb-3>
                <v-layout row>
                  <v-flex md9>{{$t('TransactionHistory.Total')}}</v-flex>
                  <v-flex md3 class="text-xs-right">{{ $n(amount, 'currency') }}</v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex md1>
            <!--Divlerin ortalanması için boş bırakıldı-->
          </v-flex>

          <v-flex md3>
            <h1 class="mb-4">{{$t('TransactionHistory.PaymentType')}}</h1>

            <v-layout row wrap>
              <v-flex>

                <paypal-button
                  :commit="paypal.commit"
                  :env="paypal.env"
                  :client="paypal.client"
                  :payment="payment"
                  :on-authorize.camel="onAuthorize"/>
                  <paypal-checkout
                    amount="amount"
                    currency="EUR"
                    :client="paypal.client">
                  </paypal-checkout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex'
  import axios from 'axios'
  import Paypal from 'paypal-checkout'

  export default {
    components: {
      paypalButton: Paypal.Button.driver('vue')
    },
    data() {
      return {
        amount: 0,
        options: [10, 25, 50],
        customAmount: null,
        paypal: {
          env: 'sandbox',
          commit: false,
          client: {
            // production: 'AXRGj4iUmi_7kl0X5pVTxA5PSoILARmZ7S7ibikrYh6BzpWuKHveN-VZFEy4zcT_qxyTwXmqFMV0OKAO'
            sandbox: 'AdEEkIz6jfTRZkQstWWdgEAsrW90eqE1sMSuNRUD4MFN-vycG_l7Q66dQsdc5aUYhGgEN_qjSjijX0pT'
          }
        }
      }
    },
    watch: {
      customAmount(val) {
        this.amount = val || 0;
      }
    },
    created() {
      this.getPaypalSettings()
    },
    methods: {
      ...mapActions([
        'setSnackbar',
        'Auth/fetchMe',
        'Payments/addMoney',
      ]),

      payment(data, actions) {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: this.amount,
              currency: 'EUR'
            }
          }]
        });
      },
      getPaypalSettings: function() {
        axios.get('/api/settings?group=paypal').then((resp) => {
          const client_id = resp.data.data.filter(res => res.key === 'client_id')
          const client_secret = resp.data.data.filter(res => res.key === 'client_secret')
          const email = resp.data.data.filter(res => res.key === 'email')
          const mode = resp.data.data.filter(res => res.key === 'mode')

          this.paypal = {
            commit: false,
            env : mode[0].value,
            client: {
              sandbox: 'AdEEkIz6jfTRZkQstWWdgEAsrW90eqE1sMSuNRUD4MFN-vycG_l7Q66dQsdc5aUYhGgEN_qjSjijX0pT',
              production: "'" + client_id[0].value + "'",
            }
          };

        });
      },
      onAuthorize(data, actions) {
        return actions.payment.execute().then(paymentData => {
          this['Payments/addMoney'](paymentData).then(resp => {
            this.setSnackbar({
              status: true,
              type: 'success',
              messages: [this.$t('Alert.Payments.BalanceAdded', {amount: this.$n(resp.data.amount, 'currency')})]
            });

            this['Auth/fetchMe']();
          })
        });
      }
    }
  }
</script>

<style scoped>
  .money-select {
    padding: 12px;
  }

  .money-select-input {
    padding: 21px;
  }

  .money-select-with-input {
    padding-right: 50px;
  }

  .money-select span, .money-select-with-input span {
    font-size: 30px;
    padding-top: 20px;
  }

  .money-select-selection {
    padding-top: 10px;
  }

  @media (max-width: 768px) {
    .money-select {
      /*padding-right: 30px*/
    }
  }
</style>
