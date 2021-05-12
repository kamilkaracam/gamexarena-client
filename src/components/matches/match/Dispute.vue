<template>
  <div>
    <v-alert v-if="disputeSendAlert" :value="matchDisputed" color="success">
      <h3>Your dispute has been sent. Disputes will be resolved
        within 24 hours, please be patient.</h3>
    </v-alert>

    <v-alert :value="matchDisputed" color="error">
      <h3 class="pb-3">{{ $t('Disputes.1') }}</h3>

      <p>{{ $t('Disputes.2') }}</p>

      <p><span class="font-weight-bold">{{ $t('Disputes.3') }}:</span> {{ $t('Disputes.4') }}</p>

      <ul class="pb-3">
        <li>{{ $t('Disputes.5') }}</li>
        <li>{{ $t('Disputes.6') }}</li>
        <li>{{ $t('Disputes.7') }}</li>
      </ul>

      <p>{{ $t('Disputes.8') }}</p>

      <div>
        <Countdown :end="$d(new Date(disputeTime(match.created_at)), 'countdown')"></Countdown>
      </div>

      <div v-if="matchDisputed">
        <v-form @submit.prevent="sendDispute" @keyup.enter="sendDispute" enctype="multipart/form-data">
          <p class="mt-3 pt-3">You can upload up to 10MB files.</p>
          <p>
            <v-img v-if="image.src" :src="image.src" contain height="200"></v-img>

            <v-btn v-model="form.screenshot" @click="pickFile" block dark>UPLOAD SCREENSHOT</v-btn>

            <input type="file" ref="image" accept="image/*" @change="onFilePicked">
          </p>

          <p>If you have any video evidence to present, please upload it to Youtube and include a link to the video
            below,
            along with any additional information you want us to know.</p>



          <v-textarea
            v-model="form.description"
            label="Video URL, Message, Comments, etc."
            hint="If you have any video evidence to present, please upload it to Youtube and include a link to the video below, along with any additional information you want us to know"
            solo
          ></v-textarea>

          <v-btn type="submit" block dark>SEND</v-btn>
        </v-form>
      </div>
    </v-alert>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Countdown from 'vuejs-countdown'

  export default {
    name: "Dispute",
    props: {
      match: {required: true, type: Object},
    },
    components: {
      Countdown
    },
    data() {
      return {
        image: {
          src: null,
          name: null,
        },
        form: {
          screenshot: null,
          description: null,
        },
        matchDisputed: true,
        disputeSendAlert: false,
      }
    },
    computed: {
      isExpire() {
        // let now = new Date()
        // console.log(now > this.disputeTime(this.match.finished_at))
        return new Date() > this.disputeTime(this.match.finished_at)
      }
    },
    methods: {
      ...mapActions([
        'Matches/dispute',
      ]),
      sendDispute() {
        this['Matches/dispute']({uuid: this.match.uuid, params: this.form}).then((resp) => {
          this.matchDisputed = false;
          disputeSendAlert = true;
        });
      },
      disputeTime(datetime) {
        let disputeTime = new Date(datetime)
        disputeTime.setHours(disputeTime.getHours() + 2)
        return disputeTime;
      },
      pickFile() {
        this.$refs.image.click()
      },
      onFilePicked(e) {
        const files = e.target.files;
        if (files[0] !== undefined) {
          this.form.screenshot = files[0].name;
          if (this.form.screenshot.lastIndexOf('.') <= 0) {
            return
          }

          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener('load', () => {
            this.image.src = fr.result;
            this.form.screenshot = fr.result // this is an image file that can be sent to server...
          })
        } else {
          this.form.screenshot = null;
          this.image.src = null;
        }
      }
    },
  }
</script>

<style>
  *[type=file] {
    display: none
  }
</style>
