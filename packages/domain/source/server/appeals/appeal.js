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
      'Donations.DeclinePledge': this._declinePledge,
      'Donations.FulfillPledge': this._fulfillPledge
    };
  },

  eventMap() {
    return {
      'Donations.AppealMade': this._onAppealMade,
      'Donations.PledgeMade': this._onPledgeMade,
      'Donations.PledgeAccepted': this._onPledgeAccepted,
      'Donations.PledgeDeclined': this._onPledgeDeclined,
      'Donations.PledgeFulfilled': this._onPledgeFulfilled,
      'Donations.AppealFulfilled': this._onAppealFulfilled
    };
  },

  // ============= COMMAND HANDLERS =============

  _makeAppeal(command) {
    this.record(new Donations.AppealMade(this._eventPropsFromCommand(command)));
  },

  _makePledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.AppealNotOpenForNewPledges();
    }
    // Pledged quantity is capped at the appeal’s required quantity
    let quantity = command.quantity;
    let newPledgedQuantity = this.pledgedQuantity.add(quantity);
    if (newPledgedQuantity.isMore(this.requiredQuantity)) {
      quantity = quantity.substract(newPledgedQuantity.delta(this.requiredQuantity));
      command.quantity = quantity; // Assign capped quantity
    }
    let pledgedQuantity = this.pledgedQuantity.add(quantity);
    this.record(new Donations.PledgeMade(this._eventPropsFromCommand(command)));
    // Fulfilled when the sum of pledged items equals the required quantity.
    if (pledgedQuantity.equals(this.requiredQuantity)) {
      this.record(new Donations.AppealFulfilled({
        sourceId: this.getId(),
        title: this.title,
        requiredQuantity: this.requiredQuantity,
        organizationId: this.organizationId,
        locationId: this.locationId,
        description: this.description
      }));
    }
  },

  _acceptPledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.AppealNotOpenToAcceptPledge();
    }
    this.record(new Donations.PledgeAccepted(_.extend({ sourceId: this.getId() },
      this._getPledgeById(command.id).toPlainObject()
    )));

  },

  _declinePledge(command) {
    this.record(new Donations.PledgeDeclined(_.extend({ sourceId: this.getId() },
      this._getPledgeById(command.id).toPlainObject()
    )));
  },

  _fulfillPledge(command) {
    this.record(new Donations.PledgeFulfilled(_.extend({ sourceId: this.getId() },
      this._getPledgeById(command.id).toPlainObject()
    )));
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
    this.pledges.push(new Donations.Pledge({
      id: event.id,
      donor: event.donor,
      quantity: event.quantity
    }));
  },

  _onAppealFulfilled() {
    this._state = this.STATES.fulfilled;
  },

  _onPledgeAccepted(event) {
    this._getPledgeById(event.id).accept();
  },

  _onPledgeDeclined(event) {
    this._getPledgeById(event.id).decline();
  },

  _onPledgeFulfilled(event) {
    this._getPledgeById(event.id).fulfill();
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
