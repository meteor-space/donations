Space.eventSourcing.Router.extend('Donations.OrganizationRouter', {

  eventSourceable: Donations.Organization,
  initializingMessage: Donations.CreateOrganization,

  routeCommands: [
    Donations.AddLocation,
    Donations.UpdateLocationDetails
  ]

});
