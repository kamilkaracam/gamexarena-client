<template>
  <v-layout row wrap pl-3 pr-3>
    <v-flex>
      <h2>ODDS/ADVANTAGES</h2>
    </v-flex>
    <v-flex md12>
      <h3>If you're a good player, you can offer advantages to your opponent to help level the playing
        field for someone who otherwise would never play against you.</h3>
      <h3 class="mb-3">How many eliminations will you give your opponent? (OPTIONAL)</h3>
    </v-flex>
    <v-flex xs12 sm6 d-flex>
      <v-select
        :items="items"
        label="Solo field"
        solo
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "Advantages",
    data() {
      return {
        items: ['Foo', 'Bar', 'Fizz', 'Buzz']
      }
    }
  }
</script>
