Space.Error.extend('Donations.InvalidAppealState', {
  Constructor(commandName, currentState) {
    Space.Error.call(this, `Cannot ${commandName} when in ${currentState} state`);
  }
});

Space.Error.extend('Donations.InvalidPledgeState', {
  Constructor(commandName, currentState) {
    Space.Error.call(this, `Cannot ${commandName} when in ${currentState} state`);
  }
});

Space.Error.extend('Donations.PledgeNotFoundError', {
  Constructor(pledgeId) {
    Space.Error.call(this, `No pledge with id ${pledgeId} found.`);
  }
});
