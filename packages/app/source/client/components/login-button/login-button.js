Space.flux.BlazeComponent.extend('Donations.LoginButton', {

  dependencies: {
    usersStore: 'Space.accountsUi.UsersStore'
  },

  isLoggedIn() {
    return this.usersStore.isLoggedIn();
  },

  events() {
    return [{
      'click .login-button .login'(event) {
        event.preventDefault();
        this.publish(new Donations.RouteRequested({
          routeName: 'login'
        }));
      },
      'click .login-button .logout'(event) {
        event.preventDefault();
        this.publish(new Space.accountsUi.LogoutRequested());
      }
    }];
  }
});

Donations.LoginButton.register('login_button');
