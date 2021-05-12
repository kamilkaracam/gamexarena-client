<template>
  <v-carousel hide-delimiters hide-controls>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade"
      transition="fade"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/static/assets/img/slider/how-it-work-1.png'
          },
          {
            src: '/static/assets/img/slider/how-it-work-2.png'
          }
        ]
      }
    }
  }
</script>


