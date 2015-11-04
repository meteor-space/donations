Space.eventSourcing.Router.extend(Donations, 'LocationRouter', {

  Aggregate: Donations.Location,
  InitializingCommand: Donations.AddLocation

});
