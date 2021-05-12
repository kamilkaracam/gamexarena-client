<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" width="50%">
      <v-img :src="$t('OpeningModalImage.base', { BASE_URL: '//gamexarena.com'})"
             :srcset="$t('OpeningModalImage.sizes', { BASE_URL: '//gamexarena.com'})"></v-img>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: 'OpeningModal',
    props: ['visible'],
    computed: {
      dialog: {
        get() {
          return this.visible
        },
        set(value) {
          if (!value) {
            this.$emit('close')
          }
        },
      },
    },
  }
</script>

<style>
  .v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100% !important;
  }

  @media (max-width: 768px) {
    .v-dialog--active {
      width: 100% !important;
    }
  }
</style>
