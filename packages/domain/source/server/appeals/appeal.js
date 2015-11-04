Space.eventSourcing.Aggregate.extend(Donations, 'Appeal', {

  FIELDS: {
    title: null,
    amount: 0,
    organizationId: null,
    locationId: null,
    description: '' // optional
  },

  commandMap: function() {
    return {
      'Donations.MakeAppeal': this._makeAppeal
    };
  },

  _makeAppeal: function(command) {
    this.record(new Donations.AppealMade({
      sourceId: this.getId(),
      title: command.title,
      quantity: command.quantity,
      organizationId: command.organizationId,
      locationId: command.locationId,
      description: command.description
    }));
  }

});
