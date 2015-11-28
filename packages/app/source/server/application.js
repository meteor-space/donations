Donations.App = Space.Application.define('Donations.App', {

  configuration: {
    appId: 'Donations.App'
  },

  requiredModules: [
    'Space.accounts',
    'Space.accountsUi',
    'Donations.domain'
  ],

  singletons: [
    'Donations.OrgRegistrationApi',
    'Donations.OrgLocationsApi',
    'Donations.OrgRegistrationsProjection',
    'Donations.OrgProjection',
    'Donations.LocationsProjection',
    'Donations.OrgPublication',
    'Donations.LocationsPublication'
  ],

  onInitialize() {
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Locations').asStaticValue();
  }

});
