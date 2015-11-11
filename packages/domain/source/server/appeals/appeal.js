Space.eventSourcing.Aggregate.extend(Donations, `Appeal`, {

  FIELDS: {
    title: null,
    requiredQuantity: null,
    pledgedQuantity: null,
    organizationId: null,
    locationId: null,
    pledges: null,
    description: `` // optional
  },

  STATES: {
    open: `open`,
    fulfilled: `fulfilled`,
    closed: `closed`
  },

  commandMap() {
    return {
      'Donations.MakeAppeal': this._makeAppeal,
      'Donations.MakePledge': this._makePledge,
      'Donations.MarkPledgeAsFulfilled': this._markPledgeAsFulfilled
    };
  },

  eventMap() {
    return {
      'Donations.AppealMade': this._handleNewAppeal,
      'Donations.PledgeMade': this._handleNewPledge,
      'Donations.AppealFulfilled': this._handleAppealFulfilled
    };
  },

  // ============= COMMAND HANDLERS =============

  _makeAppeal(command) {
    this.record(new Donations.AppealMade(this._eventPropsFromCommand(command)));
  },

  _makePledge(command) {
    // Pledges can only be made for open appeals.
    if (this.hasState(this.STATES.fulfilled)) {
      throw new Donations.AppealIsAlreadyFulfilledError();
    }
    // Pledges are capped at the appeal’s required quantity
    quantity = command.quantity;
    newPledgedQuantity = this.pledgedQuantity.add(quantity);
    if (newPledgedQuantity.isMore(this.requiredQuantity)) {
      quantity = quantity.substract(newPledgedQuantity.delta(this.requiredQuantity));
      command.quantity = quantity; // Assign capped quantity
    }
    pledgedQuantity = this.pledgedQuantity.add(quantity);
    this.record(new Donations.PledgeMade(this._eventPropsFromCommand(command)));
    // An appeal is fulfilled when the sum of pledged items equals the required quantity.
    if (pledgedQuantity.equals(this.requiredQuantity)) {
      this.record(new Donations.AppealFulfilled({ sourceId: this.getId() }));
    }
  },

  _markPledgeAsFulfilled(command) {
    this.record(new Donations.PledgeFulfilled(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS =============

  _handleNewAppeal(event) {
    this._state = this.STATES.open;
    this.requiredQuantity = event.requiredQuantity;
    this.pledgedQuantity = new Quantity(0);
    this.pledges = [];
  },

  _handleNewPledge(event) {
    this.pledgedQuantity = this.pledgedQuantity.add(event.quantity);
  },

  _handleAppealFulfilled() {
    this._state = this.STATES.fulfilled;
  }

});
