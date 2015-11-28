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
      'Donations.AddOrgLocationFormSubmitted': this._onAddOrgLocationFormSubmitted
    }];
  },

  _onAddOrgLocationFormSubmitted(event) {
    this.send(new Donations.AddLocation({
      targetId: new Guid(),
      name: event.name,
      organizationId: new Guid(this.orgsStore.adminOrg()._id),
      address: new Donations.Address({
        country: new Country(event.country),
        zip: event.zip,
        city: event.city,
        street: event.street
      }),
      openingHours: event.openingHours
    }));
  }

});
