<template>
  <v-layout row>
    <v-flex xs12 sm6 md12>
      <v-card>
        <v-list two-line>
          <template v-for="item in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ $t(item.header) }}
            </v-subheader>

            <v-list-tile
              v-else
              :key="item.title"
            >

              <v-list-tile>
                <img :src="item.avatar">
              </v-list-tile>

              <p>{{ $t(item.title) }}</p>
              <!--<v-list-tile-content>-->
              <!--<v-list-tile-title v-html="item.title"></v-list-tile-title>-->
              <!--</v-list-tile-content>-->
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            header: 'HowItWorks'
          },
          {
            avatar: '/static/assets/img/coins/gold.svg',
            title: 'HowItWorksStep1'
          },
          {
            avatar: '/static/assets/img/coins/silver.svg',
            title: 'HowItWorksStep2'
          },
          {
            avatar: '/static/assets/img/coins/bronz.svg',
            title: 'HowItWorksStep3'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .v-card {
    box-shadow: none !important;
  }

  .v-list--two-line .v-list__tile {
    height: 200px;
  }

  .v-list__tile__sub-title, .v-list__tile__title {
    word-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .w-second-left p {
    margin-left: 25%;
    font-size: 25px;
    font-family: 'Roboto', sans-serif !important;
  }

  .theme--light.v-list {
    background: #fafafa !important;
  }

  .v-subheader {
    font-size: 28px !important;
    font-family: 'Roboto', sans-serif !important;
    color: #000000 !important;
    padding-left: 17% !important;
  }
</style>
