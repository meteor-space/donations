Space.eventSourcing.ProcessRouter.extend(Donations, `OrgRegistrationRouter`, {

  process: Donations.OrgRegistration,
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
