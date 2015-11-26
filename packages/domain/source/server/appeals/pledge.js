Space.domain.Entity.extend(Donations, 'Pledge', {

  STATES: {
    new: `new`,
    accepted: `accepted`,
    declined: `declined`,
    fulfilled: `fulfilled`,
    reneged: 'reneged'
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

  throwIfCannotBeAccepted() {
    if (this._state === 'fulfilled') {
      throw new Donations.FulfilledPledgeCannotBeAccepted();
    }
  },

  throwIfCannotBeDeclined() {
    if (this._state === 'fulfilled') {
      throw new Donations.FulfilledPledgeCannotBeDeclined();
    }
  },

  throwIfCannotBeFulfilled() {
    if (this._state !== 'accepted') {
      throw new Donations.PledgeHasToBeAcceptedBeforeFulfilled();
    }
  },

  throwIfCannotBeReneged() {
    if (this._state === 'fulfilled') {
      throw new Donations.FulfilledPledgeCannotBeReneged();
    }
  },

  accept() {
    this.throwIfCannotBeAccepted();
    this._state = this.STATES.accepted;
  },

  decline() {
    this.throwIfCannotBeDeclined();
    this._state = this.STATES.declined;
  },

  fulfill() {
    this.throwIfCannotBeFulfilled();
    this._state = this.STATES.fulfilled;
  },

  reneg() {
    this.throwIfCannotBeReneged();
    this._state = this.STATES.reneged;
  }

});

Donations.Pledge.type('Donations.Pledge');
