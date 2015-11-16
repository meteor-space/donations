Space.flux.Application.extend(Donations, 'App', {

  configuration: {},

  requiredModules: [],

  stores: [],

  controllers: [
    'Donations.RouteController',
    'Donations.LayoutController'
  ],

  components: [],

  onInitialize() {
    this.injector.map('Layout').to(BlazeLayout);
    this.injector.map('Router').to(FlowRouter);
  }

});
