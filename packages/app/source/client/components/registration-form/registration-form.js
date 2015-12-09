Space.flux.BlazeComponent.extend(Donations, 'OrgRegistrationForm', {

  ENTER: 13,
  _session: 'Donations.OrgRegistrationForm',

  // Initialize the materialize select dropdown
  onRendered() {
    this.$('.org-country').material_select();
  },

  sessionVars() {
    return [{
      // The form values we want to survive hot-code-pushes
      orgName: '',
      orgCountry: '',
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    }];
  },

  reactiveVars() {
    return [{
      password: '', // We don't want passwords in our session vars
      error: null // Client-side errors
    }];
  },

  state() {
    return this.store;
  },

  isCountry(country) {
    return this.orgCountry() === country ? true : false;
  },

  events() {
    return [{
      'keyup input': this._onInputChange,
      'change .org-country': this._onInputChange,
      'click .submit': this._onSubmit
    }];
  },

  _onInputChange(event) {
    // Submit on ENTER key
    if (event.keyCode === this.ENTER) return this._onSubmit(event);
    // Otherwise save changed form values into session dict
    let values = this._getValues();
    for (key in values) {
      if (key !== 'password') this._setSessionVar(key, values[key]);
    }
    this._setReactiveVar('password', values.password);
  },

  _onSubmit(event) {
    event.preventDefault();
    let values = this._getValues();
    if (this._noValueIsEmpty(values)) {
      this.publish(new Donations.OrgRegistrationFormSubmitted(values));
      this.$('.submit').attr('disabled', true);
      this._resetForm();
    } else {
      this._setReactiveVar('error', __('register.error'));
      this.$('.submit').attr('disabled', false);
    }
  },

  _getValues() {
    return {
      orgName: this.$('.org-name').val(),
      orgCountry: this.$('.org-country.initialized').val(),
      contactEmail: this.$('.contact-email').val(),
      contactName: this.$('.contact-name').val(),
      contactPhone: this.$('.contact-phone').val(),
      password: this.$('.password').val()
    };
  },

  _noValueIsEmpty(values) {
    for (key in values) {
      if (values[key] === '') return false;
    }
    return true;
  },

  _resetForm() {
    for (key in this._getValues()) {
      if (key === 'password') {
        this._setReactiveVar(key, '');
      } else {
        this._setSessionVar(key, '');
      }
    }
  }

});

Donations.OrgRegistrationForm.register('registration_form');
