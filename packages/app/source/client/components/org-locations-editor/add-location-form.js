Space.flux.BlazeComponent.extend(Donations, 'AddLocationForm', {

  dependencies: {
    store: 'Donations.AddLocationFormStore'
  },

  state() {
    return this.store;
  },

  isCountry(country) {
    return this.store.country() === country ? true : false;
  },

  events() {
    return [{
      'keyup input': this._onInputChange,
      'change .country': this._onInputChange,
      'click .submit': this._onSubmit
    }];
  },

  _onInputChange() {
    this.publish(new Donations.AddOrgLocationFormInputsChanged(this._getValues()));
  },

  _onSubmit() {
    this.publish(new Donations.AddOrgLocationFormSubmitted(this._getValues()));
  },

  _getValues() {
    return {
      name: this.$('.name').val(),
      street: this.$('.street').val(),
      zip: this.$('.zip').val(),
      city: this.$('.city').val(),
      country: this.$('.country').val(),
      openingHours: this.$('.hours').val()
    };
  }
});

Donations.AddLocationForm.register('add_location_form');
