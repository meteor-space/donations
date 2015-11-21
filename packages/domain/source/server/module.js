Donations.domain = Space.Module.define(`Donations.domain`, {

  requiredModules: [`Space.eventSourcing`],

  singletons: [
    `Donations.OrganizationRouter`,
    `Donations.OrgRegistrationRouter`,
    `Donations.LocationRouter`,
    `Donations.AppealRouter`
  ]

});
