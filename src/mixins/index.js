export const ValidationMixins = {
  data() {
    return {
      formErrors: []
    }
  },
  computed: {
    validationErrors() {
      return (el, base = null) => {
        const v = base ? this.$v[base][el] : this.$v[el]
        const label = this.$t('inputs.' + el)
        const errors = []

        if (this.getFormErrors(el)) {
          this.$v.$touch()
          return this.getFormErrors(el)
        }

        if (!v.$dirty) {
          return []
        }

        const validators = v.$params

        for (let validator in validators) {
          if (!v[validator]) {
            let params = {label}
            if (Object.keys(v.$params[validator]).length > 1) {
              Object.assign(params, v.$params[validator])
            }

            errors.push(this.$t('validations.' + validator, params))
          }
        }

        return errors
      }
    },
    getFormErrors() {
      return (el) => {
        const error = this.formErrors.find((n) => (n.field === el))
        return error ? error.message : ''
      }
    }
  },
  methods: {
    isValid() {
      this.formErrors = []
      this.$v.$touch()

      return !this.$v.$invalid;
    }
  }
}
