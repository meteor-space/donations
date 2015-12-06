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
    'Donations.OrgApi',
    'Donations.AppealsApi',
    // PROJECTIONS
    'Donations.OrgRegistrationsProjection',
    'Donations.OrgProjection',
    'Donations.AppealsProjection',
    'Donations.OpenAppealsProjection',
    // PUBLICATIONS
    'Donations.OrgPublication',
    'Donations.AppealsPublication'
  ],

  onInitialize() {
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Appeals').asStaticValue();
    this.injector.map('Donations.OpenAppeals').asStaticValue();
  },

  onReset() {
    this.injector.get('Donations.Organizations').remove({});
    this.injector.get('Donations.Appeals').remove({});
  }

});
