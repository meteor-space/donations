Space.Object.extend(Donations, 'LoginController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.EventPublishing
  ],

  dependencies: {
    orgsStore: 'Donations.OrgsStore'
  },

  eventSubscriptions() {
    return [{
      'Space.accountsUi.LoginSucceeded'() {
        this.publish(new Donations.RouteRequested({
          routeName: 'orgAdmin',
          params: { id: this.orgsStore.adminOrg()._id }
        }));
      }
    }];
  }
});
