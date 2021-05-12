<template>
  <div class="text-xs-center pt-3">
    <v-menu offset-y>
      <v-btn slot="activator" dark flat @click="sortedNotifications">
        <v-badge color="blue" overlap>
          <span v-if="unreadCount > 0" slot="badge">{{ unreadCount }}</span>
          <i class="fas fa-bell fa-2x"></i>
        </v-badge>
      </v-btn>

      <v-list>
        <v-alert v-for="(notification, i) in notifications" :key="i"
                 :value="true"
                 color="rgba(33, 150, 243, 0.18)"
                 class="px-3 py-1"
                 style="border-width: 1px 0 0"
                 :class="{'is-read-bg': notification.is_read}">
          <a @click="clickNotification(notification)"><span style="color: #000;">{{ $t(notification.message) }}</span>
            <p class="mb-0 notification-time "> {{ $d(new Date(notification.created_at), 'long') }}</p>
          </a>
        </v-alert>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters('Users', [
        'notifications',
        'changes'
      ]),
      unreadCount() {
        return (this.notifications.filter(n => !n.is_read)).length
      },
    },
    methods: {
      ...mapActions([
        'Users/fetchNotifications',
        'Users/notifications',
        'Users/readNotification',
      ]),
      sortedNotifications(){
        this['Users/fetchNotifications']();
      },
      clickNotification(notification) {
        if (!notification.is_read) {
          this['Users/readNotification'](notification).then(() => {
            this.$router.push(notification.href)
            if(this.$router.currentRoute.name === 'matches'){
              this.$router.go(notification.href)
            }else{
              this.$router.push(notification.href)
            }

          })
        } else if (notification.href) {
          this.$router.push(notification.href)
          if(this.$router.currentRoute.name === 'matches'){
            this.$router.go(notification.href)
          }else{
            this.$router.push(notification.href)
          }
        }
      },
    },
    created() {
      this['Users/fetchNotifications']();
    }
  }
</script>

<style scoped>
  .notification-time {
    font-size: 10px;
    color: #000 !important;
  }

  .is-read-bg{
    background-color: #ffffff !important;
  }
</style>
