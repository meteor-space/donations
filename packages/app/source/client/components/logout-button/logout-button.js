Space.flux.BlazeComponent.extend(Donations, 'LogoutButton', {

  dependencies: {
    usersStore: 'Space.accountsUi.UsersStore'
  },

  isLoggedIn() {
    return this.usersStore.isLoggedIn();
  },

  events() {
    return [{
      'click .logout-button'(event) {
        event.preventDefault();
        this.publish(new Space.accountsUi.LogoutRequested());
      }
    }];
  }
});

Donations.LogoutButton.register('logout_button');
