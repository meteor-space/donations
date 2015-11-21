Donations.App = Space.Application.define('Donations.App', {

  configuration: { appId: 'Donations.App'},

  requiredModules: [
    'Space.accounts',
    'Space.accountsUi',
    'Donations.domain'
  ],

  singletons: ['Donations.OrganizationApi']

});
