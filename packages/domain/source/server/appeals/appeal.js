Space.eventSourcing.Aggregate.extend(Donations, `Appeal`, {

  STATES: {
    open: `open`,
    fulfilled: `fulfilled`,
    closed: `closed`
  },

  fields: {
    title: String,
    requiredQuantity: Quantity,
    pledgedQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    pledges: [Donations.Pledge],
    description: String // optional
  },

  commandMap() {
    return {
      'Donations.MakeAppeal': this._makeAppeal,
      'Donations.MakePledge': this._makePledge,
      'Donations.AcceptPledge': this._acceptPledge,
      'Donations.FulfillPledge': this._fulfillPledge
    };
  },

  eventMap() {
    return {
      'Donations.AppealMade': this._onAppealMade,
      'Donations.PledgeMade': this._onPledgeMade,
      'Donations.AppealFulfilled': this._onAppealFulfilled,
      'Donations.PledgeAccepted': this._onPledgeAccepted,
      'Donations.PledgeFulfilled': this._onPledgeFulfilled
    };
  },

  // ============= COMMAND HANDLERS =============

  _makeAppeal(command) {
    this.record(new Donations.AppealMade(this._eventPropsFromCommand(command)));
  },

  _makePledge(command) {
    // Pledges can only be made for open appeals.
    if (this.hasState(this.STATES.fulfilled)) {
      throw new Donations.PledgeCannotBeMadeToFulfilledAppeal();
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

  _acceptPledge(command) {
    this.record(new Donations.PledgeAccepted(this._eventPropsFromCommand(command)));
  },

  _fulfillPledge(command) {
    this.record(new Donations.PledgeFulfilled(this._eventPropsFromCommand(command)));
  },

  // ============= EVENT HANDLERS =============

  _onAppealMade(event) {
    this._assignFields(event);
    this.pledgedQuantity = new Quantity(0);
    this.pledges = [];
    this._state = this.STATES.open;
  },

  _onPledgeMade(event) {
    this.pledgedQuantity = this.pledgedQuantity.add(event.quantity);
    this.pledges.push(new Donations.Pledge(event.pledgeId));
  },

  _onAppealFulfilled() {
    this._state = this.STATES.fulfilled;
  },

  _onPledgeAccepted(event) {
    this._getPledgeById(event.pledgeId).accept();
  },

  _onPledgeFulfilled(event) {
    this._getPledgeById(event.pledgeId).fulfill();
  },

  // =========== PRIVATE HELPERS ===========

  _getPledgeById(id) {
    let foundPledge = null;
    for (let pledge of this.pledges) {
      if (pledge.getId().equals(id)) {
        foundPledge = pledge;
      }
    }
    if (foundPledge === null) {
      throw new Donations.PledgeNotFoundError(id);
    }
    return foundPledge;
  }

});

Donations.Appeal.registerSnapshotType('Donations.AppealSnapshot');
