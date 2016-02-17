Space.eventSourcing.Aggregate.extend(Donations, `Organization`, {

  fields: {
    adminId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  commandMap() {
    return {
      'Donations.CreateOrganization': this._createOrganization,
      'Donations.AddLocation': this._addLocation,
      'Donations.UpdateLocationDetails': this._updateLocationDetails
    };
  },

  eventMap() {
    return {
      'Donations.OrganizationCreated': this._onOrganizationCreated,
      'Donations.LocationAdded': this._onLocationAdded,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged
    };
  },

  // ============= COMMAND HANDLERS =============

  _createOrganization(command) {
    this.record(new Donations.OrganizationCreated(
      this._eventPropsFromCommand(command))
    );
  },

  _addLocation(command) {
    this.record(new Donations.LocationAdded(
      this._eventPropsFromCommand(command))
    );
  },

  _updateLocationDetails(command) {
    this.record(new Donations.LocationDetailsChanged(
      this._eventPropsFromCommand(command)
    ));
  },

  // ============= EVENT HANDLERS =============

  _onOrganizationCreated(event) { this._assignFields(event); },

  // No-ops until locations have more than CRUD functionality
  _onLocationAdded() {},
  _onLocationDetailsChanged() {}

});

Donations.Organization.registerSnapshotType('Donations.OrganizationSnapshot');
