Space.messaging.Api.extend(Donations, 'OrgLocationsApi', {

  methods() {
    return [{
      'Donations.AddLocation': this._addLocation
    }];
  },

  _addLocation(context, command) {
    this.commandBus.send(command);
  }

});
