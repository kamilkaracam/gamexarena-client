<template>
  <v-container fluid>
    <h1 class="mb-3">Leaders Table</h1>


    <!--<v-data-table
      :headers="headers"
      :items="transactions"
      :loading="loading"
      class="elevation-1"
      :rows-per-page-items="[]"
    >
      <v-progress-linear slot="progress" color="blue" height="2" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.balance }}</td>
        <td>{{ props.item.bonus_balance }}</td>
        <td>{{ props.item.type.name }}</td>
        <td>{{ props.item.is_success }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.description.text }}</td>
        
        <td>
          {{ $d(new Date(props.item.created_at), 'long') }}
        </td>
      </template>
    </v-data-table>-->
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'TransactionHistory',
    data() {
      return {
        headers: [
          {text: 'BALANCE', value: 'balance', sortable: false},
          {text: 'BONUS BALANCE', value: 'bonus_balance', sortable: false},
          {text: 'TYPE', value: 'type.name', sortable: false},
          {text: 'STATUS', value: 'is_success', sortable: false},
          {text: 'AMOUNT', value: 'amount', sortable: false},
          {text: 'METHOD/DESCRIPTION', value: 'description.text', sortable: false},
          // {text: 'TRANSACTION ID', align: 'left', sortable: false},
          {text: 'DATE/TIME (MM/DD/YY)', value: 'created_at', sortable: false},
        ],
        transactions: null,
        loading: true,
      }
    },
    computed: {
      ...mapGetters('Auth', ['me']),
    },
    methods: {
      ...mapActions([
        'Users/fetchTransactions',
      ]),
    },
    created() {
      this['Users/fetchTransactions']().then(resp => {
        this.transactions = resp.data.data;
        this.loading = false
      });
    }
  }
</script>
