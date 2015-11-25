Space.eventSourcing.AggregateRouter.extend(Donations, `AppealRouter`, {

  aggregate: Donations.Appeal,
  initializingCommand: Donations.MakeAppeal,

  routeCommands: [
    Donations.MakePledge,
    Donations.AcceptPledge,
    Donations.DeclinePledge,
    Donations.FulfillPledge
  ]

});
