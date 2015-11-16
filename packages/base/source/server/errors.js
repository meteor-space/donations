
Space.Error.extend(Donations, `PledgeCannotBeMadeToFulfilledAppeal`, {
  message: `A pledge cannot be made for a fulfilled appeal.`
});

Space.Error.extend(Donations, `PledgeHasToBeAcceptedBeforeFulfilled`, {
  message: `A pledge has to be accepted before it can be fulfilled.`
});

Space.Error.extend(Donations, `PledgeNotFoundError`, {
  Constructor(pledgeId) {
    Space.Error.constructor.call(this);
    this.message = `No pledge with id ${pledgeId} found.`;
  }
});
