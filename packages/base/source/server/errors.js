Space.Error.extend(Donations, `InvalidAppealState`, {
  Constructor(currentState, commandedState) {
    Space.Error.constructor.call(this);
    this.message = `Appeal cannot move to ${commandedState} from the state of ${currentState}`;
  }
});

Space.Error.extend(Donations, `AppealNotOpenForNewPledges`, {
  message: `Appeal not open for new pledges.`
});

Space.Error.extend(Donations, `AppealNotOpenToAcceptPledge`, {
  message: `Appeal not open to accept pledge.`
});

Space.Error.extend(Donations, `AppealNotOpenToDeclinePledge`, {
  message: `Appeal not open to decline pledge.`
});

Space.Error.extend(Donations, `AppealNotOpenToWriteOffPledge`, {
  message: `Appeal not open to write off pledge.`
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
});

Space.Error.extend(Donations, `FulfilledAppealCannotBeClosed`, {
  message: `Fulfilled appeal cannot be closed`
});
