Donations.LocationForm.extend(Donations, 'EditLocationForm', {

  location() {
    return this.data().location;
  },

  _onSubmit() {
    this.publish(new Donations.EditLocationFormSubmitted(this._getValues()));
  }

});

Donations.EditLocationForm.register('edit_location_form');
