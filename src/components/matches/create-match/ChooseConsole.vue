<template>
  <v-layout column>
    <v-flex v-if="platforms">
      <v-radio-group v-model="platformId" row>
        <v-flex class="mobile-none-padding sm-xs-mb-10" md4 sm12 xs12 pl-5 pr-5 v-for="platform in platforms" :key="platform.id">
          <v-card class="pa-3">
            <v-layout px-3 row wrap>
              <v-flex md11 sm10 xs10>
                {{ platform.name }}
              </v-flex>

              <v-flex md1 sm2 xs2>
                <v-radio :value="platform.id" color="green"></v-radio>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-radio-group>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: "ChooseConsole",
    props: {
      formRef: {required: true, type: String}
    },
    data() {
      return {
        platformId: 0,
      }
    },
    watch: {
      platformId(val) {
        this.setFormProp({root: this.formRef, prop: {platform_id: val, game_id: null, game_type_id: null, options: []}})
      },
      'activeForm.platform_id': function (val) {
        this.platformId = val
      }
    },
    computed: {
      ...mapState(['forms']),
      ...mapGetters('Platforms', [
        'platforms',
      ]),
      activeForm() {
        return this.forms[this.formRef]
      },
    },
    methods: {
      ...mapActions(['setFormProp']),
      ...mapActions('Platforms', [
        'fetchPlatforms',
      ]),
    },
    created() {

      this.fetchPlatforms({includes: ['games.types.rules.options']})
    }
  }
</script>
