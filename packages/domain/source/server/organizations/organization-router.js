Space.eventSourcing.Router.extend(Donations, `OrganizationRouter`, {

  aggregate: Donations.Organization,
  initializingCommand: Donations.CreateOrganization

});
