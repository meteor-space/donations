Space.flux.Store.extend(Donations, 'AddLocationFormStore', {

  _session: 'Donations.AddLocationFormStore',

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

  eventSubscriptions() {
    return [{
      'Donations.AddOrgLocationFormInputsChanged': this._onAddOrgLocationFormInputsChanged
    }];
  },

  _onAddOrgLocationFormInputsChanged(event) {
    let cleanedEventProps = _.omit(event, 'timestamp', 'eventVersion', 'version');
    for (key in cleanedEventProps.fields()) {
      if (cleanedEventProps.hasOwnProperty(key)) {
        this._setSessionVar(key, event[key]);
      }
    }
  }

});
