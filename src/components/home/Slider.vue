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
            src: '/static/assets/img/slider/1.png'
          },
          {
            src: '/static/assets/img/slider/2.png'
          },
          {
            src: '/static/assets/img/slider/3.png'
          },
          {
            src: '/static/assets/img/slider/4.png'
          },
          {
            src: '/static/assets/img/slider/5.png'
          },
          {
            src: '/static/assets/img/slider/6.png'
          }
        ]
      }
    }
  }
</script>


