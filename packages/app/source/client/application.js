Space.Application.extend(Donations, 'App', {

  requiredModules: ['Space.accountsUi'],

  stores: [
    'Donations.OpenAppealsStore',
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
    'Donations.OpenAppealsPage',
    'Donations.OrgAdminPage',
    'Donations.LocationAdminPage',
    // FORMS
    'Donations.OrgRegistrationForm',
    'Donations.OrgLoginForm',
    'Donations.AddLocationForm',
    'Donations.EditLocationForm',
    'Donations.AddAppealForm',
    'Donations.EditAppealForm',
    'Donations.MakePledgeForm',
    // EDITORS
    'Donations.LocationsEditor',
    'Donations.AppealsEditor',
    // LISTS
    'Donations.EditLocationsListItem',
    'Donations.EditAppealsListItem',
    'Donations.OpenAppealsListItem',
    // BUTTONS
    'Donations.LoginButton',
    'Donations.OrgAdminPageLink'
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
    this.injector.map('Donations.OpenAppeals').asStaticValue();
    TAPi18n.setLanguage(Meteor.settings.public.defaultLanguage);
  }

});
