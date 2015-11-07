Space.eventSourcing.Aggregate.extend(Donations, 'Appeal', {

  FIELDS: {
    title: null,
    requiredQuantity: null,
    pledgedQuantity: null,
    organizationId: null,
    locationId: null,
    pledges: null,
    description: '' // optional
  },

  commandMap: function() {
    return {
      'Donations.MakeAppeal': this._makeAppeal,
      'Donations.MakePledge': this._makePledge
    };
  },

  eventMap: function() {
    return {
      'Donations.AppealMade': this._handleNewAppeal,
      'Donations.PledgeMade': this._handleNewPledge
    };
  },

  // ============= COMMAND HANDLERS =============

  _makeAppeal: function(command) {
    this.record(new Donations.AppealMade(this._eventPropsFromCommand(command)));
  },

  _makePledge: function(command) {
    newPledgedQuantity = this.pledgedQuantity.add(command.quantity);
    this.record(new Donations.PledgeMade(this._eventPropsFromCommand(command)));
    if(newPledgedQuantity.equals(this.requiredQuantity)) {
      this.record(new Donations.AppealSuccessful({ sourceId: this.getId() }));
    }
  },

  // ============= EVENT HANDLERS =============

  _handleNewAppeal: function(event) {
    this.requiredQuantity = event.requiredQuantity;
    this.pledgedQuantity = new Quantity(0);
    this.pledges = [];
  },

  _handleNewPledge: function(event) {
    this.pledgedQuantity = this.pledgedQuantity.add(event.quantity);
  }

});
