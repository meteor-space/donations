Donations.domain = Space.Module.define(`Donations.domain`, {

  requiredModules: [`Space.eventSourcing`],

  singletons: [
    `Donations.OrgRegistrationRouter`,
    `Donations.OrganizationRouter`,
    `Donations.LocationRouter`,
    `Donations.AppealRouter`
  ]

});
