<template>
  <v-container fluid class="gamexarena-green" pa-0>

    <v-layout row wrap>
      <v-flex md4 sm12 xs12 text-xs-center>
        <v-container>
          <v-layout row wrap text-md-center>
            <v-flex md4 text-md-center>
              <h4 class="white--text pb-2">{{ $t('FooterNavigation.About') }}</h4>
              <ul>
                <li>
                  <router-link :to="{name:'about-us', params:{lang: $route.params.lang}}">
                    {{ $t('FooterNavigation.AboutUs') }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'privacy-policy', params:{lang: $route.params.lang}}">
                    {{ $t('FooterNavigation.PrivacyPolicy') }}
                  </router-link>
                </li>
              </ul>
            </v-flex>

            <v-flex md4>
              <h4 class="white--text pb-2">{{ $t('FooterNavigation.Help')}}</h4>
              <ul>
                <li>
                  <router-link :to="{name:'support', params:{lang: $route.params.lang}}">
                    {{ $t('FooterNavigation.Support') }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'faq', params:{lang: $route.params.lang}}">
                    {{ $t('FooterNavigation.Faq') }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{name:'rules', params:{lang: $route.params.lang}}">
                    {{ $t('FooterNavigation.Rules') }}
                  </router-link>
                </li>
              </ul>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex md4 sm12 xs12 text-md-center text-xs-center pt-5>
        <a v-for="icon in icons" :href="icon.link" :key="icon.id" target="_blankk" class="mx-3 white--text">
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </a>
      </v-flex>

      <v-flex md4 sm12 xs12 text-md-center text-xs-center>
        <v-layout row wrap class="pt-4">
          <v-flex md6>
            <img src="/static/assets/img/paypal-logo.png" style="width: 50%" alt="">
          </v-flex>

          <v-flex md6>
            <img src="/static/assets/img/ssl.png" alt="" class="ssl-logo" style="width: 50%">
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-divider dark></v-divider>

    <v-layout>
      <v-flex md12 text-md-center text-sm-center text-xs-center pt-2>
        <h5 class="white--text">
          &copy;2019 — GamexArena Beta
        </h5>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  export default {
    data: () => ({
      icons: [
        {
          id: 1,
          icon: 'fab fa-facebook',
          link: 'https://www.facebook.com/Game-X-Arena-English-944577295931664/?ref=br_rs'
        },
        {id: 2, icon: 'fab fa-instagram', link: 'https://www.instagram.com/gamexarena.eng/'},
        {id: 3, icon: 'fab fa-twitter', link: 'https://twitter.com/Gamexarena1'},
        {id: 4, icon: 'fab fa-youtube', link: 'https://www.youtube.com/channel/UCsR9WQUfbRDADmElvSnejig'}
      ]
    })
  }
</script>

<style scoped>
  .indigo.lighten-1 {
    background-color: #17270f !important;
  }

  .theme--light.v-icon {
    color: #ffffff !important;
  }

  ul li {
    list-style: none;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 300;
  }

  h2 {
    margin-bottom: 20px;
  }

  ul {
    padding-left: 0;
  }

  a {
    text-decoration: none;
    color: #ffffff !important;
  }

  @media (max-width: 768px) {
    .ssl-logo {
      width: 15% !important;
    }
  }
</style>
