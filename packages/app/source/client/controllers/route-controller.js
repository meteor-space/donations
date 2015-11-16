Space.Object.extend(Donations, 'RouteController', {

  dependencies: {
    router: 'Router'
  },

  eventSubscriptions() {
    return [{
      'Donations.RouteRequested'(event) {
        this.router.go(this.router.path(event.routeName));
      }
    }];
  }

});

Donations.RouteController.mixin([
  Space.messaging.EventSubscribing
]);
