Space.messaging.Api.extend('Donations.OrgApi', {

  methods() {
    return [{
      'Donations.AddLocation': this._addLocation,
      'Donations.UpdateLocationDetails': this._updateLocationDetails
    }];
  },

  _addLocation(context, command) {
    this.commandBus.send(command);
  },

  _updateLocationDetails(context, command) {
    this.commandBus.send(command);
  }

});
