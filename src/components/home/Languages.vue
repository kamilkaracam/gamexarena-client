<template>
  <v-layout>
    <v-flex md12>
      <select v-model="locale" @change="changeLocale" class="language-selection">
        <option v-for="item in items" :value="item.value" :key="item.value">{{ item.text }}</option>
      </select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        locale: this.$t('iso-code'),
        items: [
          {value: 'en', text: 'English'},
          {value: 'de', text: 'Deutsch'},
          {value: 'tr', text: 'Türkçe'}
        ]
      }
    },
    methods: {
      changeLocale() {
        this.$router.push('/' + this.locale)
      }
    }
  }
</script>

<style>

</style>
