<template>
  <v-container>
    <v-layout column wrap>
      <v-flex md12 text-md-center>
        <img src="/static/assets/img/logo.svg" class="about-us-logo">
      </v-flex>
      <v-flex md-12 text-md-center>
        <h1 class="mb-3">{{ $t('SupportHeader') }}</h1>
        <p>{{ $t('SupportText') }}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "Support"
  }
</script>

<style scoped>
  .container {
    height: 65vh;
  }

  h1{
    font-size: 25px;
  }

  p{
    font-size: 15px;
  }
</style>

