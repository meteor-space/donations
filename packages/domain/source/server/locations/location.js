Space.eventSourcing.Aggregate.extend(Donations, 'Location', {

  FIELDS: {
    name: null,
    organizationId: null,
    address: null,
    contact: null
  },

  commandMap: function() {
    return {
      'Donations.AddLocation': this._create
    };
  },

  _create: function(command) {
    this.record(new Donations.LocationAdded({
      sourceId: this.getId(),
      name: command.name,
      organizationId: command.organizationId,
      address: command.address,
      contact: command.contact,
    }));
  }

});
