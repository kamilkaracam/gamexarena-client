<template>
  <div>
    <v-layout v-if="activeForm.platform_id" row>
      <v-radio-group v-model="gameId" row>
        <v-flex md4 xs12 sm12 pl-5 pr-5 v-for="game in getGamesByPlaformId(activeForm.platform_id)" :key="game.id" class="mobile-none-padding sm-xs-mb-10">
          <v-card class="pa-3">
            <v-layout px-3>
              <v-flex md11 sm10 xs10>
                {{ game.name }}
              </v-flex>

              <v-flex md1 sm2 xs2>
                <v-radio :value="game.id" color="green"></v-radio>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-radio-group>
    </v-layout>

    <cross-platform v-if="crossPlatformVisibility"></cross-platform>
    <game-type v-show="gameTypeVisibility" :form-ref="formRef"></game-type>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import GameType from './GameType'
  import CrossPlatform from './CrossPlatform'

  export default {
    name: "ChooseGame",
    props: {
      formRef: {required: true, type: String}
    },
    components: {
      GameType,
      CrossPlatform
    },
    data() {
      return {
        gameId: 0,
      }
    },
    watch: {
      gameId(val) {
        this.setFormProp({root: this.formRef, prop: {game_id: val, game_type_id: null, options: []}})
      },
    },
    computed: {
      ...mapState(['forms']),
      ...mapGetters('Platforms', [
        'getGamesByPlaformId',
      ]),
      activeForm() {
        return this.forms[this.formRef]
      },
      crossPlatformVisibility() {
        return this.activeForm.game_id === 2
      },
      gameTypeVisibility() {
        return this.activeForm.game_id === 1
      }
    },
    methods: {
      ...mapActions(['setFormProp'])
    },
  }
</script>

