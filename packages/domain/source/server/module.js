Donations.domain = Space.Module.define('Donations.domain', {

  requiredModules: [
    'Space.eventSourcing',
    'Space.accounts'
  ],

  singletons: [
    'Donations.OrgRegistrationRouter',
    'Donations.OrganizationRouter',
    'Donations.AppealRouter'
  ]

});
