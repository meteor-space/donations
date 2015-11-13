Space.domain.Entity.extend(Donations, 'Pledge', {

  STATES: {
    made: `made`,
    accepted: `accepted`,
    fulfilled: `fulfilled`
  },

  Constructor(data) {
    Space.domain.Entity.call(this, data);
    this._state = this.STATES.made;
  },

  accept() {
    this._state = this.STATES.accepted;
  },

  fulfill() {
    if (this._state !== this.STATES.accepted) {
      throw new Donations.PledgeHasToBeAcceptedBeforeFulfilled();
    }
    this._state = this.STATES.fulfilled;
  }
});

Donations.Pledge.type('Donations.Pledge');
