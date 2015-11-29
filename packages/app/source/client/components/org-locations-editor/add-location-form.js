Donations.LocationForm.extend(Donations, 'AddLocationForm', {

  dependencies: {
    store: 'Donations.AddLocationFormStore'
  },

  state() {
    return this.store;
  },

  _onInputChange() {
    this.publish(new Donations.AddOrgLocationFormInputsChanged(this._getValues()));
  },

  _onSubmit() {
    this.publish(new Donations.AddOrgLocationFormSubmitted(this._getValues()));
  }

});

Donations.AddLocationForm.register('add_location_form');
