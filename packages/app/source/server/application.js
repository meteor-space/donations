Donations.App = Space.Application.define('Donations.App', {

  configuration: { appId: 'Donations.App'},

  requiredModules: ['Donations.domain'],

  singletons: ['Donations.OrganizationApi']

});
