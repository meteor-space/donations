Space.eventSourcing.Projection.extend(Donations, 'OrgProjection', {

  collections: {
    organizations: 'Donations.Organizations'
  },

  eventSubscriptions() {
    return [{
      'Donations.OrganizationCreated': this._onOrganizationCreated,
      'Donations.LocationAdded': this._onLocationAdded,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged
    }];
  },

  _onOrganizationCreated(event) {
    this.organizations.insert({
      _id: event.sourceId.toString(),
      adminId: event.adminId.toString(),
      name: event.name,
      country: event.country.toString(),
      contact: {
        name: event.contact.name,
        email: event.contact.email.toString(),
        phone: event.contact.phone
      },
      locations: []
    });
  },

  _onLocationAdded(event) {
    this.organizations.update(event.organizationId.toString(), {
      $push: {
        locations: this._getPlainLocationDetails(event)
      }
    });
  },

  _onLocationDetailsChanged(event) {
    let location = {
      _id: event.organizationId.toString(),
      'locations._id': event.sourceId.toString()
    };
    this.organizations.update(location, {
      $set: {
        'locations.$': this._getPlainLocationDetails(event)
      }
    });
  },

  _getPlainLocationDetails(event) {
    return {
      _id: event.sourceId.toString(),
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
