Space.flux.BlazeComponent.extend(Donations, 'LandingPage', {

  events() {
    return [{
      'click .donate-button'() {
        this.publish(new Donations.RouteRequested({
          routeName: 'openAppeals'
        }));
      }
    }];
  }
});

Donations.LandingPage.register('landing_page');
