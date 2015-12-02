Space.messaging.Api.extend(Donations, 'OrgsApi', {

  dependencies: {
    organizations: 'Donations.Organizations'
  },

  methods() {
    return [{
      'Donations.AddLocation': this._addLocation,
      'Donations.UpdateLocationDetails': this._updateLocationDetails
    }];
  },

  _addLocation(context, command) {
    let locationDetails = this._getPlainLocationDetails(command);
    this.organizations.insert(_.extend(locationDetails, {
      _id: command.targetId.toString()
    }));
  },

  _updateLocationDetails(context, command) {
    this.locations.update(command.targetId.toString(), {
      $set: this._getPlainLocationDetails(command)
    });
  },

  _getPlainLocationDetails(command) {
    return {
      name: command.name,
      address: {
        street: command.address.street,
        zip: command.address.zip,
        city: command.address.city,
        country: command.address.country.toString()
      },
      openingHours: command.openingHours
    };
  }

});
