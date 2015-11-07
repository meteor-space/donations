Space.eventSourcing.Aggregate.extend(Donations, 'Appeal', {

  FIELDS: {
    title: null,
    requiredQuantity: 0,
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
    this.record(new Donations.AppealMade(this._eventPropsFromCommand(command)));
  },
  }

});
