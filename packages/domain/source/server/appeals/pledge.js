Space.domain.Entity.extend(Donations, 'Pledge', {

  STATES: {
    new: `new`,
    accepted: `accepted`,
    declined: `declined`,
    fulfilled: `fulfilled`
  },

  fields() {
    return {
      id: Guid,
      donor: Donations.Contact,
      quantity: Quantity
    };
  },

  Constructor(data) {
    Space.domain.Entity.call(this, data);
    this._state = this.STATES.new;
  },

  accept() {
    if (this._state === this.STATES.fulfilled) {
      throw new Donations.FulfilledPledgeCannotBeAccepted();
    }
    this._state = this.STATES.accepted;
  },

  decline() {
    if (this._state === this.STATES.fulfilled) {
      throw new Donations.FulfilledPledgeCannotBeDeclined();
    }
    this._state = this.STATES.declined;
  },

  fulfill() {
    if (this._state !== this.STATES.accepted) {
      throw new Donations.PledgeHasToBeAcceptedBeforeFulfilled();
    }
    this._state = this.STATES.fulfilled;
  }

});

Donations.Pledge.type('Donations.Pledge');
