Space.domain.Entity.extend(Donations, 'Pledge', {

  STATES: {
    made: `made`,
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
    this._state = this.STATES.made;
  },

  accept() {
    this._state = this.STATES.accepted;
  },

  decline() {
    if (this._state === this.STATES.fulfilled) {
      throw new Donations.PledgeCannotBeDeclinedIfFulfilled();
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
