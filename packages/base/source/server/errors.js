
Space.Error.extend(Donations, `AppealNotOpenForNewPledges`, {
  message: `Appeal not open for new pledges.`
});

Space.Error.extend(Donations, `AppealNotOpenToAcceptPledge`, {
  message: `Appeal not open to accept pledge.`
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

Space.Error.extend(Donations, `PledgeCannotBeDeclinedIfFulfilled`, {
  message: `Pledge cannot be declined if fulfilled`
});


