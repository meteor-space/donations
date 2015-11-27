Space.eventSourcing.Router.extend(Donations, `AppealRouter`, {

  eventSourceable: Donations.Appeal,
  initializingMessage: Donations.MakeAppeal,

  routeCommands: [
    Donations.MakePledge,
    Donations.AcceptPledge,
    Donations.DeclinePledge,
    Donations.FulfillPledge,
    Donations.WriteOffPledge,
    Donations.CloseAppeal
  ]

});
