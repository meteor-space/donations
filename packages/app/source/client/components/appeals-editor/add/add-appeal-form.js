Donations.AppealForm.extend(Donations, 'AddAppealForm', {

  _session: 'Donations.AddAppealForm',

  sessionVars() {
    return [{
      title: null,
      quantity: null,
      description: null
    }];
  },

  appeal() {
    return {
      title: this.title(),
      quantity: this.quantity(),
      description: this.description()
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
    this.publish(new Donations.AddAppealFormSubmitted(this._getValues()));
  }

});

Donations.AddAppealForm.register('add_appeal_form');
