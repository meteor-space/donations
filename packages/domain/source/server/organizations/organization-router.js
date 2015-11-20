Space.eventSourcing.AggregateRouter.extend(Donations, `OrganizationRouter`, {

  aggregate: Donations.Organization,
  initializingCommand: Donations.CreateOrganization

});
