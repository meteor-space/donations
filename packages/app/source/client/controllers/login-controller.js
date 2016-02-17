Space.Object.extend('Donations.LoginController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.EventPublishing
  ],

  dependencies: {
    orgsStore: 'Donations.OrgsStore',
    tracker: 'Tracker'
  },

  eventSubscriptions() {
    return [{
      'Space.accountsUi.LoginSucceeded': this._redirectToAdminOrg,
      'Space.accountsUi.LoggedOut': this._redirectToLandingPage
    }];
  },

  _redirectToAdminOrg() {
    // Setup a computation that runs until the admin org was loaded
    this.tracker.autorun((computation) => {
      let adminOrg = this.orgsStore.adminOrg();
      // Request the redirect when admin org is loaded
      if (adminOrg !== null && adminOrg !== undefined) {
        this.publish(new Donations.RouteRequested({
          routeName: 'orgAdmin',
          params: { id: adminOrg._id }
        }));
        computation.stop();
      }
    });
  },

  _redirectToLandingPage() {
    this.publish(new Donations.RouteRequested({ routeName: 'landingPage' }));
  }
});
