Space.Object.extend(Donations, 'OrgsController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.CommandSending
  ],

  dependencies: {
    orgsStore: 'Donations.OrgsStore'
  },

  eventSubscriptions() {
    return [{
      'Donations.AddOrgLocationFormSubmitted': this._onAddOrgLocationFormSubmitted,
      'Donations.EditLocationFormSubmitted': this._onEditLocationFormSubmitted
    }];
  },

  _onAddOrgLocationFormSubmitted(event) {
    this.send(new Donations.AddLocation({
      targetId: this._getOrgId(),
      name: event.name,
      locationId: new Guid(),
      address: this._generateAddressFromUiEvent(event),
      openingHours: event.openingHours
    }));
  },

  _onEditLocationFormSubmitted(event) {
    this.send(new Donations.UpdateLocationDetails({
      targetId: this._getOrgId(),
      locationId: new Guid(event.locationId),
      name: event.name,
      address: this._generateAddressFromUiEvent(event),
      openingHours: event.openingHours
    }));
  },

  _generateAddressFromUiEvent(event) {
    return new Donations.Address({
      country: new Country(event.country),
      zip: event.zip,
      city: event.city,
      street: event.street
    });
  },

  _getOrgId() {
    return new Guid(this.orgsStore.adminOrg()._id);
  }

});
