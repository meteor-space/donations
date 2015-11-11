Space.eventSourcing.Aggregate.extend(Donations, `Location`, {

  FIELDS: {
    name: null,
    organizationId: null,
    address: null,
    contact: null
  },

  commandMap() {
    return {
      'Donations.AddLocation': this._create
    };
  },

  _create(command) {
    this.record(new Donations.LocationAdded(this._eventPropsFromCommand(command)));
  }

});
