Space.eventSourcing.Aggregate.extend(Donations, `Organization`, {

  FIELDS: {
    name: null,
    country: null,
    contact: null
  },

  commandMap() {
    return {
      'Donations.CreateOrganization': this._createOrganization
    };
  },

  _createOrganization(command) {
    this.record(new Donations.OrganizationCreated(this._eventPropsFromCommand(command)));
  }

});
