Space.eventSourcing.Router.extend(Donations, 'AppealRouter', {

  Aggregate: Donations.Appeal,
  InitializingCommand: Donations.MakeAppeal

});