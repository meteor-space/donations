Donations.AppealForm.extend(Donations, 'AddAppealForm', {

  _session: 'Donations.AddAppealForm',

  sessionVars() {
    return [{
      title: null,
      requiredQuantity: null,
      description: null
    }];
  },

  appeal() {
    return {
      title: this.title(),
      requiredQuantity: this.requiredQuantity(),
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

Donations.AddAppealForm.register('add_appeal_form');
