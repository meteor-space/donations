Space.Application.extend(Donations, 'App', {

  requiredModules: ['Space.accountsUi'],

  stores: [
    'Donations.OrgRegistrationsStore',
    'Donations.OrgsStore',
    'Donations.AddLocationFormStore',
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
    'Donations.LandingPage',
    'Donations.OrgRegistrationForm',
    'Donations.OrgAdminPage',
    'Donations.OrgLoginForm',
    'Donations.LogoutButton',
    'Donations.LocationsEditor',
    'Donations.AddLocationForm'
  ],

  singletons: [
    'Donations.OrgsTracker',
    'Donations.LocationsTracker'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Locations').asStaticValue();
  }

});
