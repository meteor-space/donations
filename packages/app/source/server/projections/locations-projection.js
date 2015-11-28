Space.eventSourcing.Projection.extend(Donations, 'LocationsProjection', {

  collections: {
    locations: 'Donations.Locations'
  },

  eventSubscriptions() {
    return [{
      'Donations.LocationAdded': this._onLocationAdded
    }];
  },

  _onLocationAdded(event) {
    this.locations.insert({
      _id: event.sourceId.toString(),
      name: event.name,
      organizationId: event.organizationId.toString(),
      address: {
        street: event.address.street,
        zip: event.address.zip,
        city: event.address.city,
        country: event.address.country.toString()
      },
      openingHours: event.openingHours
    });
  }

});
