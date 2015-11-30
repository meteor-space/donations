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
    // APIS
    'Donations.OrgRegistrationApi',
    'Donations.OrgLocationsApi',
    'Donations.AppealsApi',
    // PROJECTIONS
    'Donations.OrgRegistrationsProjection',
    'Donations.OrgProjection',
    'Donations.LocationsProjection',
    'Donations.AppealsProjection',
    // PUBLICATIONS
    'Donations.OrgPublication',
    'Donations.LocationsPublication',
    'Donations.AppealsPublication'
  ],

  onInitialize() {
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Locations').asStaticValue();
    this.injector.map('Donations.Appeals').asStaticValue();
  }

});
