import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  'en-US': require('./en-US'),
  'de-DE': require('./de-DE'),
  'tr-TR': require('./tr-TR'),
}

const dateTimeFormats = {
  'en-US': {
    short: {
      month: 'short', day: 'numeric'
    },
    middle: {
      month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
    },
    long: {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: 'numeric',
    },
    justdate: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    justhour: {
      hour: 'numeric', minute: 'numeric',
    },
    countdown: {
      month: 'long', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false
    }
  },
  'de-DE': {
    short: {
      month: 'short', day: 'numeric',
    },
    long: {
      month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
    },
    justdate: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    justhour: {
      hour: 'numeric', minute: 'numeric',
    },
    minutes: {
      minute: 'numeric', second: 'numeric'
    }
  },
  'tr-TR': {
    short: {
      month: 'short', day: 'numeric',
    },
    middle: {
      month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
    },
    justdate: {
      year: 'numeric', month: 'short', day: 'numeric',
    },
    justhour: {
      hour: 'numeric', minute: 'numeric',
    },
    minutes: {
      minute: 'numeric', second: 'numeric'
    }
  },
}

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
    }
  },
  'de-DE': {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
    }
  },
  'tr-TR': {
    currency: {
      style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
    }
  }
}

VueI18n.prototype.getChoiceIndex = function (choice, choicesLength) {
  if (choice > 4) {
    return 4
  }

  return choice;
}

export default new VueI18n({
  locale: 'tr-TR',
  messages,
  dateTimeFormats,
  numberFormats,
  silentTranslationWarn: true,
  missing(lang, key) {
    if (!key) {
      return
    }
    // return inflection.titleize(key.replace(/^\w+\./, ''))
  },
})
