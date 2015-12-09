Space.eventSourcing.Projection.extend(Donations, 'LocationsProjection', {

  collections: {
    locations: 'Donations.Locations'
  },

  eventSubscriptions() {
    return [{
      'Donations.LocationAdded': this._onLocationAdded,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged
    }];
  },

  _onLocationAdded(event) {
    this.locations.insert(_.extend(this._getPlainLocationDetails(event), {
      _id: event.locationId.toString(),
      organizationId: event.sourceId.toString()
    }));
  },

  _onLocationDetailsChanged(event) {
    this.locations.update(event.locationId.toString(), {
      $set: this._getPlainLocationDetails(event)
    });
  },

  _getPlainLocationDetails(event) {
    return {
      name: event.name,
      address: {
        street: event.address.street,
        zip: event.address.zip,
        city: event.address.city,
        country: event.address.country.toString()
      },
      openingHours: event.openingHours
    };
  }

});
