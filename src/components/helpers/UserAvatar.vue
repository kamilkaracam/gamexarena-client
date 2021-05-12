<template>

  <v-badge overlap right color="success">
    
    <span slot="badge" v-if="onlineUser(user.uuid)"></span>
    

    <template v-if="linked">
      <router-link :to="{name: 'users', params: {uuid: user.uuid}}">
        <v-avatar>
          <v-img v-if="user.avatar" :src="'/api/' + user.avatar"></v-img>
          <v-img v-else :src="'http://api.adorable.io/avatars/' + user.username"></v-img>
        </v-avatar>
      </router-link>
    </template>

    <template v-if="!linked">
      <v-avatar>
        <v-img v-if="user.avatar" :src="'/api/' + user.avatar"></v-img>
        <v-img v-else :src="'http://api.adorable.io/avatars/' + user.username"></v-img>
      </v-avatar>
    </template>
  </v-badge>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "UserAvatar",
    props: {
      user: {type: Object, required: true},
      linked: {type: Boolean, default: true},
    },
    data() {
      return {}
    },
    computed: {
      ...mapGetters([
        'onlineUsers'
      ])
    },
    created() {

      return;
    },
    methods: {
      onlineUser(uuid) {
        return typeof this.onlineUsers[uuid] !== 'undefined'
      }
    },
  }
</script>

