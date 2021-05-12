<template>
  <v-layout row wrap>
    <v-radio-group v-model="amount" row>
      <v-flex md12 class="pl-5 mb-3">
        <h3>Select An Opponent</h3>
      </v-flex>
      <v-flex md12 class="pl-5 pr-5 mb-3">
        <v-text-field
          solo
          label="Append"
          append-icon="search"
        ></v-text-field>
      </v-flex>

      <v-flex md4 pl-5 pr-5>
        <v-card class="pl-3 pr-3 pt-3 pb-1">
          <v-layout px-3>
            <v-flex md2>
              <img class="opponent-profile-pic" src="http://i.pravatar.cc/30" alt="">
            </v-flex>
            <v-flex md9 class="money-select">
              JUGGERR
            </v-flex>

            <v-flex md1 class="money-select-input">
              <v-radio :value="10"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex md4 pl-5 pr-5>
        <v-card class="pl-3 pr-3 pt-3 pb-1">
          <v-layout px-3>
            <v-flex md2>
              <img class="opponent-profile-pic" src="http://i.pravatar.cc/30" alt="">
            </v-flex>
            <v-flex md9 class="money-select">
              JUGGERR
            </v-flex>

            <v-flex md1 class="money-select-input">
              <v-radio :value="10"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <v-flex md4 pl-5 pr-5>
        <v-card class="pl-3 pr-3 pt-3 pb-1">
          <v-layout px-3>
            <v-flex md2>
              <img class="opponent-profile-pic" src="http://i.pravatar.cc/30" alt="">
            </v-flex>
            <v-flex md9 class="money-select">
              JUGGERR
            </v-flex>

            <v-flex md1 class="money-select-input">
              <v-radio :value="10"></v-radio>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-radio-group>
  </v-layout>
</template>

<script>
  export default {
    name: "SelectOpponent"
  }
</script>
