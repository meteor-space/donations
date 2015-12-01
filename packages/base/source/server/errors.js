Space.Error.extend(Donations, `InvalidAppealState`, {
  Constructor(commandName, currentState) {
    Space.Error.constructor.call(this);
    this.message = `Cannot ${commandName} when in ${currentState} state`;
  }
});

Space.Error.extend(Donations, `PledgeHasToBeAcceptedBeforeFulfilled`, {
  message: `Pledge has to be accepted before it can be fulfilled.`
});

Space.Error.extend(Donations, `PledgeNotFoundError`, {
  Constructor(pledgeId) {
    Space.Error.constructor.call(this);
    this.message = `No pledge with id ${pledgeId} found.`;
  }
});

Space.Error.extend(Donations, `FulfilledPledgeCannotBeAccepted`, {
  message: `Fulfilled pledge cannot be accepted`
});

Space.Error.extend(Donations, `FulfilledPledgeCannotBeDeclined`, {
  message: `Fulfilled pledge cannot be declined`
});

Space.Error.extend(Donations, `FulfilledPledgeCannotBeWrittenOff`, {
  message: `Fulfilled pledge cannot be written off`
})
