<template>
  <v-container fluid>
    <h1 class="mb-3">{{ $t('ProfileNavigation.TransactionHistory') }}</h1>

    <v-layout v-if="me.account">
      <v-flex xs12 sm12 mb-4>
        <v-card>
          <v-card-title>
            <div class="mr-5">
              <h5 class="grey--text">{{ $t('TransactionHistory.AccountBalance') }}</h5>
              <h2>{{ $n(me.account.balance, 'currency') }}</h2>
            </div>

            <div>
              <h5 class="grey--text">{{ $t('TransactionHistory.BonusBalance') }}</h5>
              <h2>{{ $n(me.account.bonus_balance, 'currency') }}</h2>
            </div>

            <v-spacer></v-spacer>

            <div>
              <v-btn to="/add-money" color="success">{{ $t('MeNavigations.AddMoney') }}</v-btn>
              <v-btn to="/withdraw" color="info">{{ $t('MeNavigations.Withdraw') }}</v-btn>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

    <v-data-table
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
    </v-data-table>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Vue from 'vue';

  export default {
    name: 'TransactionHistory',
    data() {
      return {
        headers: [
          {text: this.$i18n.t('TransactionHistory.Balance'), value: 'balance', sortable: false},
          {text: this.$i18n.t('TransactionHistory.BonusBalance'), value: 'bonus_balance', sortable: false},
          {text: this.$i18n.t('TransactionHistory.Type'), value: 'type.name', sortable: false},
          {text: this.$i18n.t('TransactionHistory.Status'), value: 'is_success', sortable: false},
          {text: this.$i18n.t('TransactionHistory.Amount'), value: 'amount', sortable: false},
          {text: this.$i18n.t('TransactionHistory.Description'), value: 'description.text', sortable: false},
          {text: this.$i18n.t('TransactionHistory.Date'), value: 'created_at', sortable: false},
        ],
        transactions: [],
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
