Space.ui.BlazeComponent.extend('Donations.LandingPage', {

  events() {
    return [{
      'click .donate.btn'() {
        this.publish(new Donations.RouteRequested({
          routeName: 'openAppeals'
        }));
      }
    }];
  }
});

Donations.LandingPage.register('landing_page');
