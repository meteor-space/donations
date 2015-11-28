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
    this.send(new Donations.AddLocationToOrganization({
      targetId: new Guid(this.orgsStore.adminOrg()._id),
      locationName: event.locationName,
      address: event.address,
      openingHours: event.openingHours
    }));
  }

});
