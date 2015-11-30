Space.Application.extend(Donations, 'App', {

  requiredModules: ['Space.accountsUi'],

  stores: [
    'Donations.OrgRegistrationsStore',
    'Donations.OrgsStore',
    'Donations.LocationsStore'
  ],

  controllers: [
    'Donations.RouteController',
    'Donations.LayoutController',
    'Donations.OrgRegistrationsController',
    'Donations.OrgLocationsController',
    'Donations.LoginController'
  ],

  components: [
    // PAGES
    'Donations.LandingPage',
    'Donations.OrgAdminPage',
    // FORMS
    'Donations.OrgRegistrationForm',
    'Donations.OrgLoginForm',
    'Donations.AddLocationForm',
    'Donations.EditLocationForm',
    // OTHERS
    'Donations.LogoutButton',
    'Donations.LocationsEditor',
    'Donations.EditLocationsListItem'
  ],

  singletons: [
    'Donations.OrgsTracker',
    'Donations.LocationsTracker',
    'Donations.LocationsApi'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Locations').asStaticValue();
  }

});
