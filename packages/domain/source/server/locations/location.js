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
    this.record(new Donations.LocationAdded(this._eventPropsFromCommand(command)));
  }

});
