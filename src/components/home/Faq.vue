<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg12 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content
            v-for="faq in faqs"
            :key="faq.id"
          >
            <div slot="header" v-html="$t(faq.question)" style="font-weight: 700"></div>
            <v-card>
              <v-card-text v-html="$t(faq.answer)" style="font-weight: 300 !important;">

              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Faq",
    data() {
      return {
        faqs: [
          {id: 1, question: 'WhatIsGamexarenaQ', answer: 'WhatIsGamexarenaA'},
          {id: 2, question: 'HowDoISignUpQ', answer: 'HowDoISignUpA'},
          {id: 3, question: 'DoesItCostQ', answer: 'DoesItCostA'},
          {id: 4, question: 'IsLegalQ', answer: 'IsLegalA'},
          {id: 5, question: 'IsSecureQ', answer: 'IsSecureA'},
          {id: 6, question: 'HowDoesWorkQ', answer: 'HowDoesWorkA'},
          {id: 7, question: 'WhatVideoGamesQ', answer: 'WhatVideoGamesA'},
          {id: 8, question: 'TournamentsQ', answer: 'TournamentsA'},
          {id: 9, question: 'HowCanIJoinQ', answer: 'HowCanIJoinA'},
          {id: 10, question: 'HowCanICreateQ', answer: 'HowCanICreateA'},
          {id: 11, question: 'HowDoIPlayQ', answer: 'HowDoIPlayA'},
          {id: 12, question: 'WhatHappensDisconnectQ', answer: 'WhatHappensDisconnectA'},
          {id: 13, question: 'WhatAreDisputesQ', answer: 'WhatAreDisputesA'},
          {id: 14, question: 'HowMatchFeeWorksQ', answer: 'HowMatchFeeWorksA'},
          {id: 15, question: 'MonthlyChargesQ', answer: 'MonthlyChargesA'},
          {id: 16, question: 'HeadToHeadQ', answer: 'HeadToHeadA'},
          {id: 17, question: 'RatingSystemQ', answer: 'RatingSystemA'},
          {id: 18, question: 'HowOldQ', answer: 'HowOldA'},
          {id: 19, question: 'MoreThanAccountQ', answer: 'MoreThanAccountA'}
        ]
        // faqs: []
      }
    },
  }
</script>

<style scoped>

</style>





