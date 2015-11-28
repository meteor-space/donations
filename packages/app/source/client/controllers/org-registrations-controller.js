SignupController = Space.accountsUi.SignupController;

SignupController.extend(Donations, 'OrgRegistrationsController', {

  dependencies: {
    orgRegStore: 'Donations.OrgRegistrationsStore',
    signupsStore: 'Space.accountsUi.SignupsStore'
  },

  requestSignupEvent: 'Donations.OrgRegistrationRequested',
  initiateSignupCommand: 'Donations.RegisterOrganization',

  eventSubscriptions() {
    let superSubs = SignupController.prototype.eventSubscriptions.call(this);
    return superSubs.concat([{
      'Donations.OrgRegistrationFormSubmitted': this._onOrgRegistrationFormSubmit,
      'Space.accountsUi.SignupCompleted': this._onSignupCompleted
    }]);
  },

  _onOrgRegistrationFormSubmit() {
    this.publish(new Donations.OrgRegistrationRequested({
      name: this.orgRegStore.orgName(),
      password: new Password(this.orgRegStore.password()),
      country: new Country(this.orgRegStore.orgCountry()),
      contact: new Donations.Contact({
        email: new EmailAddress(this.orgRegStore.contactEmail()),
        name: this.orgRegStore.contactName(),
        phone: this.orgRegStore.contactPhone()
      })
    }));
  },

  _onSignupCompleted() {
    this.publish(new Space.accountsUi.LoginRequested({
      user: this.orgRegStore.contactEmail(),
      password: new Password(this.orgRegStore.password())
    }));
  }

});
