import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import i18n from '../i18n'
import Welcome from '@/components/home/Welcome.vue'
import MembershipDetails from '@/components/auth/MembershipDetails.vue'
import AddMoney from '@/components/payment/AddMoney.vue'
import Withdraw from '@/components/payment/Withdraw.vue'
import User from "../components/users/User";
import Dashboard from "../components/matches/Dashboard";
import TournamentBase from "../components/tournaments/TournamentBase";
import TournamentDashboard from "../components/tournaments/Dashboard";
import Tournament from '../components/tournaments/Tournament'
import Match from "../components/matches/Match";
import Me from "../components/me/Me";
import GameSettings from "../components/me/dashboard/GameSettings";
import TransactionHistory from "../components/me/dashboard/TransactionHistory";
import GamerTags from "../components/me/dashboard/GamerTags";
import ChangePassword from "../components/me/dashboard/ChangePassword";
import PersonalDetails from "../components/me/dashboard/PersonalDetails";
import Faq from "../components/home/Faq";
import AboutUs from "../components/home/AboutUs";
import Support from "../components/home/Support";
import PrivacyPolicy from "../components/home/PrivacyPolicy";
import Rules from "../components/home/Rules";
import PasswordReset from "../components/auth/PasswordReset";
import VerifyEmail from "../components/auth/VerifyEmail";
import LeadersTable from "../components/home/LeadersTable"
import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import ForgotPassword from "../components/auth/ForgotPassword"
import AppNotificationMobile from "../components/layout/AppNotificationMobile"

Vue.use(Router)

const authMiddleware = (to, from, next) => {
  if (localStorage.getItem('token') == null) {
    router.push({name: 'welcome'});
  }

  next()
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth/password-reset/:forgotKey',
      name: 'auth.password-reset',
      component: PasswordReset,
    },
    {
      path: '/logout',
      name: 'logout',
      component: Welcome,
      beforeEnter: (to, from, next) => {
        localStorage.removeItem('token')
        localStorage.removeItem('me')
        localStorage.removeItem('locale')
        delete axios.defaults.headers.common['Authorization']
        // router.push({path: '/'});
        window.location = '/'
      }
    },
    {
      path: '/verify-email/:uuid',
      name: 'auth.verify-email',
      component: VerifyEmail,
    },
    {
      path: '/:lang?/matches',
      name: 'matches',
      component: Dashboard,
    },
    {
      path: '/:lang?/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/:lang?/notifications',
      name: 'notifications',
      component: AppNotificationMobile,
    },
    {
      path: '/:lang?/register',
      name: 'register',
      component: RegisterForm,
    },
    {
      path: '/:lang?/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
    },
    {
      path: '/:lang?/matches/:uuid',
      name: 'match',
      component: Match
    },
    {
      path: '/:lang?/tournaments',
      component: TournamentBase,
      children: [
        {
          path: '',
          name: 'tournaments',
          component: TournamentDashboard,
        },
        {
          path: ':slug',
          name: 'tournaments.show',
          component: Tournament,
        }
      ]
    },
    {
      path: '/add-money',
      name: 'add-money',
      component: AddMoney,
      beforeEnter: authMiddleware,
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
      beforeEnter: authMiddleware,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      meta: {layout: 'profile-layout'},
      beforeEnter: authMiddleware,
      children: [
        {
          path: 'game-settings',
          name: 'me.game-settings',
          component: GameSettings,
          meta: {layout: 'profile-layout'},
        },
        {
          path: 'transaction-history',
          name: 'me.transaction-history',
          component: TransactionHistory,
          meta: {layout: 'profile-layout'}
        },
        {
          path: 'gamer-tags',
          name: 'me.gamer-tags',
          component: GamerTags,
          meta: {layout: 'profile-layout'},
        },
        {
          path: 'change-password',
          name: 'me.change-password',
          component: ChangePassword,
          meta: {layout: 'profile-layout'},
        },
        {
          path: 'personal-details',
          name: 'me.personal-details',
          component: PersonalDetails,
          meta: {layout: 'profile-layout'},
        }
      ]
    },
    {
      path: '/users/:uuid',
      name: 'users',
      component: User,
      meta: {layout: 'master-layout'},
    },
    {
      path: '/:lang?',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/:lang?/membership-details',
      name: 'MembershipDetails',
      component: MembershipDetails,
    },
    {
      path: '/:lang?/faq',
      name: 'faq',
      component: Faq,
    },
    {
      path: '/:lang?/about-us',
      name: 'about-us',
      component: AboutUs,
    },
    {
      path: '/:lang?/support',
      name: 'support',
      component: Support,
    },
    {
      path: '/:lang?/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
    },
    {
      path: '/:lang?/rules',
      name: 'rules',
      component: Rules,
    },
    {
      path: '/:lang?/leaders-table',
      name: 'leaders-table',
      component: LeadersTable,
    },
  ]
})

router.beforeEach((to, from, next) => {
  let lang;
  switch (to.params.lang) {
    case 'de':
      lang = 'de-DE'
      break
    case 'tr':
      lang = 'tr-TR'
      break
    default:
      lang = 'en-US'
      break
  }

  i18n.locale = lang
  if (localStorage.getItem('locale')) {
    i18n.locale = localStorage.getItem('locale')
  }

  next();
})

export default router
