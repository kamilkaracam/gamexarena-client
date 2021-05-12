<template>
  <v-layout v-if="activeForm.game_id" row wrap>
    <v-radio-group v-model="gameTypeId" row>
      <v-flex md12 class="pl-5 mb-3 mobile-none-padding sm-xs-mb-10">
        <h3>{{ $t('GameType') }}</h3>
      </v-flex>

      <v-flex md4 sm12 xs12 pl-5 pr-5 v-for="type in getGameById(activeForm.platform_id, activeForm.game_id)['types']" :key="type.id" class="mobile-none-padding sm-xs-mb-10">
        <v-card class="pa-3">
          <v-layout px-3>
            <v-flex md11 sm10 xs10 class="money-select">{{ type.name }}</v-flex>

            <v-flex md1 sm2 xs2 class="money-select-input">
              <v-radio :value="type.id" color="green"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-radio-group>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: "GameType",
    props: {
      formRef: {required: true, type: String}
    },
    data() {
      return {
        gameTypeId: 0,
      }
    },
    watch: {
      gameTypeId(val) {
        this.setFormProp({root: this.formRef, prop: {game_type_id: val, options: []}})
        // this.setFormProp({root: this.formRef, prop: {options: []}})
      },
      'activeForm.game_id': function (val, oldVal) {
        // Type Seçimi olmayan oyunlar için varsayılan seçim yapılıyor
        if (val === null) {
          return
        }

        if (val !== 1) {
          this.gameTypeId = this.getGameById(this.activeForm.platform_id, this.activeForm.game_id)['types'][0]['id']
        }
      }
    },
    computed: {
      ...mapState(['forms']),
      ...mapGetters('Platforms', [
        'getGameById',
      ]),
      activeForm() {
        return this.forms[this.formRef]
      },
    },
    methods: {
      ...mapActions(['setFormProp'])
    }
  }
</script>
