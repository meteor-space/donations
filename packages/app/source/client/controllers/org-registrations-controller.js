SignupController = Space.accountsUi.SignupController;

SignupController.extend('Donations.OrgRegistrationsController', {

  dependencies: {
    signupsStore: 'Space.accountsUi.SignupsStore'
  },

  requestSignupEvent: 'Donations.OrgRegistrationRequested',
  initiateSignupCommand: 'Donations.RegisterOrganization',

  _userLoginData: null,

  eventSubscriptions() {
    let superSubs = SignupController.prototype.eventSubscriptions.call(this);
    return superSubs.concat([{
      'Donations.OrgRegistrationFormSubmitted': this._onOrgRegistrationFormSubmit,
      'Space.accountsUi.SignupCompleted': this._onSignupCompleted
    }]);
  },

  _onOrgRegistrationFormSubmit(event) {
    this.publish(new Donations.OrgRegistrationRequested({
      name: event.orgName,
      password: new Password(event.password),
      country: new Country(event.orgCountry),
      contact: new Donations.Contact({
        email: new EmailAddress(event.contactEmail),
        name: event.contactName,
        phone: event.contactPhone
      })
    }));
    this._userLoginData = {
      user: event.contactEmail,
      password: event.password
    };
  },

  _onSignupCompleted() {
    this.publish(new Space.accountsUi.LoginRequested({
      user: this._userLoginData.user,
      password: new Password(this._userLoginData.password)
    }));
    this._userLoginData = null;
  }

});
