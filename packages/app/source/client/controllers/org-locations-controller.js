Space.Object.extend(Donations, 'OrgLocationsController', {

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
      targetId: new Guid(),
      name: event.name,
      organizationId: new Guid(this.orgsStore.adminOrg()._id),
      address: this._generateAddressFromUiEvent(event),
      openingHours: event.openingHours
    }));
  },

  _onEditLocationFormSubmitted(event) {
    this.send(new Donations.UpdateLocationDetails({
      targetId: new Guid(event.locationId),
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
  }

});
