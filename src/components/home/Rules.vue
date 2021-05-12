<template>
  <v-container>
    <v-layout column wrap>
      <v-flex md12 text-md-center>
        <img src="/static/assets/img/logo.svg" class="about-us-logo">
      </v-flex>
      <v-flex md12>
        <h1 class="mb-3 text-xs-center">{{ $t('Rules.title') }}</h1>

        <p v-for="(item,i) in $t('Rules.paragraphs1')" :key="i">{{ $t(item) }}</p>

        <ul>
          <li v-for="(item, j) in $t('Rules.list1')" :key="j">{{ $t(item) }}</li>
        </ul>

        <p>{{$t('Rules.paragraphs2')[0]}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "AboutUs",
    data(){
      return {
        i:null,
        j:null,
        x:null
      }
    },
    created(){

    }
  }
</script>

<style scoped>
  h1{
    font-size: 25px;
  }

  p{
    font-size: 15px;
  }
</style>
