Space.eventSourcing.Aggregate.extend(Donations, `Organization`, {

  Fields: {
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  commandMap() {
    return {
      'Donations.CreateOrganization': this._createOrganization
    };
  },

  eventMap() {
    return {
      'Donations.OrganizationCreated': this._onOrganizationCreated
    };
  },

  _createOrganization(command) {
    this.record(new Donations.OrganizationCreated(this._eventPropsFromCommand(command)));
  },

  _onOrganizationCreated(event) {
    this._assignFields(event);
  }

});

Donations.Organization.registerSnapshotType('Donations.OrganizationSnapshot');
