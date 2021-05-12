<template>
  <v-layout column>
    <v-flex v-if="activeForm.game_type_id">
      <v-layout row wrap>
        <v-flex md6 xs12 sm12 pl-5 pr-5 v-for="(rule) in rules" :key="rule.id" class="mobile-none-padding sm-xs-mb-10">
          <v-select v-model="ruleOptions[rule.id]"
                    :label="$t(rule.name)"
                    :items="rule.options"
                    item-value="id"
                    solo></v-select>
        </v-flex>
      </v-layout>
    </v-flex>

    <custom-rules v-if="false"></custom-rules>
    <advantages v-if="false"></advantages>
  </v-layout>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import CustomRules from './CustomRules'
  import Advantages from './Advantages'

  export default {
    name: "GameRules",
    props: {
      formRef: {required: true, type: String}
    },
    components: {
      CustomRules,
      Advantages
    },
    data() {
      return {
        ruleOptions: {},
      }
    },
    watch: {
      ruleOptions(val) {
        this.setFormProp({root: this.formRef, prop: {options: Object.values(val)}})
      },
      /*'activeForm.game_type_id': function (val) {
        this.ruleOptions = {}
        // this.setFormProp({root: this.formRef, prop: {options: []}})
        // console.log(this.rules)

        let rules = this.rules
        for (let rule in rules) {
          console.log(rule)
          let ruleId = ruleId
          let selectedOption = rule.options[0]
          for (let option in rule.options) {
            if (option.selected) {
              let selectedOption = rule.options.find(option => option.selected)
              let ruleId = rule.id
            }

            Object.assign(this.ruleOptions, {ruleId: selectedOption.id})
          }
        }
      }*/
    },
    computed: {
      ...mapState(['forms']),
      ...mapGetters('Platforms', [
        'getGameRules',
      ]),
      activeForm() {
        return this.forms[this.formRef]
      },
      rules() {
        return this.activeForm.game_type_id ? this.getGameRules(this.activeForm.platform_id, this.activeForm.game_id, this.activeForm.game_type_id) : []
      },
    },
    methods: {
      ...mapActions(['setFormProp']),
    }
  }
</script>
