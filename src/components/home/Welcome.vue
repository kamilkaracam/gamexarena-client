<template id="welcomePage">
  <div>
    <v-container fluid pa-0 class="slider">

      <v-layout class="countdown">
        <v-flex md3 class="w-first-left" pl-3 pr-3 pt-0>
          <v-layout column>

            <v-flex md12 mb-4 class="logo-div">
              <!--<v-img style="background-size:auto !important;" src="/static/assets/img/logo.svg" class="logo"></v-img>-->
            </v-flex>
            <v-flex md12>
              <h1>{{ $t('Welcome') }}</h1>
            </v-flex>
            <v-flex md12>
              <h3>{{ $t('SkillToCash') }}</h3>
              <p>{{ $t('SkillToCashDesc') }}</p>
            </v-flex>
            <v-flex md12 v-if="!me">
              <v-btn :to="{name:'register', params:{lang: $route.params.lang}}" slot="activator" color="" class="btn-register" dark large block>
                {{ $t('CreateAccount') }}
              </v-btn>
            </v-flex>

            <v-flex md12  v-if="!me">
              <v-btn :to="{name:'login', params:{lang: $route.params.lang}}" slot="activator" color="" class="btn-login" dark large block>
                {{ $t('loginAccount') }}
              </v-btn>
            </v-flex>
          </v-layout>

          <v-layout row wrap text-xs-center class="pt-5 mobile-languages" v-if="!me" style="margin-top: 50px">
            <v-flex md6>
              <a href="/matches">Open Matches</a>
            </v-flex>
            <v-flex md6>
              <a href="/tournaments">Open Tournaments</a>
            </v-flex>
          </v-layout>

          <v-layout row wrap text-xs-center class="pt-5 mobile-languages" v-if="!me" style="margin-top: 50px">
            <v-flex md4 v-for="item in languages" :key="item.value">
              <a @click="changeLocale(item.value)" class="lang-change" style="font-family: 'Roboto', sans-serif !important;font-weight: 700;border: 2px solid #17270F; padding: 10px;">{{ item.text }}</a>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md9 class="w-first-right" style="background: white">
          <slider></slider>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid pa-0>
      <v-layout row class="games">
        <v-flex md2 text-md-center>
          <v-img max-width="150" src="/static/assets/img/games/game01.png"></v-img>
        </v-flex>
        <v-flex md2 text-md-center>
          <v-img max-width="150" src="/static/assets/img/games/game02.png"></v-img>
        </v-flex>
        <v-flex md2>
          <v-img max-width="150" src="/static/assets/img/games/game03.png"></v-img>
        </v-flex>
        <v-flex md2>
          <v-img max-width="150" src="/static/assets/img/games/game04.png"></v-img>
        </v-flex>
        <v-flex md2>
          <v-img max-width="150" src="/static/assets/img/games/game05.png"></v-img>
        </v-flex>
        <v-flex md2>
          <v-img max-width="150" src="/static/assets/img/games/game06.png"></v-img>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid pa-0>
      <v-layout>
        <v-flex md4 class="w-second-left" pt-3>
          <how-it-work></how-it-work>
        </v-flex>
        <v-flex md8 class="w-second-right">
          <how-it-work-slider></how-it-work-slider>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid pa-0>
      <v-layout>
        <v-flex md12 class="green-line">

        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid pa-0 v-if="false">
      <v-layout>
        <v-flex md12>
          <v-img :src="$t('tournamentNotificationImage')"></v-img>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="true" fluid pt-5 pb-2 style="background: url('/static/assets/img/bg/1.png')">
      <dashboard></dashboard>
    </v-container>

    <v-container fluid pa-0 v-if="false">
      <v-layout>
        <v-flex md12 class="green-line">

        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid class="blue-grey lighten-4">
      <v-layout row wrap>
        <v-flex md6 sm12 xs12 pa-5 class="mobile-none-padding">
         <v-card class="pa-3">
           <h1 class="mb-3">{{$t('VideoHeaders.HowDoYouPlay')}}</h1>
           <iframe style="width: 100%" height="500" src="https://www.youtube-nocookie.com/embed/NB9LJzhb4Ws?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </v-card>
        </v-flex>
        <v-flex md6 sm12 xs12 pa-5 class="mobile-none-padding">
         <v-card class="pa-3">
           <h1 class="mb-3">{{$t('VideoHeaders.HowWeWork')}}</h1>
           <iframe style="width: 100%" height="500" src="https://www.youtube-nocookie.com/embed/W5dpDZM9xUI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <auth-modal :visible="dialog" @close="dialog=false" :authModalType="authModalType"></auth-modal>
    <opening-modal :visible="openingModalVisiblity" @close="openingModalVisiblity=false"></opening-modal>

    <!--<v-dialog v-model="activeBanner" persistent max-width="500" style="max-height:90% !important;">-->
      <!--<v-card>-->
        <!--<v-btn icon dark @click="closeBanner()" style="position:absolute;top:10px;right:10px;z-index:100;display:block;">-->
            <!--<v-icon>close</v-icon>-->
          <!--</v-btn>-->
        <!--<v-img style="with:100%;position:relative;z-index:10;" :src="'/api/' + banner.banner_image" v-if="banner" class="bnr"></v-img>-->
      <!--</v-card>-->
    <!--</v-dialog>-->


    <modal
    v-model="activeBanner"
    name="dog-profile"
    classes="cute-dog-profile-photo"
    transition="false"
    height="600px"
    width="100%"
    >
    <div
      slot="top-right"
      class="ct-top-right"
      @click="closeBanner()"
    >
      <v-icon large color="red darken-2" style="position:relative; z-index:10;">close</v-icon>

    </div>
      <img class="dog-photo desktop-banner" :src="'/api/' + banner.banner_image" v-if="banner" />
      <img class="mobile-banner" :src="'/api/' + banner.banner_mobile_image" v-if="banner" />
    </modal>

  </div>
</template>

<script>
  import {mapState,mapActions,mapGetters} from 'vuex'
  import Slider from './Slider'
  import Countdown from '../auth/Countdown'
  import AuthModal from '../auth/AuthModal'
  import HowItWorkSlider from './HowItWorkSlider'
  import OpeningModal from './OpeningModal'
  import Header from '../layout/AppHeader'
  import Login from '../auth/Login'
  import HowItWork from '../auth/HowItWork'
  import Dashboard from '../tournaments/Dashboard'

  import axios from 'axios'


  export default {
    components: {
      Slider,
      Countdown,
      AuthModal,
      HowItWorkSlider,
      OpeningModal,
      Header,
      Login,
      HowItWork,
      Dashboard
    },
    data() {
      return {
        openingModalVisiblity: false,
        dialog: false,
        authModalType: '',
        banner: null,
        activeBanner:false,
        items: [
          {title: 'HeaderNavigation.AboutUs', href: {name: 'about-us'}},
          {title: 'HeaderNavigation.Tournaments', href: {name: 'tournaments', params: {lang: this.$route.params.lang}}},
          {title: 'HeaderNavigation.Rules', href: {name: 'rules', params: {lang: this.$route.params.lang}}},
          {title: 'HeaderNavigation.Faq', href: {name: 'faq', params: {lang: this.$route.params.lang}}},
        ],
        locale: this.$t('iso-code'),
        languages: [
          {value: 'en', text: 'English'},
          {value: 'de', text: 'Deutsch'},
          {value: 'tr', text: 'Türkçe'}
        ]
      }
    },
    computed: {
      ...mapGetters('Auth', [
        'me'
      ]),
      ...mapState(['bannerViewed']),
    },
    methods: {
      ...mapActions([
        'setBannerViewed'
      ]),
      openAuthModal(type) {
        this.dialog = !this.dialog
        this.authModalType = type
      },
      getBanner(){
        axios.get('/api/banner/get-active-banner')
          .then((resp)=>{
            if(resp){
              this.banner = resp.data;
              console.log(this.bannerViewed);
              if(this.bannerViewed){
                this.activeBanner = false;
                this.hide();
              }else{
                this.activeBanner = true;
                this.show();
              }
            }
          });
      },
      show () {
        this.$modal.show('dog-profile');
      },
      hide () {
        this.$modal.hide('dog-profile');
      },
      closeBanner(){
        this.activeBanner = false;
        this.setBannerViewed({bannerViewed:true});
        this.$modal.hide('dog-profile')
      },
      changeLocale(value) {
        _.merge(this.$route.params, {lang: value})
        this.$router.push({name: this.$route.meta.name, params: this.$route.params})
      }
    },
    created(){
      this.getBanner();
    }
  }
</script>

<style scoped>
  .desktop-banner{
    display: inline-block;
  }
  .mobile-banner{
    display: none;
    width:90%;
    height: auto !important;
    z-index: 1;
  }
  @media (min-width: 768px) {
    .mobile-languages{
      display: none;
    }

  }
  @media(max-width:768px){
    .mobile-banner{
      display: inline-block;
    }
    .desktop-banner{
      display: none;
    }
  }

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

  .theme--light.v-list .v-list__group__header:hover, .theme--light.v-list .v-list__tile--highlighted, .theme--light.v-list .v-list__tile--link:hover {
    background: #ffffff !important;
  }

  .v-subheader {
    font-size: 75px;
    font-family: 'Roboto', sans-serif !important;
    color: #000000 !important;
  }

  a {
    color: #17270f;
  }


  .v--modal-overlay{
    text-align: center;
    background: #000000d1 !important;
  }
  .cute-dog-profile-photo {
    background-color: transparent;
    border-radius: 100%;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.65);
  }
  .dog-photo {
    max-width:500px;
    height: 500px;
  }
  .ct-top-right {
    cursor: pointer;
    padding-top: 20px;
    padding-right: 30px;
    font-weight: 600;
    color: white;
    text-shadow: 0 0px 20px black;
  }
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.5s;
  }
  .scale-enter,
  .scale-leave-active {
    opacity: 0;
    transform: scale(0.3) translateY(24px);
  }
</style>
