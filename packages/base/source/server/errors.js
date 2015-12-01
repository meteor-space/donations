Space.Error.extend(Donations, `InvalidAppealState`, {
  Constructor(commandName, currentState) {
    Space.Error.constructor.call(this);
    this.message = `Cannot ${commandName} when in ${currentState} state`;
  }
});

Space.Error.extend(Donations, `InvalidPledgeState`, {
  Constructor(commandName, currentState) {
    Space.Error.constructor.call(this);
    this.message = `Cannot ${commandName} when in ${currentState} state`;
  }
});

Space.Error.extend(Donations, `PledgeNotFoundError`, {
  Constructor(pledgeId) {
    Space.Error.constructor.call(this);
    this.message = `No pledge with id ${pledgeId} found.`;
  }
});
