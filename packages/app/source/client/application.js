Space.Application.extend(Donations, 'App', {

  configuration: {},

  requiredModules: [],

  stores: [],

  controllers: [
    'Donations.RouteController',
    'Donations.LayoutController'
  ],

  components: [
    'Donations.LandingPage',
    'Donations.RegistrationForm'
  ],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
  }

});
