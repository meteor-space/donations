Space.eventSourcing.Router.extend(Donations, `AppealRouter`, {

  eventSourceable: Donations.Appeal,
  initializingMessage: Donations.DraftAppeal,

  routeCommands: [
    Donations.CancelAppeal,
    Donations.MakeAppeal,
    Donations.MakePledge,
    Donations.AcceptPledge,
    Donations.DeclinePledge,
    Donations.FulfillPledge,
    Donations.WriteOffPledge,
    Donations.CloseAppeal
  ]

});
