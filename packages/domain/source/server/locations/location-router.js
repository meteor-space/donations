Space.eventSourcing.Router.extend(Donations, `LocationRouter`, {

  eventSourceable: Donations.Location,
  initializingMessage: Donations.AddLocation,

  routeCommands: [
    Donations.UpdateLocationDetails
  ]

});
