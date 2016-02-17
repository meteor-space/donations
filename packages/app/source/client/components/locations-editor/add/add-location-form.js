Donations.LocationForm.extend('Donations.AddLocationForm', {

  _session: 'Donations.AddLocationForm',

  sessionVars() {
    return [{
      name: null,
      street: null,
      zip: null,
      city: null,
      country: null,
      openingHours: null
    }];
  },

  location() {
    return {
      name: this.name(),
      address: {
        street: this.street(),
        zip: this.zip(),
        city: this.city(),
        country: this.country()
      },
      openingHours: this.openingHours
    };
  },

  _onInputChange() {
    let values = this._getValues();
    for (key in values) {
      if (values.hasOwnProperty(key)) {
        this._setSessionVar(key, values[key]);
      }
    }
  },

  _onSubmit() {
    this.publish(new Donations.AddOrgLocationFormSubmitted(this._getValues()));
    this._resetForm();
  },

  _resetForm() {
    for (let key in this._session.keys) {
      if (this._session.keys.hasOwnProperty(key)) {
        this._setSessionVar(key, '');
      }
    }
  }

});

Donations.AddLocationForm.register('add_location_form');
