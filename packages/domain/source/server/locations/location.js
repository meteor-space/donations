Space.eventSourcing.Aggregate.extend(Donations, `Location`, {

  fields: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    openingHours: String
  },

  commandMap() {
    return {
      'Donations.AddLocation': this._addLocation,
      'Donations.UpdateLocationDetails': this._updateLocationDetails
    };
  },

  eventMap() {
    return {
      'Donations.LocationAdded': this._onLocationAdded,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged
    };
  },

  // ============= COMMAND HANDLERS =============

  _addLocation(command) {
    this.record(new Donations.LocationAdded(this._eventPropsFromCommand(command)));
  },

  _updateLocationDetails(command) {
    this.record(new Donations.LocationDetailsChanged(
      this._eventPropsFromCommand(command))
    );
  },

  // ============= EVENT HANDLERS =============

  _onLocationAdded(event) {
    this._assignFields(event);
  },

  _onLocationDetailsChanged(event) {
    this._assignFields(event);
  }

});

Donations.Location.registerSnapshotType('Donations.LocationSnapshot');
