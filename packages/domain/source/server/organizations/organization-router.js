Space.eventSourcing.Router.extend(Donations, 'OrganizationRouter', {

  Aggregate: Donations.Organization,
  InitializingCommand: Donations.CreateOrganization
  
});
