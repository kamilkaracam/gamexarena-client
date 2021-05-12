<template>
  <v-layout row>
    <v-radio-group row v-model="wager">
      <v-flex v-for="(option, i) in options" :key="i" md3 sm12 xs12 pl-5 pr-5 class="mobile-none-padding sm-xs-mb-10" >
        <v-card class="pa-3">
          <v-layout px-3 pt-3 pb-3>
            <v-flex md11 sm10 xs10 class="money-select">
              {{ $n(option.text, 'currency') }}
            </v-flex>

            <v-flex md1 sm2 xs2 class="money-select-input">
              <v-radio :value="option.value" color="green"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex md3 pl-5 pr-5 class="mobile-none-padding sm-xs-mb-10">
        <v-card class="pa-0">
          <v-layout px-3 pt-3>
            <v-flex md12 class="money-select">
              <v-text-field
                @change="fuu"
                v-model.number="custom"
                :label="$t('CreateMatch.CustomAmount')"
                prepend-icon="fa-euro-sign"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-radio-group>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ $t('CreateMatch.WagerLimit') }}
      <v-btn
        color="error"
        flat
        @click="snackbar = false"
      >
        {{$t('buttons.Close')}}
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: "YourWager",
    props: {
      formRef: {required: true, type: String}
    },
    data() {
      return {
        wager: 0,
        custom: '',
        options: [
          {value: 5, text: 5},
          {value: 25, text: 25},
          {value: 50, text: 50},
        ],
        snackbar: false,
        y: 'top',
        x: 'right',
        mode: '',
        timeout: 6000,
      }
    },
    watch: {
      custom(val) {
        this.wager = val
        // if(val < 5) {
        //   alert('Olmaz')
        //   return false
        // }
        //
        // return true
      },
      wager(val) {
        this.setFormProp({root: this.formRef, prop: {wager: val}})
      }
    },
    computed: {
      ...mapState(['forms']),
      customAmount() {
        return this.custom
      }
    },
    methods: {
      ...mapActions(['setFormProp']),
      fuu(){
        if(this.wager < 1){
          this.snackbar = true;
          this.custom = 1
        }
      }
    }
  }
</script>
