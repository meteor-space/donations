Space.Application.extend(Donations, 'App', {

  configuration: {
    accountsUi: {
      requestSignupEvent: 'Donations.OrgRegistrationRequested',
      initiateSignupCommand: 'Donations.RegisterOrganization',
      retrySignupCommand: 'Donations.RetryOrgRegistration'
    }
  },

  requiredModules: ['Space.accountsUi'],

  stores: [
    'Donations.OrgRegistrationsStore',
    'Donations.OrgsStore'
  ],

  controllers: [
    'Donations.RouteController',
    'Donations.LayoutController',
    'Donations.OrgRegistrationsController',
    'Donations.LoginController'
  ],

  components: [
    'Donations.LandingPage',
    'Donations.OrgRegistrationForm',
    'Donations.OrgAdminPage',
    'Donations.OrgLoginForm'
  ],

  singletons: [
    'Donations.OrgsTracker'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
    this.injector.map('Donations.Organizations').asStaticValue();
  }

});
