Space.eventSourcing.AggregateRouter.extend(Donations, `LocationRouter`, {

  aggregate: Donations.Location,
  initializingCommand: Donations.AddLocation

});
