Donations.LocationForm.extend('Donations.EditLocationForm', {

  location() {
    return this.data().location;
  },

  _onSubmit() {
    let data = _.extend(this._getValues(), {
      locationId: this.location()._id
    });
    this.publish(new Donations.EditLocationFormSubmitted(data));
  }

});

Donations.EditLocationForm.register('edit_location_form');
