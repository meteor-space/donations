Space.domain.Entity.extend('Donations.Pledge', {

  STATES: {
    'new': 'new',
    accepted: 'accepted',
    declined: 'declined',
    fulfilled: 'fulfilled',
    writtenOff: 'writtenOff'
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
      throw new Donations.InvalidPledgeState('AcceptPledge', this._state);
    }
  },

  throwIfCannotBeDeclined() {
    if (this._state === 'fulfilled') {
      throw new Donations.InvalidPledgeState('DeclinePledge', this._state);
    }
  },

  throwIfCannotBeFulfilled() {
    if (this._state !== 'accepted') {
      throw new Donations.InvalidPledgeState('FulfillPledge', this._state);
    }
  },

  throwIfCannotBeWrittenOff() {
    if (this._state === 'fulfilled') {
      throw new Donations.InvalidPledgeState('WriteOffPledge', this._state);
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

  writeOff() {
    this.throwIfCannotBeWrittenOff();
    this._state = this.STATES.writtenOff;
  }

});