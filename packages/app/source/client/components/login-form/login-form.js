Space.flux.BlazeComponent.extend(Donations, 'OrgLoginForm', {

  dependencies: {
    loginStore: 'Space.accountsUi.LoginStore'
  },

  state() {
    return this.loginStore;
  },

  events() {
    return [{
      'click .submit': this._onSubmit
    }];
  },

  _onSubmit(event) {
    event.preventDefault();
    this.publish(new Space.accountsUi.LoginRequested({
      user: this.$('.email').val(),
      password: new Password(this.$('.password').val())
    }));
  }

});

Donations.OrgLoginForm.register('login_form');
