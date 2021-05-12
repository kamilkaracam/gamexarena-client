<template>
  <v-layout row wrap pl-3 pr-3>
    <v-flex md12>
      <h2 class="mb-3">Custom Rules</h2>
    </v-flex>
    <v-flex>
      <v-textarea
        solo
        name="input-7-4"
        label="Solo textarea"
        :value="'Use this box to specify any additional rules & game play settings (i.e. No PLR over 3, don’t allow specific teams, etc.)'"
      ></v-textarea>
    </v-flex>
  </v-layout>
</template>

<script>
  export default{
    name: "CustomRules"
  }
</script>
