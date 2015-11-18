Space.eventSourcing.Router.extend(Donations, `OrgRegistrationRouter`, {

  aggregate: Donations.OrgRegistration,
  initializingCommand: Donations.RegisterOrganization

});
