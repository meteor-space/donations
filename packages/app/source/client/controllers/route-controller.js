Space.Object.extend(Donations, 'RouteController', {

  dependencies: {
    router: 'Router'
  }

});

Donations.RouteController.mixin([
  Space.messaging.EventSubscribing
]);
