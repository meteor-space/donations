Space.messaging.Api.extend(Donations, 'OrgApi', {

  methods() {
    return [{
      'Donations.AddLocation': this._addLocation,
      'Donations.UpdateLocationDetails': this._updateLocationDetails
    }];
  },

  _addLocation(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to add organisation locations');
    }
    this.commandBus.send(command);
  },

  _updateLocationDetails(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to update location details');
    }
    this.commandBus.send(command);
  }

});
