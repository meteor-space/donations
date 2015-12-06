Space.flux.BlazeComponent.extend(Donations, 'OrgLoginForm', {

  ENTER: 13,

  dependencies: {
    loginStore: 'Space.accountsUi.LoginStore'
  },

  state() {
    return this.loginStore;
  },

  events() {
    return [{
      'keyup input': this._onKeyup,
      'click .submit': this._onSubmit
    }];
  },

  _onKeyup(event) {
    if(event.keyCode === this.ENTER) {
      this._onSubmit(event)
    }
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
