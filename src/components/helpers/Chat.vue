<template>
  <v-card>
    <section id="chat-screen" class="scroll-y">
      <v-layout v-for="(message, i) in messages" :key="i" row wrap pl-3 pt-3 mb-2>
        <v-flex md2 sm2 xs2>
          <user-avatar :user="message.user"></user-avatar>
        </v-flex>
        <v-flex md10 sm10 xs10>
          <p class="mb-0 font-weight-bold">{{ message.user.username }}</p>
          <p class="mb-0 font-weight-regular" v-if="message">{{ message.created_at | moment("MM/DD/YYYY h:mm:ss") }}</p>
        </v-flex>
        <v-flex md12 sm12 xs12>
          <p>{{ message.message }}</p>
        </v-flex>
      </v-layout>
    </section>

    <v-layout row wrap px-3>
      <v-flex md12>
        <v-form @submit.prevent="sendMessage" @keyup.enter="sendMessage">
          <v-text-field
            v-model="message"
            clearable
            label="Message"
            type="text"
            :disabled="!me"
          >
            <v-fade-transition slot="append">
              <v-progress-circular
                v-if="loading"
                size="24" 
                color="info"
                indeterminate
              ></v-progress-circular>
              <v-icon @click="sendMessage" :disabled="!message">send</v-icon>
            </v-fade-transition>
          </v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import UserAvatar from './UserAvatar';

  export default {
    props: {
      channel: {required: true, type: Object},
      messages: {required: true, type: Array},
    },
    components: {
      UserAvatar,
    },
    data() {
      return {
        loading: false,
        message: null,
        subscribedChannels: [],
      }
    },
    computed: {
      ...mapGetters(['channels']),
      ...mapGetters('Auth', ['me']),
      localChannels(){
        return this.channels;
        //return [{id: 'lobby', name: 'Lobby',slug:'lobby'}].concat(this.gamesForChat)
      }
    },
    methods: {
      ...mapActions([
        'subscribeChannel',
      ]),
      sendMessage() {
       if(!this.message.length) {
         return
       }
         this.channels.chat.emit('message', this.message);
         this.message = null;
         this.scrollToEnd();
      },
      onMessage(message) {
        this.messages.push(message)
      },
      scrollToEnd() {
        const chatScreen = this.$el.querySelector("#chat-screen");
        chatScreen.scrollTop = chatScreen.scrollHeight
      },
    },
    created() {
      this.subscribeChannel(this.channel).then((res) => {
        this.channels.chat.on('newMessage', this.onMessage)
      });

      return;
    },
    updated() {
      this.scrollToEnd();
    }
  }
</script>



<style scoped>
  section {
    min-height: 500px;
    max-height: 500px;
  }
</style>
