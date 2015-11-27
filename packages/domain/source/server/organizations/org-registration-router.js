Space.eventSourcing.Router.extend(Donations, `OrgRegistrationRouter`, {

  eventSourceable: Donations.OrgRegistration,
  initializingMessage: Donations.RegisterOrganization,

  routeEvents: [
    Space.accounts.SignupSuccessful,
    Space.accounts.SignupFailed,
    Donations.OrganizationCreated
  ],

  routeCommands: [
    Donations.RetryOrgRegistration
  ]

});
