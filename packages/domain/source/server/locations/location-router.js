Space.eventSourcing.Router.extend(Donations, `LocationRouter`, {

  aggregate: Donations.Location,
  initializingCommand: Donations.AddLocation

});
