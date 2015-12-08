Space.flux.BlazeComponent.extend(Donations, 'LocationForm', {

  ENTER: 13,

  onRendered() {
    this.$('.country').material_select();
  },

  isCountry(country) {
    return this.location().address.country === country;
  },

  events() {
    return [{
      'keyup .location.form input': this._onInputChange,
      'change .location.form .country': this._onInputChange,
      'click .location.form .submit': this._onSubmit
    }];
  },

  _onSubmit() {},

  _onInputChange() {
    if (event.keyCode === this.ENTER) {
      this._onSubmit();
    }
  },

  _getValues() {
    return {
      name: this.$('.name').val(),
      street: this.$('.street').val(),
      zip: this.$('.zip').val(),
      city: this.$('.city').val(),
      country: this.$('.country.initialized').val(),
      openingHours: this.$('.hours').val()
    };
  }
});
