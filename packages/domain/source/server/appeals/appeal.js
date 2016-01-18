Space.eventSourcing.Aggregate.extend('Donations.Appeal', {

  STATES: {
    draft: `draft`,
    cancelled: `cancelled`,
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
      'Donations.DraftAppeal': this._draftAppeal,
      'Donations.UpdateAppealDraft': this._updateAppealDraft,
      'Donations.CancelAppeal': this._cancelAppeal,
      'Donations.MakeAppeal': this._makeAppeal,
      'Donations.UpdateAppeal': this._updateAppeal,
      'Donations.MakePledge': this._makePledge,
      'Donations.AcceptPledge': this._acceptPledge,
      'Donations.DeclinePledge': this._declinePledge,
      'Donations.FulfillPledge': this._fulfillPledge,
      'Donations.WriteOffPledge': this._writeOffPledge,
      'Donations.CloseAppeal': this._closeAppeal
    };
  },

  eventMap() {
    return {
      'Donations.AppealDrafted': this._onAppealDrafted,
      'Donations.AppealDraftUpdated': this._onAppealDraftUpdated,
      'Donations.AppealCancelled': this._onAppealCancelled,
      'Donations.AppealMade': this._onAppealMade,
      'Donations.AppealUpdated': this._onAppealUpdated,
      'Donations.PledgeMade': this._onPledgeMade,
      'Donations.PledgeAccepted': this._onPledgeAccepted,
      'Donations.PledgeDeclined': this._onPledgeDeclined,
      'Donations.PledgeFulfilled': this._onPledgeFulfilled,
      'Donations.PledgeWrittenOff': this._onPledgeWrittenOff,
      'Donations.AppealFulfilled': this._onAppealFulfilled,
      'Donations.AppealClosed': this._onAppealClosed
    };
  },

  // ============= COMMAND HANDLERS =============

  _draftAppeal(command) {
    this.record(new Donations.AppealDrafted(this._eventPropsFromCommand(command)));
  },

  _updateAppealDraft(command) {
    if (!this.hasState(this.STATES.draft)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    this.record(new Donations.AppealDraftUpdated(
      this._eventPropsFromCommand(command)
    ));
  },

  _cancelAppeal(command) {
    if (!this.hasState(this.STATES.draft)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    this.record(new Donations.AppealCancelled({
      sourceId: this.getId(),
      title: this.title,
      requiredQuantity: this.requiredQuantity,
      organizationId: this.organizationId,
      locationId: this.locationId,
      description: this.description
    }));
  },

  _makeAppeal(command) {
    if (!this.hasState(this.STATES.draft)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    this.record(new Donations.AppealMade({
      sourceId: this.getId(),
      title: this.title,
      requiredQuantity: this.requiredQuantity,
      organizationId: this.organizationId,
      locationId: this.locationId,
      description: this.description
    }));
  },

  _updateAppeal(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    this.record(new Donations.AppealUpdated(
      this._eventPropsFromCommand(command)
    ));
  },

  _makePledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
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
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    let pledge = this._getPledgeById(command.id);
    pledge.throwIfCannotBeAccepted();
    this.record(new Donations.PledgeAccepted(_.extend({ sourceId: this.getId() },
      pledge.toPlainObject()
    )));
  },

  _declinePledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    let pledge = this._getPledgeById(command.id);
    pledge.throwIfCannotBeDeclined();
    this.record(new Donations.PledgeDeclined(_.extend({ sourceId: this.getId() },
      pledge.toPlainObject()
    )));
  },

  _fulfillPledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    let pledge = this._getPledgeById(command.id);
    pledge.throwIfCannotBeFulfilled();
    this.record(new Donations.PledgeFulfilled(_.extend({ sourceId: this.getId() },
      this._getPledgeById(command.id).toPlainObject()
    )));
  },

  _writeOffPledge(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    let pledge = this._getPledgeById(command.id);
    pledge.throwIfCannotBeWrittenOff();
    this.record(new Donations.PledgeWrittenOff(_.extend({ sourceId: this.getId() },
      this._getPledgeById(command.id).toPlainObject()
    )));
  },

  _closeAppeal(command) {
    if (!this.hasState(this.STATES.open)) {
      throw new Donations.InvalidAppealState(command.toString(), this._state);
    }
    this.record(new Donations.AppealClosed({
      sourceId: this.getId(),
      title: this.title,
      requiredQuantity: this.requiredQuantity,
      organizationId: this.organizationId,
      locationId: this.locationId,
      description: this.description
    }));
  },

  // ============= EVENT HANDLERS =============

  _onAppealDrafted(event) {
    this._assignFields(event);
    this.pledgedQuantity = new Quantity(0);
    this.pledges = [];
    this._state = this.STATES.draft;
  },

  _onAppealDraftUpdated(event) {
    this._assignFields(event);
  },

  _onAppealCancelled() {
    this._state = this.STATES.cancelled;
  },

  _onAppealMade() {
    this._state = this.STATES.open;
  },

  _onAppealUpdated(event) {
    this._assignFields(event);
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

  _onPledgeWrittenOff(event) {
    this._getPledgeById(event.id).writeOff();
  },

  _onAppealClosed() {
    this._state = this.STATES.closed;
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
