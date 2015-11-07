Space.eventSourcing.Aggregate.extend(Donations, 'Organization', {

  FIELDS: {
    name: null,
    country: null,
    contact: null,
  },

  commandMap: function() {
    return {
      'Donations.CreateOrganization': this._createOrganization
    };
  },

  _createOrganization: function(command) {
    this.record(new Donations.OrganizationCreated(this._eventPropsFromCommand(command)));
  }

});
