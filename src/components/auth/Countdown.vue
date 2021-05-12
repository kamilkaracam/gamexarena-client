<template>
  <div>
    <h3>{{ $t('UntilRelease') }}</h3>
    <Countdown end="December 28, 2018"></Countdown>
    <p class="early-access">{{ $t('Get Your Early Access to Free Tournaments') }}</p>
  </div>
</template>

<script>
  import Countdown from 'vuejs-countdown'

  export default {
    components: {
      Countdown
    }
  }
</script>

<style scoped>
  p {
    font-size: 20px !important;
    font-family: 'Roboto', sans-serif !important;
  }
</style>
