Space.flux.BlazeComponent.extend(Donations, 'OrgRegistrationForm', {

  ENTER: 13,

  dependencies: {
    store: 'Donations.OrgRegistrationsStore'
  },

  state() {
    return this.store;
  },

  isCountry(country) {
    return this.store.orgCountry() === country ? true : false;
  },

  events() {
    return [{
      'keyup input': this._onInputChange,
      'change .org-country': this._onInputChange,
      'click .submit': this._onSubmit
    }];
  },

  _onInputChange(event) {
    if (event.keyCode === this.ENTER) {
      this._onSubmit(event)
    }
    this.publish(new Donations.OrgRegistrationInputsChanged({
      orgName: this.$('.org-name').val(),
      orgCountry: this.$('.org-country option:selected').val(),
      contactEmail: this.$('.contact-email').val(),
      contactName: this.$('.contact-name').val(),
      contactPhone: this.$('.contact-phone').val(),
      password: this.$('.password').val()
    }));
  },

  _onSubmit(event) {
    event.preventDefault();
    this.publish(new Donations.OrgRegistrationFormSubmitted());
  }
});

Donations.OrgRegistrationForm.register('registration_form');
