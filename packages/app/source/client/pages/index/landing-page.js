Space.flux.BlazeComponent.extend(Donations, 'LandingPage', {

  events() {
    return [{
      'click .register.button'() {
        this.publish(new Donations.RouteRequested({
          routeName: 'register'
        }));
      }
    }];
  }
});

Donations.LandingPage.register('landing_page');
