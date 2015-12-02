Space.Application.extend(Donations, 'App', {

  requiredModules: ['Space.accountsUi'],

  stores: [
    'Donations.OrgRegistrationsStore',
    'Donations.OrgsStore',
    'Donations.LocationDetailsStore'
  ],

  controllers: [
    'Donations.RouteController',
    'Donations.LayoutController',
    'Donations.OrgRegistrationsController',
    'Donations.OrgsController',
    'Donations.LoginController',
    'Donations.AppealsController'
  ],

  components: [
    // PAGES
    'Donations.LandingPage',
    'Donations.OrgAdminPage',
    'Donations.LocationAdminPage',
    // FORMS
    'Donations.OrgRegistrationForm',
    'Donations.OrgLoginForm',
    'Donations.AddLocationForm',
    'Donations.EditLocationForm',
    'Donations.AddAppealForm',
    // EDITORS
    'Donations.LocationsEditor',
    'Donations.AppealsEditor',
    // LISTS
    'Donations.EditLocationsListItem',
    // BUTTONS
    'Donations.LogoutButton'
  ],

  singletons: [
    // TRACKERS
    'Donations.OrgsTracker',
    'Donations.AppealsTracker'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
    this.injector.map('Donations.Organizations').asStaticValue();
    this.injector.map('Donations.Appeals').asStaticValue();
  }

});
