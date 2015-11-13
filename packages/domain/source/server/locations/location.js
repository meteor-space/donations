Space.eventSourcing.Aggregate.extend(Donations, `Location`, {

  Fields: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    contact: Donations.Contact
  },

  commandMap() {
    return {
      'Donations.AddLocation': this._addLocation
    };
  },

  eventMap() {
    return {
      'Donations.LocationAdded': this._onLocationAdded
    };
  },

  // ============= COMMAND HANDLERS =============

  _addLocation(command) {
    this.record(new Donations.LocationAdded(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS =============

  _onLocationAdded(event) {
    this._assignFields(event);
  }

});

Donations.Location.registerSnapshotType('Donations.LocationSnapshot');
