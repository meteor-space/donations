Space.flux.BlazeComponent.extend(Donations, 'LandingPage', {

  events() {
    return [{
      'click button.donate'() {
        this.publish(new Donations.RouteRequested({
          routeName: 'openAppeals'
        }));
      }
    }];
  }
});

Donations.LandingPage.register('landing_page');
